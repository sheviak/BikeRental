import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_API_URL } from '../app-injection-tokens';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { RegisterUser } from "src/app/models/register.user";
import { LoginUser } from "src/app/models/login.user";

export const ACCESS_TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, @Inject(AUTH_API_URL) private apiUrl: string, private jwtHelpers: JwtHelperService, private router: Router) { }

  login(user: LoginUser) {
    return this.http.post(`${this.apiUrl}/login`, user)
      .subscribe(
        (res: any) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token);
          this.router.navigate(['']);
        },
        error => { this.showError(error); }
      );
  }

  registration(user: RegisterUser){
    return this.http.post(`${this.apiUrl}/register`, user)
      .subscribe(
        (res: any) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token);
          this.router.navigate(['']);
        },
        error => { this.showError(error); }
      );
  }

  isAuthenticated(): boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelpers.isTokenExpired(token);
  }

  logout(): void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }

  private showError(error){
    switch(error.status){
        case 400: // validation error
          let errors: string = "";
          let map = new Map<string, string[]>();

          if(error.error.ValidationErrors != null){
            for (var value in error.error.ValidationErrors) {  
                map.set(value, error.error.ValidationErrors[value])  
            }  
          } else {
            for (var value in error.error) {  
              map.set(value, error.error[value])  
            }  
          }

          for (let [key, value] of map.entries()) {
            value.forEach(element => { errors += `${element}\n`;  });
            errors += `\n`;
          }

          alert(errors);
        break;
        case 401: // when send don't corrent data
          alert(error.error.message);
          break;
        case 500: // server error
            alert("Ops! An error occurred on the server...");
        break;
        default:
            alert("Ops! An unexpected error...");
            break;
    }
  }

}