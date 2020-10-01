import { Component, OnInit } from '@angular/core';
import { LogicDocumentsService } from '../Services/LogicDocuments.service';
import { LogicMarkersService } from '../Services/LogicMarkers.service';
import { LogicSharedService } from '../Services/LogicShared.service';
import { LogicUserService } from '../Services/LogicUser.service';
import { WebSocketService } from '../Services/web-socket.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  
})
export class UserComponent implements OnInit {

  constructor(private logicUserService:LogicUserService,
              private logicDocumentsService:LogicDocumentsService,
              private webSocketService:WebSocketService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    console.log("closing socket")
    this.webSocketService.CloseSocketUser()
    this.webSocketService.CloseSocketDraw()
  }


}
