import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MapService } from 'src/app/services/map.service';
import { BikeType } from 'src/app/models/BikeType';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'bike-form-app',
    templateUrl: './bike-form.component.html',
    providers: [ DataService, MapService ]
})

export class BikeFormComponent {

    @Input()
    errors: string ="";
    
    @Input()
    bikeTypes: Array<BikeType> = [];

    @Output() 
    onSubmit = new EventEmitter<NgForm>();
    
    submit(form: NgForm){
        this.onSubmit.emit(form);
    }  

}