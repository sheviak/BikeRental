import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MapService } from 'src/app/services/map.service';
import { Bike } from 'src/app/models/bike';
import { BikeType } from 'src/app/models/bike.type';
import { Status } from 'src/app/models/status';
import { ErrorService } from "src/app/services/error.srvice";
import { NgEventBus } from 'ng-event-bus';

@Component({
    selector: 'bike-general-app',
    templateUrl: './bike.general.component.html'
})

export class BikeGeneralComponent implements OnInit {

    public bikes: Array<Bike> = [];
    public bikeTypes: Array<BikeType> = [];
    public countFreeBikes: number = 0;
    public totalPrice: number = 0;
    public errors: string = "";

    constructor(
        private dataService: DataService, 
        private mapService: MapService, 
        private errorService: ErrorService,
        private eventBus: NgEventBus
    ){}

    ngOnInit(): void {
        this.loadBikeTypes();
        this.loadBikes();
    }

    public submit(bikeForm: any): void {
        this.eventBus.cast('app:loader', true);
        let bike = this.mapService.mapToInsertBike(bikeForm.value);
        this.dataService.createBike(bike)
            .subscribe(
                (data: Bike) => {
                    this.bikes.push(data);
                    this.countFreeBikes++;
                    this.errors = "";
                    bikeForm.reset();
                },
                error => { this.errors = this.errorService.getError(error); this.eventBus.cast('app:loader', false); },
                () => { this.eventBus.cast('app:loader', false); }
            );
    }

    public changeBikeStatus(bike: Bike): void {
        this.eventBus.cast('app:loader', true);
        this.dataService.changeBikeStatus(bike.id)
            .subscribe(
                (data: Bike) => {
                    if(bike.status == Status.Free){
                        bike.status = Status.Rented;
                        this.countFreeBikes--;
                    } else {
                        bike.status = Status.Free;
                        this.countFreeBikes++;
                    }

                    this.showTotalPrice();
                },
                error => { this.errorService.getError(error); this.eventBus.cast('app:loader', false); },
                () => { this.eventBus.cast('app:loader', false); }
            );
    }

    public delete(bike: Bike): void {
        this.eventBus.cast('app:loader', true);
        this.dataService.deleteBike(bike.id)
            .subscribe(
                () => { 
                    let index = this.bikes.indexOf(bike, 0);
                    if (index > -1) {
                        this.bikes.splice(index, 1);
                    } 
                    this.countFreeBikes--;
                },
                error => { this.errorService.getError(error); this.eventBus.cast('app:loader', false); },
                () => { this.eventBus.cast('app:loader', false); }
            );
    }

    private loadBikes(): void {
        this.eventBus.cast('app:loader', true);
        this.dataService.getBikes()
            .subscribe(
                (data: Bike[]) => {
                    this.totalPrice = data.filter(x => x.status == Status.Rented).reduce((sum, current) => sum + current.price, 0);
                    this.countFreeBikes = data.filter(x => x.status == Status.Free).length;
                    this.bikes = data;
                },
                error => { this.errorService.getError(error); this.eventBus.cast('app:loader', false); },
                () => { this.eventBus.cast('app:loader', false); }
            );
    }

    private loadBikeTypes(): void {
        this.eventBus.cast('app:loader', true);
        this.dataService.getBikeTypes()
            .subscribe(
                (data: BikeType[]) => { this.bikeTypes = data; },
                error => { this.errorService.getError(error); this.eventBus.cast('app:loader', false); },
                () => { this.eventBus.cast('app:loader', false); }
            );
    }

    private showTotalPrice(){
        this.totalPrice = this.bikes.filter(x => x.status == Status.Rented).reduce((sum, current) => sum + current.price, 0);
    }
}