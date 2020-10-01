import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoveShareService {

  responseSubjects = {
    RemoveShareResponseOK:new Subject<any>(),
    RemoveShareResponseInvalidUserID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  RemoveShare(value:any){
    var obs =  this.commService.RemoveShare(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onRemoveShareResponseOK():Subject<any>{
    return this.responseSubjects.RemoveShareResponseOK
  }
  onRemoveShareResponseInvalidUserID():Subject<any>{
    return this.responseSubjects.RemoveShareResponseInvalidUserID
  }
  onError():Subject<any>{
    return this.errorSubject
  }
}
