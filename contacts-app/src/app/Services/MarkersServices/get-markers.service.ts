import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetMarkersService {

  responseSubjects = {
    GetMarkersResponseOK:new Subject<any>(),
    GetMarkersResponseInvalidDocID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  GetMarkers(value:any){
    var obs =  this.commService.GetMarkers(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onGetMarkersResponseOK():Subject<any>{
    return this.responseSubjects.GetMarkersResponseOK
  }
  onGetMarkersResponseInvalidDocID():Subject<any>{
    return this.responseSubjects.GetMarkersResponseInvalidDocID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
