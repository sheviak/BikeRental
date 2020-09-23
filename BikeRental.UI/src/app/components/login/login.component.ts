import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent {

  public error: string = "";

  constructor(private as: AuthService) { }

  submit(form: NgForm){
    this.as.login(form.value);
  }
}
