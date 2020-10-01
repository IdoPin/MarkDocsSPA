import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetUsersService {

  responseSubjects = {
    GetUsersResponseOK:new Subject<any>(),
    GetUsersResponseInvalid:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  GetUsers(value:any){
    var obs =  this.commService.GetUsers(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onGetUsersResponseOK():Subject<any>{
    return this.responseSubjects.GetUsersResponseOK
  }
  onGetUsersResponseInvalid():Subject<any>{
    return this.responseSubjects.GetUsersResponseInvalid
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
