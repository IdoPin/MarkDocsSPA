import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  
  responseSubjects = {
    LogInResponseOK:new Subject<any>(),
    LogInResponseInvalidPasswordOrUserID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

  constructor(private commService:CommService) { }

  LogIn(value:any){
    var obs =  this.commService.LogIn(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onLogInResponseOK():Subject<any>{
    return this.responseSubjects.LogInResponseOK
  }
  onLogInResponseInvalidPasswordOrUserID():Subject<any>{
    return this.responseSubjects.LogInResponseInvalidPasswordOrUserID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
