import { Injectable } from "@angular/core";
import { InsertBike } from "src/app/models/insert.bike";

@Injectable()
export class MapService {
    
    mapToInsertBike(bike: any){
        let bikeApi = new InsertBike(
            bike.name,
            bike.price,
            bike.type.id
        );
            
        return bikeApi;
    }

}