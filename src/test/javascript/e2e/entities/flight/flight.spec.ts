/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FlightComponentsPage, FlightDeleteDialog, FlightUpdatePage } from './flight.page-object';

const expect = chai.expect;

describe('Flight e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let flightUpdatePage: FlightUpdatePage;
    let flightComponentsPage: FlightComponentsPage;
    let flightDeleteDialog: FlightDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Flights', async () => {
        await navBarPage.goToEntity('flight');
        flightComponentsPage = new FlightComponentsPage();
        await browser.wait(ec.visibilityOf(flightComponentsPage.title), 5000);
        expect(await flightComponentsPage.getTitle()).to.eq('airTrafficApp.flight.home.title');
    });

    it('should load create Flight page', async () => {
        await flightComponentsPage.clickOnCreateButton();
        flightUpdatePage = new FlightUpdatePage();
        expect(await flightUpdatePage.getPageTitle()).to.eq('airTrafficApp.flight.home.createOrEditLabel');
        await flightUpdatePage.cancel();
    });

    it('should create and save Flights', async () => {
        const nbButtonsBeforeCreate = await flightComponentsPage.countDeleteButtons();

        await flightComponentsPage.clickOnCreateButton();
        await promise.all([
            flightUpdatePage.setNumberInput('5'),
            flightUpdatePage.setPassengersInput('5'),
            flightUpdatePage.setDistanceInput('5'),
            flightUpdatePage.setCompanyInput('company'),
            flightUpdatePage.setSeatsInput('5'),
            flightUpdatePage.setDateInput('2000-12-31'),
            flightUpdatePage.departureAirportSelectLastOption(),
            flightUpdatePage.arrivalAirportSelectLastOption()
        ]);
        expect(await flightUpdatePage.getNumberInput()).to.eq('5');
        expect(await flightUpdatePage.getPassengersInput()).to.eq('5');
        expect(await flightUpdatePage.getDistanceInput()).to.eq('5');
        expect(await flightUpdatePage.getCompanyInput()).to.eq('company');
        expect(await flightUpdatePage.getSeatsInput()).to.eq('5');
        expect(await flightUpdatePage.getDateInput()).to.eq('2000-12-31');
        await flightUpdatePage.save();
        expect(await flightUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await flightComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Flight', async () => {
        const nbButtonsBeforeDelete = await flightComponentsPage.countDeleteButtons();
        await flightComponentsPage.clickOnLastDeleteButton();

        flightDeleteDialog = new FlightDeleteDialog();
        expect(await flightDeleteDialog.getDialogTitle()).to.eq('airTrafficApp.flight.delete.question');
        await flightDeleteDialog.clickOnConfirmButton();

        expect(await flightComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
