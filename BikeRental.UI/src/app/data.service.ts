import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { InsertBike } from '../models/InserBike';
 
@Injectable()
export class DataService {
 
    private url = "https://localhost:44353/api/bike";
 
    constructor(private http: HttpClient) {
    }
 
    getBikes() {
        return this.http.get(this.url);
    }
     
    getBikeTypes() {
        return this.http.get(this.url + '/types');
    }
     
    createBike(bike: InsertBike) {
        return this.http.post(this.url, bike);
    }

    updateBike(insertBike: InsertBike) {
        return this.http.put(this.url, insertBike);
    }

    deleteBike(id: number) {
        return this.http.delete(this.url + '/' + id);
    }

    changeBikeStatus(id: number){
        return this.http.put(this.url + '/change-status/', id);
    }
}