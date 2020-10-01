import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetSharedUsersService {

  responseSubjects = {
    GetSharedUsersResponseOK:new Subject<any>(),
    GetSharedUsersResponseInvalidDocID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  GetSharedUsers(value:any){
    var obs =  this.commService.GetSharedUsers(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onGetSharedUsersResponseOK():Subject<any>{
    return this.responseSubjects.GetSharedUsersResponseOK
  }
  onGetSharedUsersResponseInvalidDocID():Subject<any>{
    return this.responseSubjects.GetSharedUsersResponseInvalidDocID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
