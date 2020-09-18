import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MapService } from 'src/app/services/map.service';
import { Bike } from 'src/app/models/Bike';

@Component({
    selector: 'bike-rent-app',
    templateUrl: './bike-rent.component.html',
    providers: [DataService, MapService]
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