import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommService } from '../comm.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateMarkerService {

  responseSubjects = {
    CreateMarkerResponseOK:new Subject<any>(),
    CreateMarkerResponseInvalidMarkerData:new Subject<any>()
  }
  errorSubject = new Subject<any>()

constructor(private commService:CommService) { }

  CreateMarker(value:any){
    var obs =  this.commService.CreateMarker(value).pipe(
      map(response=>[this.responseSubjects[response.responseType],response]))
    var subscriber =  obs.subscribe(
      ([responseSubject,response])=>responseSubject.next(response),
      error=>this.onError().next(error),
      ()=>console.log("Communication Completed")
    )
  }

  onCreateMarkerResponseOK():Subject<any>{
    return this.responseSubjects.CreateMarkerResponseOK
  }
  onCreateMarkerResponseInvalidMarkerData():Subject<any>{
    return this.responseSubjects.CreateMarkerResponseInvalidMarkerData
  }
  onError():Subject<any>{
    return this.errorSubject
  }

}
