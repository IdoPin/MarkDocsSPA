import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LogicDocumentsService } from '../Services/LogicDocuments.service';




@Component({
  selector: 'app-uploading-documents',
  templateUrl: './uploading-documents.component.html',
  styleUrls: ['./uploading-documents.component.css']
})
export class UploadingDocumentsComponent implements OnInit {

  public progress: number;
  public message: string;
  UploadName:string
  

  constructor (private http: HttpClient,private logicDocumentsService:LogicDocumentsService){
   
  }

  ngOnInit(): void {
  }

  onUploadFinished(body){
    this.logicDocumentsService.createDocument(this.logicDocumentsService.currentUserID,this.UploadName,body.url)
  }

  setMyStyles(){
    let styles = {
      'width': this.progress
    };
    return styles;
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('http://localhost:5000/api/CloudUpload', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished(event.body);
        }
      });
      setTimeout(() => {
        this.message = ""
        this.progress = 0
      }, 1500);
  }

}
