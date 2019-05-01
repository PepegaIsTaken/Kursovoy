import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Flight } from 'app/shared/model/flight.model';
import { FlightService } from './flight.service';
import { FlightComponent } from './flight.component';
import { FlightDetailComponent } from './flight-detail.component';
import { FlightUpdateComponent } from './flight-update.component';
import { FlightDeletePopupComponent } from './flight-delete-dialog.component';
import { IFlight } from 'app/shared/model/flight.model';

@Injectable({ providedIn: 'root' })
export class FlightResolve implements Resolve<IFlight> {
    constructor(private service: FlightService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFlight> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Flight>) => response.ok),
                map((flight: HttpResponse<Flight>) => flight.body)
            );
        }
        return of(new Flight());
    }
}

export const flightRoute: Routes = [
    {
        path: '',
        component: FlightComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'airTrafficApp.flight.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FlightDetailComponent,
        resolve: {
            flight: FlightResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'airTrafficApp.flight.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FlightUpdateComponent,
        resolve: {
            flight: FlightResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'airTrafficApp.flight.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FlightUpdateComponent,
        resolve: {
            flight: FlightResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'airTrafficApp.flight.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flightPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FlightDeletePopupComponent,
        resolve: {
            flight: FlightResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'airTrafficApp.flight.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
