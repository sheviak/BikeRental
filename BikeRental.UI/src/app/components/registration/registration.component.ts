import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html'
})

export class RegistrationComponent {

  constructor(private as: AuthService) { }

  submit(form: NgForm): void {
    this.as.registration(form.value);
  }  

}