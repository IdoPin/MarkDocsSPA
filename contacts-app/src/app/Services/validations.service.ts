import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { User } from '../DTO/user';
import { CommService } from './comm.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

constructor(private commService:CommService) { }

isEmailAddressTaken():AsyncValidatorFn
{

  return (control:AbstractControl):
        Observable<ValidationErrors|null> =>{
            var jsonUser = JSON.parse(JSON.stringify({UserID:control.value}))
            return this.commService.GetUser(jsonUser).
            pipe(
              map(response=>response.responseType=="GetUserResponseInvalidUserID"?null
              :{"error":"Invalid"})
            )
        } 
  
}

}
