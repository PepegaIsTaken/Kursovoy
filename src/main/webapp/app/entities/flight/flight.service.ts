import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFlight } from 'app/shared/model/flight.model';

type EntityResponseType = HttpResponse<IFlight>;
type EntityArrayResponseType = HttpResponse<IFlight[]>;

@Injectable({ providedIn: 'root' })
export class FlightService {
    public resourceUrl = SERVER_API_URL + 'api/flights';

    constructor(protected http: HttpClient) {}

    create(flight: IFlight): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(flight);
        return this.http
            .post<IFlight>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(flight: IFlight): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(flight);
        return this.http
            .put<IFlight>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFlight>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFlight[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    queryRecent(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFlight[]>(SERVER_API_URL + 'api/flights/date', { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(flight: IFlight): IFlight {
        const copy: IFlight = Object.assign({}, flight, {
            date: flight.date != null && flight.date.isValid() ? flight.date.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.date = res.body.date != null ? moment(res.body.date) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((flight: IFlight) => {
                flight.date = flight.date != null ? moment(flight.date) : null;
            });
        }
        return res;
    }
}
