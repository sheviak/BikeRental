import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent { 

    constructor(private as: AuthService) { }
  
    public get isLoggedIn(): boolean{
        return this.as.isAuthenticated();
    }

    logout(){
        this.as.logout();
    }

}