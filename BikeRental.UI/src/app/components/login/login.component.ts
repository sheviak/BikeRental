import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgEventBus } from 'ng-event-bus';
import { AuthService } from "src/app/services/auth.service";
import { ErrorService } from "src/app/services/error.srvice";

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})

export class LoginComponent {

  public errors: string = "";

  constructor(private as: AuthService, private es: ErrorService, private eventBus: NgEventBus) { }

  submit(form: NgForm){
    this.eventBus.cast('app:loader', true);
    this.as.login(form.value).subscribe(
      (res: any) => {
        localStorage.setItem(this.as.ACCESS_TOKEN_KEY, res.access_token);
        this.as.router.navigate(['']);
      },
      error => { this.errors = this.es.getError(error); this.eventBus.cast('app:loader', false); },
      () => { this.eventBus.cast('app:loader', false); }
    );
  }
}