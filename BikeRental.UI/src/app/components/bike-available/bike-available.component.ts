import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MapService } from 'src/app/services/map.service';
import { Bike } from 'src/app/models/Bike'

@Component({
    selector: 'bike-available-app',
    templateUrl: './bike-available.component.html',
    providers: [DataService, MapService]
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