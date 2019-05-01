import { Moment } from 'moment';
import { IAirport } from 'app/shared/model/airport.model';

export interface IFlight {
    id?: number;
    number?: number;
    passengers?: number;
    distance?: number;
    company?: string;
    seats?: number;
    date?: Moment;
    departureAirport?: IAirport;
    arrivalAirport?: IAirport;
}

export class Flight implements IFlight {
    constructor(
        public id?: number,
        public number?: number,
        public passengers?: number,
        public distance?: number,
        public company?: string,
        public seats?: number,
        public date?: Moment,
        public departureAirport?: IAirport,
        public arrivalAirport?: IAirport
    ) {}
}
