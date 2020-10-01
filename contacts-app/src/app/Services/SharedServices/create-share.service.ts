import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateShareService {

  responseSubjects = {
    CreateShareResponseOK:new Subject<any>(),
    CreateShareResponseInvalidUserID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  CreateShare(value:any){
    var obs =  this.commService.CreateShare(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onCreateShareResponseOK():Subject<any>{
    return this.responseSubjects.CreateShareResponseOK
  }
  onCreateShareResponseInvalidUserID():Subject<any>{
    return this.responseSubjects.CreateShareResponseInvalidUserID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
