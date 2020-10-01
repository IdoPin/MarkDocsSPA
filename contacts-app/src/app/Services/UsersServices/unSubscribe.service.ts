import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommService } from '../comm.service';

@Injectable({
  providedIn: 'root'
})
export class UnSubscribeService {

  responseSubjects = {
    UnSubscribeResponseOK:new Subject<any>(),
    UnSubscribeResponseInvalidUserID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  UnSubscribe(value:any){
    var obs =  this.commService.UnSubscribe(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onUnSubscribeResponseOK():Subject<any>{
    return this.responseSubjects.UnSubscribeResponseOK
  }
  onUnSubscribeResponseInvalidUserID():Subject<any>{
    return this.responseSubjects.UnSubscribeResponseInvalidUserID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
