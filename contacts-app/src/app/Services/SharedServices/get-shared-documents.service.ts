import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetSharedDocumentsService {

  responseSubjects = {
    GetSharedDocumentsResponseOK:new Subject<any>(),
    GetSharedDocumentsResponseInvalidUserID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  GetSharedDocuments(value:any){
    var obs =  this.commService.GetSharedDocuments(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onGetSharedDocumentsResponseOK():Subject<any>{
    return this.responseSubjects.GetSharedDocumentsResponseOK
  }
  onGetSharedDocumentsResponseInvalidUserID():Subject<any>{
    return this.responseSubjects.GetSharedDocumentsResponseInvalidUserID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
