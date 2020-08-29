import { Status } from './Status';

export class Bike {
    constructor(
        public id : number,
        public name : string,
        public price : number,
        public type : string,
        public status : Status
    ){}
}