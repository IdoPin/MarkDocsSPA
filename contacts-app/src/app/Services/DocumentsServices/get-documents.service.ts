import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDocumentsService {

  responseSubjects = {
    GetDocumentsResponseOK:new Subject<any>(),
    GetDocumentsResponseInvalidUserID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  GetDocuments(value:any){
    var obs =  this.commService.GetDocuments(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onGetDocumentsResponseOK():Subject<any>{
    return this.responseSubjects.GetDocumentsResponseOK
  }
  onGetDocumentsResponseInvalidUserID():Subject<any>{
    return this.responseSubjects.GetDocumentsResponseInvalidUserID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
