import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bike } from 'src/app/models/bike'

@Component({
    selector: 'bike-generic-app',
    templateUrl: './bike.generic.component.html',
})

export class BikeGenericComponent {

    @Input() 
    bike: Bike;

    @Output() 
    onChanged = new EventEmitter<Bike>();
    
    change(increased: Bike) {
        this.onChanged.emit(increased);
    }

    @Output()
    onDeleted = new EventEmitter<Bike>();

    delete(increased: Bike){
        this.onDeleted.emit(increased);
    }

}