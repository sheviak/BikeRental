import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Bike } from '../models/Bike';
import { BikeType } from '../models/BikeType';
import { Status } from '../models/Status';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [DataService]
})

export class AppComponent implements OnInit {

    bikeForm : FormGroup;
    totalPrice: number = 0;
    freeBikes: Array<Bike> = [];
    rentalBikes: Array<Bike> = [];
    bikeTypes: BikeType[];

    constructor(private dataService: DataService) {
        this.bikeForm = new FormGroup({
            "name": new FormControl("", [Validators.required]),
            "price": new FormControl("", [Validators.required, Validators.min(0.0)]),
            "bikeTypeId": new FormControl("", [Validators.required]),
        });
     }

    ngOnInit(): void {
        this.loadBikeTypes();
        this.loadBikes();
    }

    loadBikeTypes(): void {
        this.dataService.getBikeTypes()
            .subscribe(
                (data: BikeType[]) => { this.bikeTypes = data; },
                error => { alert("Mistake! We are having technical problems, please use the service later!"); }
            );
    }

    loadBikes(): void {
        this.dataService.getBikes()
            .subscribe(
                (data: Bike[]) => {
                    data.forEach(element => {
                        if(element.status == Status.Free) {
                            this.freeBikes.push(element);
                        } else {
                            this.rentalBikes.push(element);
                            this.totalPrice += element.price;
                        }
                    });
                },
                error => { alert("Mistake! We are having technical problems, please use the service later!"); }
            );
    }

    submit(): void{
        this.dataService.createBike(this.bikeForm.value)
            .subscribe(
                (data: Bike) => {
                    this.freeBikes.push(data);
                    this.bikeForm.reset();
                },
                error => {
                    let message = "";
                    for (var key in error.error.errors) {
                        message += `${error.error.errors[key]}\n`;
                    }
                    alert(message);
                }
            );
    }

    delete(bike: Bike): void {
        this.dataService.deleteBike(bike.id)
            .subscribe(
                () => { 
                    let index = this.freeBikes.indexOf(bike, 0);
                    if (index > -1) {
                        this.freeBikes.splice(index, 1);
                    } 
                },
                error => { 
                    alert("We don't can delete this bike, possibly he was deleted earlier."); 
                }
            );
    }

    changeBikeStatus(bike: Bike): void {
        this.dataService.changeBikeStatus(bike.id)
            .subscribe(
                (data: Bike) => {
                    let index: number;
                    if(bike.status == Status.Free){
                        index = this.freeBikes.indexOf(bike, 0);
                        if (index > -1) this.freeBikes.splice(index, 1);
                        this.rentalBikes.push(data);
                        this.totalPrice += data.price;
                    } else {
                        index = this.rentalBikes.indexOf(bike, 0);
                        if (index > -1) this.rentalBikes.splice(index, 1);
                        this.freeBikes.push(data);
                        this.totalPrice -= data.price;
                    }
                },
                error => {
                    alert("We don't can change status in this bike, possibly he was deleted earlier."); 
                }
            );
    }
}