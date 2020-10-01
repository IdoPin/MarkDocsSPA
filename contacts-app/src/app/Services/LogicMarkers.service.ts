import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DocumentModel } from '../Models/DocumentModel';
import { MarkerModel } from '../Models/MarkerModel';
import { CreateMarkerService } from './MarkersServices/create-marker.service';
import { GetMarkerService } from './MarkersServices/get-marker.service';
import { GetMarkersService } from './MarkersServices/get-markers.service';
import { RemoveMarkerService } from './MarkersServices/remove-marker.service';

@Injectable({
  providedIn: 'root'
})
export class LogicMarkersService {

  myDocument:DocumentModel
  shapeType = new Subject<string>()
  strokeColor = new Subject<string>()
  rgbaColor = new Subject<string>()
  markerLoaded = new Subject<boolean>()
  markersList = new Array<MarkerModel>()

  constructor(private router: Router,
              private createMarkerService:CreateMarkerService,
              private getMarkerService:GetMarkerService,
              private getMarkersService:GetMarkersService,
              private removeMarkerService:RemoveMarkerService) { 
    this.SubscribeOnSubjects()
  }
  

  //shapes functions
  drawCircle(ctx,x,y,xRadius,yRadius){
    ctx.beginPath()
    ctx.ellipse(x,y,xRadius,yRadius,0, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke()
  }
  drawSquare(ctx,x,y,xRadius,yRadius){
    ctx.beginPath()
    ctx.rect(x, y, xRadius, yRadius)
    ctx.fill()
    ctx.stroke()
  }
  drawLine(ctx,x1,y1,x2,y2){
    // this.drawCircle(ctx,x1,y1)
    ctx.beginPath() 
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2,y2)
    ctx.lineWidth = 2
    ctx.stroke()
    // this.drawCircle(ctx,x2,y2)
  }
  
  
  //communicate with Database
  createMarker(docID:string,userID:string,markerType:string,strokeColor:string,backgroundColor:string,
    x:string,y:string,xRadius:string,yRadius:string){
    var request = {
      DocID:docID,
      UserID:userID,
      MarkerType:markerType,
      StrokeColor:strokeColor,
      BackgroundColor:backgroundColor,
      X:x,
      Y:y,
      XRadius:xRadius,
      YRadius:yRadius
    }
    this.createMarkerService.CreateMarker(request)
  }
  getMarker(markerID:string){
    var request = {MarkerID:markerID}
    this.getMarkerService.GetMarker(request)
  }
  getMarkers(docID:string){
    var request = {DocID:docID}
    this.getMarkersService.GetMarkers(request)
  }
  removeMarker(markerID:string){
    var request = {MarkerID:markerID}
    this.removeMarkerService.RemoveMarker(request)
  }

  //Subscriptions
  SubscribeOnSubjects(){
    
    this.SubscribeToCreateMarker()
    this.SubscribeToGetMarker()
    this.SubscribeToGetMarkers()
    this.SubscribeToRemoveMarker()


  }

  SubscribeToCreateMarker(){
    this.createMarkerService.onCreateMarkerResponseOK().subscribe(
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.createMarkerService.onCreateMarkerResponseInvalidMarkerData().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.createMarkerService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToGetMarker(){
    this.getMarkerService.onGetMarkerResponseOK().subscribe(
        ()=>{
          console.log("")
        }
    )
    this.getMarkerService.onGetMarkerResponseInvalid().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.getMarkerService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToGetMarkers(){
    this.getMarkersService.onGetMarkersResponseOK().subscribe(
        (response)=>{
          this.markersList = new Array<MarkerModel>()
          response.markers.forEach(m => {
            var marker = new MarkerModel(m.docID,m.markerID,m.userID,m.markerType,m.strokeColor,m.backgroundColor,
              m.x,m.y,m.xRadius,m.yRadius)
              this.markersList.push(marker)
          });
          this.markerLoaded.next(true)
          
        }
    )
    this.getMarkersService.onGetMarkersResponseInvalidDocID().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.getMarkersService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToRemoveMarker(){
    this.removeMarkerService.onRemoveMarkerResponseOK().subscribe(
        ()=>{
          console.log("")
        }
    )
    this.removeMarkerService.onRemoveMarkerResponseInvalidMarkerID().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.removeMarkerService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }



}
