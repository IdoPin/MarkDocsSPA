import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentModel } from 'src/app/Models/DocumentModel';
import { LogicDocumentsService } from 'src/app/Services/LogicDocuments.service';

@Component({
  selector: 'app-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css']
})
export class DocumentsItemComponent implements OnInit {
  
  @Input() Document:DocumentModel
  constructor(private router: Router,private logicDocumentsService:LogicDocumentsService) { 
  }

  ngOnInit(): void {
  }

  onClickEditBtn(){
    this.logicDocumentsService.setCurrentDocument(this.Document)
    this.router.navigate(['/edit'])
  }
  onClickDeleteBtn(){
    this.logicDocumentsService.removeDocument(this.Document.DocID)
  }

}
