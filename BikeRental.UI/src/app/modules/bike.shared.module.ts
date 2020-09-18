import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BikeFormComponent } from 'src/app/components/bike-form/bike-form.component';
import { BikeRentComponent } from 'src/app/components/bike-rent/bike-rent.component';
import { BikeGenericComponent } from 'src/app/components/bike-generic/bike.generic.component';
import { BikeAvailableComponent } from 'src/app/components/bike-available/bike-available.component';

@NgModule({
    imports: [
                    BrowserModule,
                    HttpClientModule, 
                    FormsModule
    ],
    exports:      [ BikeFormComponent, BikeRentComponent, BikeAvailableComponent, BikeGenericComponent ],
    declarations: [ BikeFormComponent, BikeRentComponent, BikeAvailableComponent, BikeGenericComponent ]
})

export class BikeSharedModule { }  