import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private as: AuthService, private router: Router){}

  canActivate(): boolean {
    let href = window.location.pathname;

    if(this.as.isAuthenticated() != null && (href == "/login" || href == "/registration")){
        this.router.navigate([this.router.url]);
    } 
    
    if(this.as.isAuthenticated() == null && href == "/photos"){
      this.router.navigate([this.router.url]);
    }

    return true;
  }
    
}