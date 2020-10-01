import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetMarkerService {

  responseSubjects = {
    GetMarkerResponseOK:new Subject<any>(),
    GetMarkerResponseInvalid:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  GetMarker(value:any){
    var obs =  this.commService.GetMarker(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onGetMarkerResponseOK():Subject<any>{
    return this.responseSubjects.GetMarkerResponseOK
  }
  onGetMarkerResponseInvalid():Subject<any>{
    return this.responseSubjects.GetMarkerResponseInvalid
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
