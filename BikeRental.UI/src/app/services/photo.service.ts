import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PhotoService {

    constructor(private http: HttpClient){ }

    public uploadPhoto(file: any){
        
        let uploadData = new FormData();
        uploadData.append('image', file, file.name);
        uploadData.append('secret_key', environment.secret_key);

        return this.http.post(environment.photoApiUrl, uploadData, {
            headers: new HttpHeaders().set("Authorization", environment.tokenPhotoApiUrl)
        });
    }

    public addToDatabase(link: string){
        return this.http.post(environment.apiPhotoUrl, link);
    }
}