import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BikeType } from 'src/app/models/bike.type';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'bike-form-app',
    templateUrl: './bike-form.component.html'
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