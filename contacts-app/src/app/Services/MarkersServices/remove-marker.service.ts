import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemoveMarkerService {

  responseSubjects = {
    RemoveMarkerResponseOK:new Subject<any>(),
    RemoveMarkerResponseInvalidMarkerID:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  RemoveMarker(value:any){
    var obs =  this.commService.RemoveMarker(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onRemoveMarkerResponseOK():Subject<any>{
    return this.responseSubjects.RemoveMarkerResponseOK
  }
  onRemoveMarkerResponseInvalidMarkerID():Subject<any>{
    return this.responseSubjects.RemoveMarkerResponseInvalidMarkerID
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
