import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { DataService } from 'src/app/services/data.service';
import { Bike } from 'src/app/models/bike';

@Component({
  selector: 'photo-galary',
  templateUrl: './photo-galary.component.html'
})

export class PhotoGalaryComponent implements OnInit {

  public bikes: Array<Bike> = [];
  public selectedFile: File = null;
  public selectedBike: Bike = null;

  public isLoader: boolean = false;
  public photos: Array<string> = ["https://i1.imageban.ru/out/2020/09/22/d0b1baaade4786ec6a8113ca53bca49e.jpg", "https://i1.imageban.ru/out/2020/09/22/351189acef5f10c997c8976c93533ce0.jpg"];

  constructor(private up: PhotoService, private ds: DataService) { }

  ngOnInit(): void {
    this.isLoader = true;
    this.ds.getBikes().subscribe(
        (data: Bike[]) => { this.bikes = data; },
        error => { console.log(error); this.isLoader = false; },
        () => { this.isLoader = false; }
      );
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  submit() {
    // this.isLoader = true;

    this.up.uploadPhoto(this.selectedFile, this.selectedBike.id)
      .subscribe(
        (data: any) => {
          console.log(data);
          

        },
        error => { console.log(error); },
        () => { this.isLoader = false; }
      );
  }

}