export interface ICity {
    id?: number;
    name?: string;
    country?: string;
    population?: number;
}

export class City implements ICity {
    constructor(public id?: number, public name?: string, public country?: string, public population?: number) {}
}
