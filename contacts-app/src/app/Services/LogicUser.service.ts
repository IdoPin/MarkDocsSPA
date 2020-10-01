import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DocumentModel } from '../Models/DocumentModel';
import { UserModel } from '../Models/UserModel';
import { CommService } from './comm.service';
import { GetUserService } from './UsersServices/get-user.service';
import { GetUsersService } from './UsersServices/get-users.service';
import { LogInService } from './UsersServices/log-in.service';
import { RegisterService } from './UsersServices/register.service';
import { UnSubscribeService } from './UsersServices/unSubscribe.service';
import { WebSocketService } from './web-socket.service';


@Injectable({
  providedIn: 'root'
})
export class LogicUserService {

  currentUserID = new Subject<string>()
  loadUserIsDone = new Subject<boolean>()
  loadUsersIsDone = new Subject<boolean>()
  incorrect = new Subject<boolean>()
  
  logedUser:UserModel
  users:Array<UserModel>
  currentDocument:DocumentModel
  
  constructor(private router: Router,
              private getUserService:GetUserService,
              private getUsersService:GetUsersService,
              private logInService:LogInService,
              private registerService:RegisterService,
              private unSubscribeService:UnSubscribeService,
              private webSocketService:WebSocketService) { 
                      this.logedUser = new UserModel()
                      this.users = new Array<UserModel>()
                      this.SubscribeOnSubjects()
              }



  getUser(userID:string){
    var request = {UserID:userID}
    this.getUserService.GetUser(request)

  }
  getUsers(userID:string,userName:string){
    var request = {
      User:{
        UserID:userID,
        UserName:userName
      }
    }
    this.getUsersService.GetUsers(request)

  }
  logIn(userID:string,userName:string){
    
    var request = {
      User:{
        UserID:userID,
        UserName:userName
      }
    }
    this.logInService.LogIn(request)
  }
  register(userID:string,userName:string){
    var request = {
      User:{
        UserID:userID,
        UserName:userName
      }
    }
    this.registerService.Register(request)
  }
  unSubscribe(userID:string,userName:string){
    var request = {
      User:{
        UserID:userID,
        UserName:userName
      }
    }
    this.unSubscribeService.UnSubscribe(request)
  }
  

  SubscribeOnSubjects(){
    
    this.currentUserID.subscribe(
      (userID)=>{
        this.getUser(userID)
      }
    )

    this.loadUserIsDone.subscribe(
      (isloaded)=>{
        if(isloaded){
          this.router.navigate(['/documents'])
        }else{
          this.router.navigate(['/log-in'])
        }
      }
    )

    this.SubscribeToGetUser()
    this.SubscribeToGetUsers()
    this.SubscribeToLogIn()
    this.SubscribeToRegister()
    this.SubscribeToRemoveUser()

  }

  SubscribeToGetUser(){
    this.getUserService.onGetUserResponseOK().subscribe(
      //Todo Navigate to user documents
        (response)=>{
          this.logedUser.UserID = response.user.userID
          this.logedUser.UserName = response.user.userName
          console.log("got user OK")
        }
    )
    this.getUserService.onGetUserResponseInvalidUserID().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.getUserService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToGetUsers(){
    this.getUsersService.onGetUsersResponseOK().subscribe(
      //Todo Navigate to user documents
        (response)=>{
          this.users = new Array<UserModel>()
          response.users.forEach(user => {
            var tempUser = new UserModel()
            tempUser.UserID = user.userID
            tempUser.UserName = user.userName
            this.users.push(tempUser)
          });
          this.loadUsersIsDone.next(true)
          console.log("get users OK")
        }
    )
    this.getUsersService.onGetUsersResponseInvalid().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.getUsersService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToLogIn(){
    this.logInService.onLogInResponseOK().subscribe(
      //Todo Navigate to user documents
        (response)=>{
          console.log("Log-in Succeed")
          this.router.navigate(['/loading'])
          this.currentUserID.next(response.request.user.userID)
          // this.webSocketService.Start(response.request.user.userID)
          this.webSocketService.OpenUserSocket(response.request.user.userID)
        }
    )
    this.logInService.onLogInResponseInvalidPasswordOrUserID().subscribe(
      //Todo Display message to user 
      (response)=>{
        this.incorrect.next(true)
        console.log(response.responseType)
      }
    )
    this.logInService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToRegister(){
    this.registerService.onRegisterResponseOK().subscribe(
      //Todo Navigate to user documents
        ()=>{
          console.log("Register Succeed")
          this.router.navigate(['/log-in'])
        }
    )
    this.registerService.onUserExistsResponse().subscribe(
      //Todo Display message to user 
      ()=>{
        console.log("Email address unavailable!")
        this.router.navigate(['/sign-up'])
      }
    )
    this.registerService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

  SubscribeToRemoveUser(){
    this.unSubscribeService.onUnSubscribeResponseOK().subscribe(
      //Todo Navigate to user documents
        ()=>{
          this.router.navigate(['/sign-up'])
          console.log("User unSubscribed!")
        }
    )
    this.unSubscribeService.onUnSubscribeResponseInvalidUserID().subscribe(
      //Todo Display message to user 
      (response)=>{
        console.log(response.responseType)
      }
    )
    this.unSubscribeService.onError().subscribe
    (
      //Todo Navigate to exit page
      message=>console.log("Error",message)
    )
  }

}
