import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoveDocumentService {

  responseSubjects = {
    RemoveDocumentResponseOK:new Subject<any>(),
    RemoveDocumentResponseInvalidDocID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  RemoveDocument(value:any){
    var obs =  this.commService.RemoveDocument(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onRemoveDocumentResponseOK():Subject<any>{
    return this.responseSubjects.RemoveDocumentResponseOK
  }
  onRemoveDocumentResponseInvalidDocID():Subject<any>{
    return this.responseSubjects.RemoveDocumentResponseInvalidDocID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
