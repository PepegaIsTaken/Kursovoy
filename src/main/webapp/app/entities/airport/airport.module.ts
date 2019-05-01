import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { AirTrafficSharedModule } from 'app/shared';
import {
    AirportComponent,
    AirportDetailComponent,
    AirportUpdateComponent,
    AirportDeletePopupComponent,
    AirportDeleteDialogComponent,
    airportRoute,
    airportPopupRoute
} from './';

const ENTITY_STATES = [...airportRoute, ...airportPopupRoute];

@NgModule({
    imports: [AirTrafficSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AirportComponent,
        AirportDetailComponent,
        AirportUpdateComponent,
        AirportDeleteDialogComponent,
        AirportDeletePopupComponent
    ],
    entryComponents: [AirportComponent, AirportUpdateComponent, AirportDeleteDialogComponent, AirportDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AirTrafficAirportModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
