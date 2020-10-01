import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogicUserService } from '../Services/LogicUser.service';
import { RegisterService } from '../Services/UsersServices/register.service';
import { ValidationsService } from '../Services/validations.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
  providers:[RegisterService]
})
export class SignupPageComponent implements OnInit {


  form: FormGroup

  constructor(private logicUserService:LogicUserService,private validationsService:ValidationsService) { }

  get UserName() { return this.form.get('UserName'); }
  get UserID() { return this.form.get('UserID'); }


  ngOnInit(): void {
    this.form = new FormGroup({
      UserID: new FormControl(null, [Validators.required, Validators.email],this.validationsService.isEmailAddressTaken()),
      UserName: new FormControl(null, [Validators.required]),
    });
  }

  onClickSumbit() {
    this.logicUserService.register(this.UserID.value,this.UserName.value)
  }

}
