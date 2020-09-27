import { Bike } from 'src/app/models/bike';
import { Status } from 'src/app/models/status';

export class BikePhoto extends Bike {
    constructor(
        public id : number,
        public name : string,
        public price : number,
        public type : string,
        public status : Status,
        public photo: string
    ){
        super(id, name, price, type, status);
    }
}