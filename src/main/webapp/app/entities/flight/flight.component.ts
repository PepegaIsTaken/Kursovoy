import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IFlight } from 'app/shared/model/flight.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { FlightService } from './flight.service';
import { pdf } from '@progress/kendo-drawing';

@Component({
    selector: 'jhi-flight',
    templateUrl: './flight.component.html'
})
export class FlightComponent implements OnInit, OnDestroy {
    flights: IFlight[];
    currentAccount: any;
    eventSubscriber: Subscription;
    itemsPerPage: number;
    links: any;
    page: any;
    error: any;
    success: any;
    predicate: any;
    reverse: any;
    totalItems: number;
    CallRecent: boolean;

    constructor(
        protected flightService: FlightService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected parseLinks: JhiParseLinks,
        protected accountService: AccountService
    ) {
        this.flights = [];
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.page = 0;
        this.links = {
            last: 0
        };
        this.predicate = 'id';
        this.reverse = true;
        this.CallRecent = false;
    }

    loadAll() {
        this.flightService
            .query({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IFlight[]>) => this.paginateFlights(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    reset() {
        this.page = 0;
        this.flights = [];
        this.loadAll();
        this.CallRecent = false;
    }

    loadPage(page) {
        this.page = page;
        this.loadAll();
    }

    ngOnInit() {
        /*pdf.defineFont({
            'DejaVu Sans': 'https://cdn.kendostatic.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans.ttf',
            'DejaVu Sans|Bold': 'https://cdn.kendostatic.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Bold.ttf',
            'DejaVu Sans|Bold|Italic': 'https://cdn.kendostatic.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf',
            'DejaVu Sans|Italic': 'https://cdn.kendostatic.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf'
        });*/
        pdf.defineFont({
            'DejaVu Sans': 'content/css/assets/DejaVuSans.ttf',
            'DejaVu Sans|Bold': 'content/css/assets/DejaVuSans-Bold.ttf',
            'DejaVu Sans|Bold|Italic': 'content/css/assets/DejaVuSans-Oblique.ttf',
            'DejaVu Sans|Italic': 'content/css/assets/DejaVuSans-Oblique.ttf'
        });
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFlights();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFlight) {
        if (localStorage.getItem(String(item.id)) !== null) {
            item.activated = true;
        }
        return item.id;
    }

    registerChangeInFlights() {
        this.eventSubscriber = this.eventManager.subscribe('flightListModification', response => this.reset());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateFlights(data: IFlight[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        for (let i = 0; i < data.length; i++) {
            this.flights.push(data[i]);
        }
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    setFav(flight, isActivated) {
        flight.activated = isActivated;
        localStorage.setItem(String(flight.id), 'true');
    }

    delFav(flight, isActivated) {
        flight.activated = isActivated;
        localStorage.removeItem(String(flight.id));
    }

    showRecent() {
        this.page = 0;
        this.flights = [];
        this.loadRecent();
    }

    loadRecent() {
        this.CallRecent = true;
        this.flightService
            .queryRecent({
                page: this.page,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IFlight[]>) => this.paginateFlights(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
}
