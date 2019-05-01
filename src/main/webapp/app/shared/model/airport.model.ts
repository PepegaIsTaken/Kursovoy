import { ICity } from 'app/shared/model/city.model';

export interface IAirport {
    id?: number;
    latitude?: number;
    longitude?: number;
    name?: string;
    airportLocation?: ICity;
}

export class Airport implements IAirport {
    constructor(
        public id?: number,
        public latitude?: number,
        public longitude?: number,
        public name?: string,
        public airportLocation?: ICity
    ) {}
}
