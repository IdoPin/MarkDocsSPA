import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommService {

  WebApiAddress = environment.apiUrl

  constructor(private http:HttpClient) { }
 
  //Users
  Register(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Users/CreateUser/',value)
  }
  LogIn(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Users/LogIn/',value)
  }
  GetUser(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Users/GetUser/',value)
  }
  GetUsers(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Users/GetUsers/',value)
  }
  UnSubscribe(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Users/UnSubscribe/',value)
  }
  
  //Documents
  CreateDocument(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Documents/CreateDocument/',value)
  }
  GetDocument(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Documents/GetDocument/',value)
  }
  GetDocuments(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Documents/GetDocuments/',value)
  }
  RemoveDocument(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Documents/RemoveDocument/',value)
  }
  
  //Markers
  CreateMarker(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Markers/CreateMarker/',value)
  }
  GetMarker(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Markers/GetMarker/',value)
  }
  GetMarkers(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Markers/GetMarkers/',value)
  }
  RemoveMarker(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Markers/RemoveMarker/',value)
  }
  
  //Shares
  CreateShare(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Shares/CreateShare/',value)
  }
  GetSharedDocuments(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Shares/GetSharedDocuments/',value)
  }
  GetSharedUsers(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Shares/GetSharedUsers/',value)
  }
  RemoveShare(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'Shares/RemoveShare/',value)
  }

  //Cloud
  CloudUpload(value:any):Observable<any>{
    return this.http.post(this.WebApiAddress+'CloudUpload/UploadPhoto/',value)
  }
  

}
