import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DrawLineDTO } from '../DTO/DrawLineDTO';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  userSocket:WebSocket
  _userSubject:Subject<any>
  drawSocket:WebSocket
  _drawSubject:Subject<any>
  watchingUsers: Array<string>
  _watchingUsersSubject:Subject<boolean>
  // _subject:WebSocketSubject<any>
  
  constructor() { 
    this._userSubject = new Subject<any>()
    this._drawSubject = new Subject<any>()
    this.watchingUsers = new Array<string>()
    this._watchingUsersSubject = new Subject<boolean>()
  }


  SendMessage(docID,userID,x1,y1,x2,y2){
    var req = {
      DocID:docID,
      UserID:userID,
      X1:x1,
      Y1:y1,
      X2:x2,
      Y2:y2,
    }
    this.drawSocket.send(JSON.stringify(req))
  }

  OpenUserSocket(wsID:string){
    this._userSubject = new Subject<any>()
    console.log("WebSocket Start for User:"+wsID)
    this.userSocket = new WebSocket("ws://localhost:5000/ws/user?id="+wsID)
    this.userSocket.onmessage = (
      response=>{
        console.log(response.data)
        this._userSubject.next(response.data)
      }
    )
  }
  CloseSocketUser(){
    this.userSocket.close()
  }
  OpenDrawSocket(userID:string,docID:string){
    this._drawSubject = new Subject<any>()
    console.log("WebSocket Start for Document:"+docID+"\nUSERID:"+userID)
    this.drawSocket = new WebSocket("ws://localhost:5000/ws/draw?userID="+userID+"&docID="+docID)
    this.drawSocket.onmessage = (
      response=>{
        var draw = new DrawLineDTO(response.data)
        this._drawSubject.next(draw)
      }
    )
    this._drawSubject.subscribe(
      (response)=>{
        if(!response.DocID){
          if(response.X1=="remove"){
            var index = this.watchingUsers.indexOf(response.UserID)
            if(index!=-1){
              this.watchingUsers.splice(index,1)
            }
          }else{
              this.watchingUsers.push(response.UserID) 
          }
          this._watchingUsersSubject.next(true)
        }
        

      }
    )
  }
  CloseSocketDraw(){
    this.drawSocket.close()
  }
}
