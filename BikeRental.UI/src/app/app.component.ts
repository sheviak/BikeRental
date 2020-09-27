import { Component } from '@angular/core';
import { NgEventBus } from 'ng-event-bus';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html'
})

export class AppComponent { 

    public isLoader: boolean = false;

    constructor(private as: AuthService, private eventBus: NgEventBus) {
        eventBus.on('app:loader').subscribe((message: boolean)=>{
            this.isLoader = message;
        });
     }
  
    public get isLoggedIn(): boolean{
        return this.as.isAuthenticated();
    }

    logout(){
        this.as.logout();
    }

    loader(load: boolean){
        this.isLoader = load;
    }

}
