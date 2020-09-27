import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { DataService } from 'src/app/services/data.service';
import { BikePhoto } from 'src/app/models/bike.photo';
import { ErrorService } from "src/app/services/error.srvice";
import { NgEventBus } from 'ng-event-bus';

@Component({
  selector: 'photo-galary',
  templateUrl: './photo-galary.component.html'
})

export class PhotoGalaryComponent implements OnInit {

  public bikes: Array<BikePhoto> = [];
  public selectedFile: File = null;
  public selectedBike: BikePhoto = null;
  public errors: string = "";

  constructor(private up: PhotoService, private ds: DataService, private es: ErrorService, private eventBus: NgEventBus) { }

  ngOnInit(): void {
    this.eventBus.cast('app:loader', true);
    this.ds.getBikesWithPhoto().subscribe(
        (data: BikePhoto[]) => { this.bikes = data; },
        error => { this.es.getError(error); this.eventBus.cast('app:loader', false); },
        () => { this.eventBus.cast('app:loader', false); }
      );
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    this.eventBus.cast('app:loader', true);
    this.up.uploadPhoto(this.selectedFile, this.selectedBike.id)
      .subscribe(
        (data: any) => {
          let index = this.bikes.indexOf(this.selectedBike, 0);
          if (index > -1) {
              this.bikes.splice(index, 1);
          } 
          this.bikes.push(data);   
          this.selectedFile = null;
          this.selectedBike = null;
        },
        error => { this.errors = this.es.getError(error); this.eventBus.cast('app:loader', false); },
        () => { this.eventBus.cast('app:loader', false); }
      );
  }

}