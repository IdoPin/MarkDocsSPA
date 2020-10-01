import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommService } from '../comm.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  responseSubjects = {
    CreateUserResponseOK:new Subject<any>(),
    CreateUserResponseInvalidUserID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

  constructor(private commService:CommService) { }

  Register(value:any){
    var obs =  this.commService.Register(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onRegisterResponseOK():Subject<any>{
    return this.responseSubjects.CreateUserResponseOK
  }
  onUserExistsResponse():Subject<any>{
    return this.responseSubjects.CreateUserResponseInvalidUserID
  }
  onError():Subject<any>{
    return this.errorSubject
  }
  
}
