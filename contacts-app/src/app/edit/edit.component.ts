import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Directive,Input,ViewChild,ElementRef } from '@angular/core';


import { skipUntil, takeUntil,takeWhile, skipWhile, combineAll } from 'rxjs/operators';

import { Logs } from 'selenium-webdriver';
import {  Observable,fromEvent ,Subject,Subscription,interval,Subscriber} from 'rxjs';
import {buffer,switchMap,map,debounceTime,distinctUntilChanged,mergeMap,delay} from 'rxjs/operators'
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { LogicUserService } from '../Services/LogicUser.service';
import { DocumentModel } from '../Models/DocumentModel';
import { LogicDocumentsService } from '../Services/LogicDocuments.service';
import { LogicMarkersService } from '../Services/LogicMarkers.service';
import { LogicSharedService } from '../Services/LogicShared.service';
import { MarkerModel } from '../Models/MarkerModel';
import { GetSharedUsersService } from '../Services/SharedServices/get-shared-users.service';
import { WebSocketService } from '../Services/web-socket.service';
import { compileNgModule } from '@angular/compiler';


class point{
  constructor(public X:number,public Y:number){}
  add(pt:point):point{
      return new point(this.X+pt.X,this.Y+pt.Y)
  }
  div(denom:number){
    return new point(this.X/denom,this.Y/denom)
  }
  distanceFrom(pt:point){
    return Math.sqrt(Math.pow(pt.X-this.X,2)+Math.pow(pt.Y-this.Y,2))
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [LogicMarkersService,LogicSharedService,GetSharedUsersService]
})
export class EditComponent implements OnInit {

  @ViewChild('shapeCanvas',{static:false}) shapeCanvas:ElementRef;
  @ViewChild('drawingCanvas',{static:false}) drawingCanvas:ElementRef;
  @ViewChild('btnEllipse',{static:false}) btnEllipse:ElementRef
  @ViewChild('btnCancel',{static:false}) btnCancel:ElementRef
  title = 'DrawingApp';
  mDown:Boolean
  mouseDown$:any
  poly:Subject<point>
  switchSubject:Subject<point>
  ping$:any = interval(20000);

  shapeType:string
  strokeColor:string
  backgroundColor:string
  myDocument:DocumentModel

  sharedUsers:Array<string>
  unSharedUsers:Array<string>
  watchingUsers:Array<string>

  showSharedUsers:boolean
  showUnSharedUsers:boolean
  showWatchingUsers:boolean

  constructor(private logicUserService: LogicUserService,
              private logicDocumentsService:LogicDocumentsService,
              private logicMarkersService:LogicMarkersService,
              private logicSharedService:LogicSharedService,
              private webSocketService:WebSocketService) { 
    this.poly = new Subject<point>() 
    this.switchSubject = new Subject<point>() 
    this.mDown = false
  }

  ngOnInit(): void {
    this.myDocument = this.logicDocumentsService.currentDocument
    this.logicMarkersService.getMarkers(this.myDocument.DocID)
    this.shapeType = 'ellipse'
    this.strokeColor = 'black'
    this.backgroundColor = 'rgba(0,0,0,0)'
    this.sharedUsers = new Array<string>()
    this.unSharedUsers = new Array<string>()
    this.watchingUsers = new Array<string>();
    this.webSocketService.OpenDrawSocket(this.logicUserService.logedUser.UserID,this.myDocument.DocID)
    this.SubscribeOnSubjects()
    this.showWatching()


  }

  shareUser(userID){
    this.logicSharedService.createShare(this.myDocument.DocID,userID)
  }
  unShareUser(userID){
    this.logicSharedService.removeShare(this.myDocument.DocID,userID)
  }

  setDocumentImage(){
    let styles = {
      'background-image': "url("+this.myDocument.ImageURL+")",
      'background-size': 'cover'

    };
    return styles;
  }
  clearCanvas(){
    var canvas = this.drawingCanvas.nativeElement 
    var ctx2 = canvas.getContext('2d')
    ctx2.clearRect(0, 0, this.drawingCanvas.nativeElement.width, this.drawingCanvas.nativeElement.height);
  }
  freeDraw(evt){
    var canvas = this.drawingCanvas.nativeElement 
    var ctx2 = canvas.getContext('2d')
    var rect = canvas.getBoundingClientRect();
    var xcanvas = evt.clientX - rect.left
    var ycanvas = evt.clientY - rect.top
    this.logicMarkersService.drawLine(ctx2,xcanvas-evt.movementX,ycanvas-evt.movementY,xcanvas,ycanvas)
    this.poly.next(new point(xcanvas-evt.movementX,ycanvas-evt.movementY))
    this.webSocketService.SendMessage(this.myDocument.DocID,this.logicUserService.logedUser.UserID,xcanvas-evt.movementX,ycanvas-evt.movementY,xcanvas,ycanvas)
  }
  drawShape(shapePoly:Array<point>){
    var center = new point(0,0)
    center = shapePoly.reduce((acc,pt)=>acc.add(pt))
    center = center.div(shapePoly.length)
    var radius  = new point(0,0)
    radius = shapePoly.reduce((acc,pt)=>acc.add(new point(Math.abs(pt.X-center.X),Math.abs(pt.Y-center.Y))))
    radius = radius.div(shapePoly.length)
    var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
    console.log(center.X+":"+center.Y+":"+radius.X)
    ctx1.strokeStyle = this.strokeColor
    ctx1.fillStyle = this.backgroundColor
    if(this.shapeType=="ellipse"){
      this.logicMarkersService.drawCircle(ctx1,center.X, center.Y,radius.X,radius.Y);
      this.logicMarkersService.createMarker(this.myDocument.DocID,this.logicUserService.logedUser.UserID,
        this.shapeType,this.strokeColor,this.backgroundColor,center.X.toString(), center.Y.toString(),radius.X.toString(),radius.Y.toString())
    } else if (this.shapeType=="rectangle"){
      this.logicMarkersService.drawSquare(ctx1,center.X-radius.X, center.Y-radius.Y, radius.X*2, radius.Y*2);
      this.logicMarkersService.createMarker(this.myDocument.DocID,this.logicUserService.logedUser.UserID,
        this.shapeType,this.strokeColor,this.backgroundColor,(center.X-radius.X).toString(), (center.Y-radius.Y).toString(),(radius.X*2).toString(),(radius.Y*2).toString())
    }
  }

  ngAfterViewInit() {
    var elem = document.querySelector("#mydiv")
    var ctx1 = this.shapeCanvas.nativeElement.getContext('2d')
    this.shapeCanvas.nativeElement.width = 800
    this.shapeCanvas.nativeElement.height = 1200

    this.drawingCanvas.nativeElement.width = 800
    this.drawingCanvas.nativeElement.height = 1200

    var ctx2 = this.drawingCanvas.nativeElement.getContext('2d')
    // var cancelBtn$ = fromEvent(this.btnCancel.nativeElement,'click')
    var drawMode = false
    // cancelBtn$.subscribe(evt=>{this.ConnectSocket();return drawMode = false})
    var mouseUp$ = fromEvent(this.drawingCanvas.nativeElement,'mouseup')
    var mousedown$ = fromEvent(this.drawingCanvas.nativeElement, 'mousedown')
    var draw$ = mousedown$.pipe(
      // restart counter on every click
      switchMap(event=>
        fromEvent(this.drawingCanvas.nativeElement,'mousemove').pipe(
          takeUntil(mouseUp$)
        ))
    )

    draw$.subscribe(evt=>this.freeDraw(evt))
    
    this.poly.pipe(buffer(mouseUp$),)
    .subscribe(shapePoly=>{this.clearCanvas();this.drawShape(shapePoly);})

    
  }

  ngOnDestroy(): void {
    // this.webSocketService.SendMessage("",this.logicUserService.logedUser.UserID,"","","","")
    this.webSocketService.watchingUsers = new Array<string>()
    this.webSocketService.CloseSocketDraw()
    this.logicMarkersService.markersList = new Array<MarkerModel>()
  }
  showShared(){
    this.showWatchingUsers = false
    this.showSharedUsers = true
    this.showUnSharedUsers = false
  }
  showUnShared(){
    this.showWatchingUsers = false
    this.showSharedUsers = false
    this.showUnSharedUsers = true
  }
  showWatching(){
    this.showWatchingUsers = true
    this.showSharedUsers = false
    this.showUnSharedUsers = false
  }

  SubscribeOnSubjects(){
    this.SubscribeToStroke()
    this.SubscribeToBackground()
    this.SubscribeToShape()
    this.SubscribeToShowSection()
    this.SubscribeToMarkersLoaded()
    this.SubscribeToSharedUsersLoaded()
    this.SubscribeToUnSharedUsersLoaded()
    this.SubscribeToWebSocketMarkerUpdates()
    this.SubscribeToWebSocketDrawUpdates()
    this.SubscribeToWebSocketWatching()
  }
  SubscribeToStroke(){
    this.logicMarkersService.strokeColor.subscribe(
      (color)=>{ this.strokeColor = color}
    )
  }
  SubscribeToBackground(){
    this.logicMarkersService.rgbaColor.subscribe(
      (color)=>{this.backgroundColor = color}
    )
  }
  SubscribeToShape(){
    this.logicMarkersService.shapeType.subscribe(
      (shapeType)=>{this.shapeType = shapeType}
    )
  }
  SubscribeToShowSection(){
    this.logicSharedService.showSection.subscribe(
      (value)=>{
        if(value=='watchingUsers'){
          this.showWatching()
        }
        if(value=='SharedUsers'){
          this.showShared()
        }
        if(value=='UnSharedUsers'){
          this.showUnShared()
        }
      }
    )
  }
  SubscribeToMarkersLoaded(){
    this.logicMarkersService.markerLoaded.subscribe(
      (isLoaded)=>{
        if(isLoaded){
          var canvas = this.shapeCanvas.nativeElement 
          var ctx2 = canvas.getContext('2d')
          ctx2.clearRect(0, 0, this.shapeCanvas.nativeElement.width, this.shapeCanvas.nativeElement.height);
          this.logicMarkersService.markersList.forEach(marker => {
            var ctx = this.shapeCanvas.nativeElement.getContext('2d')
            ctx.strokeStyle = marker.StrokeColor
            ctx.fillStyle = marker.BackgroundColor
            if(marker.MarkerType=='ellipse'){
              this.logicMarkersService.drawCircle(this.shapeCanvas.nativeElement.getContext('2d'),marker.X,marker.Y,marker.XRadius,marker.YRadius)
            }
            if(marker.MarkerType=='rectangle'){
              this.logicMarkersService.drawSquare(this.shapeCanvas.nativeElement.getContext('2d'),marker.X,marker.Y,marker.XRadius,marker.YRadius)
            }
          });
          
        }
      }
    )
  }
  SubscribeToSharedUsersLoaded(){
    this.logicSharedService.isSharedUsersIDLoaded.subscribe(
      (response)=>{
        this.sharedUsers = new Array<string>()
        this.logicSharedService.sharedUsersID.forEach(userID => {
          this.sharedUsers.push(userID)
        });
      }
    )
  }
  SubscribeToUnSharedUsersLoaded(){
    this.logicSharedService.isunSharedUsersIDLoaded.subscribe(
      (response)=>{
        this.unSharedUsers = new Array<string>()
        this.logicSharedService.unSharedUsersID.forEach(userID => {
          this.unSharedUsers.push(userID)
        });
      }
    )
  }
  SubscribeToWebSocketMarkerUpdates(){
    this.webSocketService._userSubject.subscribe(
      (response)=>{
        if(response=="newMarkerUpdate"){
          this.logicMarkersService.getMarkers(this.logicDocumentsService.currentDocument.DocID)
          this.clearCanvas()
        }
      }
    )
  }
  SubscribeToWebSocketDrawUpdates(){
    this.webSocketService._drawSubject.subscribe(
      (response)=>{
        if(!response.DocID){
        }else{
          var canvas = this.drawingCanvas.nativeElement 
          var ctx2 = canvas.getContext('2d')
          this.logicMarkersService.drawLine(ctx2,response.X1,response.Y1,response.X2,response.Y2)
        }
      }
    )
  }
  SubscribeToWebSocketWatching(){
    this.webSocketService._watchingUsersSubject.subscribe(
      (response)=>{
        if(response=true){
          this.watchingUsers = new Array<string>()
          this.webSocketService.watchingUsers.forEach(userID => {
            var index = this.watchingUsers.indexOf(userID)
            if(index==-1){
              this.watchingUsers.push(userID)
            }
          });
        }
      }
    )
  }

}
