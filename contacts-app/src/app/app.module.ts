import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './user/user.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';


import { DocumentsComponent } from './documents/documents.component';
import { DocumentsListComponent } from './documents/documents-list/documents-list.component';
import { DocumentsItemComponent } from './documents/documents-item/documents-item.component';


import { UploadingDocumentsComponent } from './uploading-documents/uploading-documents.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EditComponent } from './edit/edit.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './Loading/Loading.component';

import { LogicDocumentsService } from 'src/app/Services/LogicDocuments.service';
import { LogicUserService } from 'src/app/Services/LogicUser.service';
import { EditToolbarComponent } from './edit-toolbar/edit-toolbar.component';
import { WebSocketService } from './Services/web-socket.service';



@NgModule({
  declarations: [		
    AppComponent,
    HeaderComponent,
    UserComponent,
    LoginPageComponent,
    SignupPageComponent,
    DocumentsComponent,
    DocumentsListComponent,
    DocumentsItemComponent,
    UploadingDocumentsComponent,
    EditComponent,
    LoadingComponent,
    EditToolbarComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    HttpClientModule,
  ],
  providers: [LogicDocumentsService,LogicUserService,WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
