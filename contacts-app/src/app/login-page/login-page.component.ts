import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LogInService } from '../Services/UsersServices/log-in.service';
import { LogicUserService } from '../Services/LogicUser.service';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers:[LogInService]
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  incorrect = false


  constructor(private router: Router,private logInService:LogInService,private logicUserService:LogicUserService) { }

  get UserName() { return this.form.get('UserName'); }
  get UserID() { return this.form.get('UserID'); }


  ngOnInit(): void {
    this.form = new FormGroup({
      UserID: new FormControl(null, [Validators.required]),
      UserName: new FormControl(null, [Validators.required]),
    });
    this.SubscribeOnSubjects()
  }

  onClickSumbit() {
    this.logicUserService.logIn(this.UserID.value,this.UserName.value)
  }
  SubscribeOnSubjects(){
    this.logicUserService.incorrect.subscribe(
      (res)=>{this.incorrect = res}
    )
  }

}
