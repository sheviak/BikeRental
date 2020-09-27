import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bike } from 'src/app/models/bike'

@Component({
    selector: 'bike-available-app',
    templateUrl: './bike-available.component.html'
})

export class BikeAvailableComponent {

    @Input() 
    bikeAvailables: Array<Bike> = [];

    @Input()
    countFreeBikes: number = 0;
    
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