import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentModel } from '../Models/DocumentModel';
import { CommService } from './comm.service';
import { LogicUserService } from './LogicUser.service';
import { CreateDocumentService } from './DocumentsServices/create-document.service';
import { GetDocumentService } from './DocumentsServices/get-document.service';
import { GetDocumentsService } from './DocumentsServices/get-documents.service';
import { RemoveDocumentService } from './DocumentsServices/remove-document.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LogicDocumentsService {

  currentUserID:string
  Documents:DocumentModel[]
  numOfDocs = new Subject<number>()
  currentDocument:DocumentModel


  constructor(private router: Router,
              private createDocumentService:CreateDocumentService,
              private getDocumentService:GetDocumentService,
              private getDocumentsService:GetDocumentsService,
              private removeDocumentService:RemoveDocumentService,
              private logicUser:LogicUserService) { 
                  
                this.SubscribeOnSubjects()
              }



  setCurrentDocument(document:DocumentModel){
    this.currentDocument = document
  }
  createDocument(userId:string,docName:string,imgUrl:string){
    var request = {UserID:userId,DocumentName:docName,ImageURL:imgUrl}
    this.createDocumentService.CreateDocument(request)
  }
  getDocuments(){
    var request = {UserID:this.currentUserID}
    this.getDocumentsService.GetDocuments(request)
  }
  removeDocument(docID:string){
    var request = {DocID:docID}
    this.removeDocumentService.RemoveDocument(request)
  }


  SubscribeOnSubjects(){
    
    this.logicUser.currentUserID.subscribe(
      userID =>{
        this.currentUserID = userID
        this.getDocuments()
      }
    )

    this.SubscribeToCreateDoc()
    this.SubscribeToGetDoc()
    this.SubscribeToGetDocs()
    this.SubscribeToRemoveDoc()

  }

  SubscribeToCreateDoc(){
    this.createDocumentService.onCreateDocumentResponseOK().subscribe(
      //Todo Navigate to user documents
        ()=>{
          this.getDocuments()
          console.log("Document added")
        }
    )
    this.createDocumentService.onCreateDocumentResponseInvalidUserID().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.createDocumentService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToGetDoc(){
    this.getDocumentService.onGetDocumentResponseOK().subscribe(
      //Todo Navigate to user documents
        ()=>{
          console.log(" ")
        }
    )
    this.getDocumentService.onGetDocumentResponseInvalidDocID().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.getDocumentService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToGetDocs(){
    this.getDocumentsService.onGetDocumentsResponseOK().subscribe(
        (response)=>{
          this.Documents = new Array<DocumentModel>()
          response.documents.forEach(doc => {
            var tempDoc = new DocumentModel(doc.docID,doc.userID,doc.documentName,doc.imageURL)
            this.Documents.push(tempDoc)
          })
          this.currentDocument = this.Documents[0]
          this.numOfDocs.next(this.Documents.length)
          this.logicUser.loadUserIsDone.next(true)
        }
    )
    this.getDocumentsService.onGetDocumentsResponseInvalidUserID().subscribe(
      //Todo Display message to user 
      (response)=>{
      console.log(response.responseType)
      this.router.navigate(['/log-in'])
      }
    )
    this.getDocumentsService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToRemoveDoc(){
    this.removeDocumentService.onRemoveDocumentResponseOK().subscribe(
      //Todo Navigate to user documents
        ()=>{
          this.getDocuments()
          console.log("Document Removed")
        }
    )
    this.removeDocumentService.onRemoveDocumentResponseInvalidDocID().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.removeDocumentService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }



}
