import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LogicMarkersService } from '../Services/LogicMarkers.service';
import { LogicSharedService } from '../Services/LogicShared.service';

@Component({
  selector: 'app-edit-toolbar',
  templateUrl: './edit-toolbar.component.html',
  styleUrls: ['./edit-toolbar.component.css']
})
export class EditToolbarComponent implements OnInit {

  backgroundColor:string
  opacityValue:string


  constructor(private logicMarkersService:LogicMarkersService,
              private logicSharedService:LogicSharedService ) { }

  ngOnInit(): void {
    this.backgroundColor = '#000000'
    this.opacityValue = '0'
    document.getElementById('circleEl').style.backgroundColor = '#42484d'
  }
  

  setTypeToEllipse(){
    this.logicMarkersService.shapeType.next("ellipse")
    document.getElementById('circleEl').style.backgroundColor = '#42484d'
    document.getElementById('squareEl').style.backgroundColor = '#6c757d'
  }
  setTypeToRectangle(){
    this.logicMarkersService.shapeType.next("rectangle")
    document.getElementById('squareEl').style.backgroundColor = '#42484d'
    document.getElementById('circleEl').style.backgroundColor = '#6c757d'
  }

  setStrokeColor(value:string){
    this.logicMarkersService.strokeColor.next(value)
  }
  setBackgroundColor(value:string){
    this.backgroundColor = value
    var rgba = this.toRGBA(value,this.opacityValue)
    this.logicMarkersService.rgbaColor.next(rgba)
  }
  setOpacity(value:string){
    this.opacityValue = value
    var rgba = this.toRGBA(this.backgroundColor,value)
    this.logicMarkersService.rgbaColor.next(rgba)
  }
  getSharedUsers(){
    this.logicSharedService.showSection.next('SharedUsers')
  }
  getUnSharedUsers(){
    this.logicSharedService.showSection.next('UnSharedUsers')
  }
  getWatching(){
    this.logicSharedService.showSection.next('watchingUsers')
  }

  private toRGBA(hex:string,opacity:string){
    var decemalOpacity = (parseInt(opacity)/100).toString()
    var value = hex.match(/[A-Za-z0-9]{2}/g)
    var intArray = value.map(function(v) { return parseInt(v, 16) });
    var rgba = "rgba("+intArray.join(",")+"," +decemalOpacity+")"
    return rgba
  }

}
