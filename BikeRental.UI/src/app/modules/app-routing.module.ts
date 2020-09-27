import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { BikeGeneralComponent } from 'src/app/components/bike-general/bike.general.component';
import { PhotoGalaryComponent } from "src/app/components/photo-galary/photo-galary.component";
import { NotFoundComponent } from "src/app/components/not-found/not-found.component";
import { AuthGuard } from "src/app/guards/auth.guard";

const routes: Routes = [
    {
        path: "",
        component: BikeGeneralComponent
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "registration",
        component: RegistrationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "photos",
        component: PhotoGalaryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}