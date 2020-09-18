import { NgModule }      from '@angular/core';
import { AppComponent }   from './app.component';
import { BikeSharedModule } from './modules/bike.shared.module';

@NgModule({
    imports:      [ BikeSharedModule ],
    declarations: [ AppComponent ],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }