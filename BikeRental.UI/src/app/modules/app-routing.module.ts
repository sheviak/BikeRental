import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { BikeGeneralComponent } from 'src/app/components/bike-general/bike.general.component';
import { PhotoGalaryComponent } from "src/app/components/photo-galary/photo-galary.component";

const routes: Routes = [
    {
        path: "",
        component: BikeGeneralComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "registration",
        component: RegistrationComponent
    },
    {
        path: "photos",
        component: PhotoGalaryComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}