import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PhotoService {

    constructor(private http: HttpClient){ }

    public uploadPhoto(file, bikeId){
        let uploadData = new FormData();
        uploadData.append('avatar', file, file.name);
        uploadData.append('bikeId', bikeId);

        return this.http.post(environment.apiPhotoUrl, uploadData);
    }

}