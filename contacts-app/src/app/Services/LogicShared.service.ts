import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DocumentModel } from '../Models/DocumentModel';
import { LogicDocumentsService } from './LogicDocuments.service';
import { LogicUserService } from './LogicUser.service';
import { CreateShareService } from './SharedServices/create-share.service';
import { GetSharedDocumentsService } from './SharedServices/get-shared-documents.service';
import { GetSharedUsersService } from './SharedServices/get-shared-users.service';
import { RemoveShareService } from './SharedServices/remove-share.service';

@Injectable({
  providedIn: 'root'
})
export class LogicSharedService {

  myDocument:DocumentModel
  showSection = new Subject<string>()
  isSharedUsersIDLoaded = new Subject<boolean>()
  isunSharedUsersIDLoaded = new Subject<boolean>()
  sharedUsersID:Array<string>
  unSharedUsersID:Array<string>

constructor(private router: Router,
            private createShareService:CreateShareService,
            private getSharedDocumentsService:GetSharedDocumentsService,
            private getSharedUsersService:GetSharedUsersService,
            private removeShareService:RemoveShareService,
            private logicUserService:LogicUserService,
            private logicDocumentsService:LogicDocumentsService) { 
              this.SubscribeOnSubjects()
              this.myDocument = this.logicDocumentsService.currentDocument
              this.sharedUsersID = new Array<string>()
              this.unSharedUsersID = new Array<string>()
              this.getSharedUsers(this.myDocument.DocID)
            }


  createShare(docID:string,userID:string){
    var request = {
      Share:{
        DocID:docID,
        UserID:userID
        }
      }
      this.createShareService.CreateShare(request)
  }
  getSharedDocuments(userID:string){
    var request = {UserID:userID}
    this.getSharedDocumentsService.GetSharedDocuments(request)
  }
  getSharedUsers(docID:string){
    var request = {DocID:docID}
    this.getSharedUsersService.GetSharedUsers(request)
  }
  removeShare(docID:string,userID:string){
    var request = {
      Share:{
        DocID:docID,
        UserID:userID
        }
      }
    this.removeShareService.RemoveShare(request)
  }


  getUnsharedUsersID(){
    this.logicUserService.getUsers(this.logicUserService.logedUser.UserID,this.logicUserService.logedUser.UserName)
  }

  SubscribeOnSubjects(){
    
    this.SubscribeToCreateShare()
    this.SubscribeToGetSharedDocuments()
    this.SubscribeToGetSharedUsers()
    this.SubscribeToRemoveShare()
    this.SubscribeToGetUsers()


  }

  SubscribeToCreateShare(){
    this.createShareService.onCreateShareResponseOK().subscribe(
        ()=>{
          this.getSharedUsers(this.myDocument.DocID)
          console.log("create share ok")
        }
    )
    this.createShareService.onCreateShareResponseInvalidUserID().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.createShareService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToGetSharedDocuments(){
    this.getSharedDocumentsService.onGetSharedDocumentsResponseOK().subscribe(
        ()=>{
          console.log("")
        }
    )
    this.getSharedDocumentsService.onGetSharedDocumentsResponseInvalidUserID().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.getSharedDocumentsService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToGetSharedUsers(){
    this.getSharedUsersService.onGetSharedUsersResponseOK().subscribe(
        (response)=>{
          this.sharedUsersID = new Array<string>()
          response.users.forEach(userID => {
            this.sharedUsersID.push(userID)
          });
          this.getUnsharedUsersID()
          this.isSharedUsersIDLoaded.next(true)
          console.log("get shared users ok")
        }
    )
    this.getSharedUsersService.onGetSharedUsersResponseInvalidDocID().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.getSharedUsersService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToRemoveShare(){
    this.removeShareService.onRemoveShareResponseOK().subscribe(
        ()=>{ 
          this.getSharedUsers(this.myDocument.DocID)
          console.log("shared removed")
        }
    )
    this.removeShareService.onRemoveShareResponseInvalidUserID().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.removeShareService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }
  SubscribeToGetUsers(){
    this.logicUserService.loadUsersIsDone.subscribe(
      (response)=>{
        this.unSharedUsersID = new Array<string>()
        if(response){
          this.logicUserService.users.forEach(user => {
            var isUserShared = this.sharedUsersID.indexOf(user.UserID)
            if(user.UserID!=this.myDocument.UserID && isUserShared == -1){
              this.unSharedUsersID.push(user.UserID)
            }
          });
        }
        this.isunSharedUsersIDLoaded.next(true)
      }
    )
  }






}


