import { Component, OnInit } from '@angular/core';
import { repeat } from 'rxjs/operators';
// import { User } from 'src/app/DTO/user';
import { DocumentModel } from 'src/app/Models/DocumentModel';
import { LogicDocumentsService } from 'src/app/Services/LogicDocuments.service';
import { LogicUserService } from 'src/app/Services/LogicUser.service';
import { WebSocketService } from 'src/app/Services/web-socket.service';
// import { Mydocument } from '../../DTO/mydocument';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {
  

  DocumentsList:DocumentModel[]

  constructor(private logicDocumentsService:LogicDocumentsService,
              private webSocketService:WebSocketService) {}

  ngOnInit(): void {
    this.logicDocumentsService.getDocuments()
    this.SubscribeOnSubjects()
  }


  loadDocuments(){
    this.DocumentsList = new Array<DocumentModel>()
    this.logicDocumentsService.Documents.forEach(doc => {
      this.DocumentsList.push(doc)
    });
  }

  SubscribeOnSubjects(){
    
    this.logicDocumentsService.numOfDocs.subscribe(
      () =>{
        this.loadDocuments()
      }
    )
    this.webSocketService._userSubject.subscribe(
      (response)=>{
        if(response=="newDocumentUpdate"){
          this.logicDocumentsService.getDocuments()
        }
      }
    )

  }

}
