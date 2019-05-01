import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAirport } from 'app/shared/model/airport.model';
import { AirportService } from './airport.service';
import { ICity } from 'app/shared/model/city.model';
import { CityService } from 'app/entities/city';

@Component({
    selector: 'jhi-airport-update',
    templateUrl: './airport-update.component.html'
})
export class AirportUpdateComponent implements OnInit {
    airport: IAirport;
    isSaving: boolean;

    cities: ICity[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected airportService: AirportService,
        protected cityService: CityService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ airport }) => {
            this.airport = airport;
        });
        this.cityService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICity[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICity[]>) => response.body)
            )
            .subscribe((res: ICity[]) => (this.cities = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.airport.id !== undefined) {
            this.subscribeToSaveResponse(this.airportService.update(this.airport));
        } else {
            this.subscribeToSaveResponse(this.airportService.create(this.airport));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAirport>>) {
        result.subscribe((res: HttpResponse<IAirport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCityById(index: number, item: ICity) {
        return item.id;
    }
}
