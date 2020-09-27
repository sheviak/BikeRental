import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bike } from 'src/app/models/bike';

@Component({
    selector: 'bike-rent-app',
    templateUrl: './bike-rent.component.html',
})

export class BikeRentComponent {

    @Input()
    totalPrice: number = 0;

    @Input() 
    rentBikes: Array<Bike> = [];

    @Output() 
    onChanged = new EventEmitter<Bike>();
    
    change(increased: Bike) {
        this.onChanged.emit(increased);
    }
    
}