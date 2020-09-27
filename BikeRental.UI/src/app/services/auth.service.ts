import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_API_URL } from '../app-injection-tokens';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { RegisterUser } from "src/app/models/register.user";
import { LoginUser } from "src/app/models/login.user";
import { ErrorService } from "src/app/services/error.srvice";

export const ACCESS_TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private http: HttpClient, 
    @Inject(AUTH_API_URL) private apiUrl: string, 
    private jwtHelpers: JwtHelperService, 
    public router: Router,
    private es: ErrorService) { }

  login(user: LoginUser) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  registration(user: RegisterUser){
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  isAuthenticated(): boolean{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelpers.isTokenExpired(token);
  }

  logout(): void{
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }
  
  public get ACCESS_TOKEN_KEY() : string {
    return ACCESS_TOKEN_KEY;
  }
  
}