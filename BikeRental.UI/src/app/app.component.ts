import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MapService } from 'src/app/services/map.service';
import { Bike } from 'src/app/models/Bike';
import { BikeType } from 'src/app/models/BikeType';
import { Status } from 'src/app/models/Status';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [ DataService, MapService ]
})

export class AppComponent implements OnInit {

    public bikes: Array<Bike> = [];
    public bikeTypes: Array<BikeType> = [];
    public isLoader: boolean = false;
    public countFreeBikes: number = 0;
    public totalPrice: number = 0;
    public errors: string = "";

    constructor(private dataService: DataService, private mapService: MapService){}

    ngOnInit(): void {
        this.loadBikeTypes();
        this.loadBikes();
    }

    submit(bikeForm: any): void {
        this.isLoader = true;
        let bike = this.mapService.mapToInsertBike(bikeForm.value);
        this.dataService.createBike(bike)
            .subscribe(
                (data: Bike) => {
                    this.bikes.push(data);
                    this.countFreeBikes++;
                    this.errors = "";
                    bikeForm.reset();
                },
                error => { this.showError(error); },
                () => { this.isLoader = false; }
            );
    }

    public changeBikeStatus(bike: Bike): void {
        this.isLoader = true;
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
                error => { this.showError(error); },
                () => { this.isLoader = false; }
            );
    }

    public delete(bike: Bike): void {
        this.isLoader = true;
        this.dataService.deleteBike(bike.id)
            .subscribe(
                () => { 
                    let index = this.bikes.indexOf(bike, 0);
                    if (index > -1) {
                        this.bikes.splice(index, 1);
                    } 
                    this.countFreeBikes--;
                },
                error => { this.showError(error); },
                () => { this.isLoader = false; }
            );
    }

    private loadBikes(): void {
        this.isLoader = true;
        this.dataService.getBikes()
            .subscribe(
                (data: Bike[]) => {
                    this.totalPrice = data.filter(x => x.status == Status.Rented).reduce((sum, current) => sum + current.price, 0);
                    this.countFreeBikes = data.filter(x => x.status == Status.Free).length;
                    this.bikes = data;
                },
                error => { this.showError(error); },
                () => { this.isLoader = false; }
            );
    }

    private loadBikeTypes(): void {
        this.isLoader = true;
        this.dataService.getBikeTypes()
            .subscribe(
                (data: BikeType[]) => { this.bikeTypes = data; },
                error => { this.showError(error); },
                () => { this.isLoader = false; }
            );
    }

    private showError(error){
        switch(error.status){
            case 400: // validation error
                let map = new Map<string, string[]>();

                for (var value in error.error.ValidationErrors) {  
                    map.set(value, error.error.ValidationErrors[value])  
                }  
    
                for (let [key, value] of map.entries()) {
                    value.forEach(element => { this.errors += `${element}\n`;  });
                    this.errors += `\n`;
                }
            break;
            case 404: // not found
                alert("This bike is not found!");
            break;
            case 500: // server error
                alert("Ops! An error occurred on the server...");
            break;
            default:
                alert("Ops! An unexpected error...");
                break;
        }
    }

    private async showTotalPrice(){
        // await this.delay(2000);
        this.totalPrice = this.bikes.filter(x => x.status == Status.Rented).reduce((sum, current) => sum + current.price, 0);
    }

    private delay(ms: number)
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}