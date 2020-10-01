import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  responseSubjects = {
    GetUserResponseOK:new Subject<any>(),
    GetUserResponseInvalidUserID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  GetUser(value:any){
    var obs =  this.commService.GetUser(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onGetUserResponseOK():Subject<any>{
    return this.responseSubjects.GetUserResponseOK
  }
  onGetUserResponseInvalidUserID():Subject<any>{
    return this.responseSubjects.GetUserResponseInvalidUserID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
