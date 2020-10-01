import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { DocumentsComponent } from './documents/documents.component';
import { UploadingDocumentsComponent } from './uploading-documents/uploading-documents.component';
import { EditComponent } from './edit/edit.component';
import { LoadingComponent } from './Loading/Loading.component';
import { EditToolbarComponent } from './edit-toolbar/edit-toolbar.component';


const routes: Routes = [
  {path:'',component:LoginPageComponent},
  {path:'loading',component:LoadingComponent},
  {path:'documents', component:DocumentsComponent},
  {path:'edit',component:EditComponent},
  {path:'log-in',component:LoginPageComponent},
  {path:'sign-up',component:SignupPageComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
