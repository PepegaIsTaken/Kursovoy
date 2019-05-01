import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AirTrafficSharedModule } from 'app/shared';
import {
    FlightComponent,
    FlightDetailComponent,
    FlightUpdateComponent,
    FlightDeletePopupComponent,
    FlightDeleteDialogComponent,
    flightRoute,
    flightPopupRoute
} from './';

const ENTITY_STATES = [...flightRoute, ...flightPopupRoute];

@NgModule({
    imports: [AirTrafficSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [FlightComponent, FlightDetailComponent, FlightUpdateComponent, FlightDeleteDialogComponent, FlightDeletePopupComponent],
    entryComponents: [FlightComponent, FlightUpdateComponent, FlightDeleteDialogComponent, FlightDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AirTrafficFlightModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
