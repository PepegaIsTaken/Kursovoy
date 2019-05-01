import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IFlight } from 'app/shared/model/flight.model';
import { FlightService } from './flight.service';
import { IAirport } from 'app/shared/model/airport.model';
import { AirportService } from 'app/entities/airport';

@Component({
    selector: 'jhi-flight-update',
    templateUrl: './flight-update.component.html'
})
export class FlightUpdateComponent implements OnInit {
    flight: IFlight;
    isSaving: boolean;

    airports: IAirport[];
    dateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected flightService: FlightService,
        protected airportService: AirportService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ flight }) => {
            this.flight = flight;
        });
        this.airportService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAirport[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAirport[]>) => response.body)
            )
            .subscribe((res: IAirport[]) => (this.airports = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.flight.id !== undefined) {
            this.subscribeToSaveResponse(this.flightService.update(this.flight));
        } else {
            this.subscribeToSaveResponse(this.flightService.create(this.flight));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFlight>>) {
        result.subscribe((res: HttpResponse<IFlight>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAirportById(index: number, item: IAirport) {
        return item.id;
    }
}
