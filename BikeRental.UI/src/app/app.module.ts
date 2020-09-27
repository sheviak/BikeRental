import { AppComponent } from "src/app/app.component";
import { AppRoutingModule } from "src/app/modules/app-routing.module";
import { BikeSharedModule } from "src/app/modules/bike.shared.module";
import { BikeGeneralComponent } from "src/app/components/bike-general/bike.general.component";
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LoginComponent } from "src/app/components/login/login.component";
import { RegistrationComponent } from "src/app/components/registration/registration.component";
import { HttpClientModule } from "@angular/common/http";
import { JwtModule } from "@auth0/angular-jwt";
import { APP_BASE_HREF } from '@angular/common';
import { AUTH_API_URL } from "src/app/app-injection-tokens";
import { ACCESS_TOKEN_KEY } from "src/app/services/auth.service";
import { environment } from 'src/environments/environment';
import { PhotoGalaryComponent } from 'src/app/components/photo-galary/photo-galary.component';
import { NgEventBus } from 'ng-event-bus';
import { NotFoundComponent } from "src/app/components/not-found/not-found.component";

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
    imports: [ 
      AppRoutingModule,
      BikeSharedModule, 
      CommonModule, 
      FormsModule, 
      HttpClientModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: environment.tokenWhiteListedDomains
        },
      })      
    ],
    declarations: [ AppComponent, BikeGeneralComponent, RegistrationComponent, LoginComponent, PhotoGalaryComponent, NotFoundComponent ],
    bootstrap:    [ AppComponent ],
    providers: [
      NgEventBus,
      {
        provide: APP_BASE_HREF,
        useValue: "/"
      },
      { 
        provide: AUTH_API_URL, 
        useValue: environment.authUrl 
      }
    ]
})

export class AppModule { }