import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateDocumentService {

  responseSubjects = {
    CreateDocumentResponseOK:new Subject<any>(),
    CreateDocumentResponseInvalidUserID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  CreateDocument(value:any){
    var obs =  this.commService.CreateDocument(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onCreateDocumentResponseOK():Subject<any>{
    return this.responseSubjects.CreateDocumentResponseOK
  }
  onCreateDocumentResponseInvalidUserID():Subject<any>{
    return this.responseSubjects.CreateDocumentResponseInvalidUserID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
