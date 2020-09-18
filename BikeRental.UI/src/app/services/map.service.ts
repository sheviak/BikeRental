import { Injectable } from "@angular/core";
import { InsertBike } from "src/app/models/InserBike";

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