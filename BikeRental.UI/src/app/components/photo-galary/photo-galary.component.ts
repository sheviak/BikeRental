import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'photo-galary',
  templateUrl: './photo-galary.component.html'
})

export class PhotoGalaryComponent implements OnInit {

  public selectedFile: File
  public photos: Array<string> = ["https://i1.imageban.ru/out/2020/09/22/d0b1baaade4786ec6a8113ca53bca49e.jpg", "https://i1.imageban.ru/out/2020/09/22/351189acef5f10c997c8976c93533ce0.jpg"];
  public isLoader: boolean = false;

  constructor(private up: PhotoService) { }

  ngOnInit(): void {
    // upload photos
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  submit() {
    this.isLoader = true;

    this.up.uploadPhoto(this.selectedFile)
      .subscribe(
        (data: any) => {
          console.log(data.data.link);

          this.up.addToDatabase(data.data.link)
            .subscribe(
              (data: string) => { this.photos.push(data); },
              error => { alert(error); }
            )

        },
        error => { alert(error); },
        () => { this.isLoader = false; }
      );
  }

}