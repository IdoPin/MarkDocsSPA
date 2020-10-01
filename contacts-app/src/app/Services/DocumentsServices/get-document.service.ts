import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GetDocumentService {

  responseSubjects = {
    GetDocumentResponseOK:new Subject<any>(),
    GetDocumentResponseInvalidDocID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  GetDocument(value:any){
    var obs =  this.commService.GetDocument(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onGetDocumentResponseOK():Subject<any>{
    return this.responseSubjects.GetDocumentResponseOK
  }
  onGetDocumentResponseInvalidDocID():Subject<any>{
    return this.responseSubjects.GetDocumentResponseInvalidDocID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
