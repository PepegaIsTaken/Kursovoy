/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AirportComponentsPage, AirportDeleteDialog, AirportUpdatePage } from './airport.page-object';

const expect = chai.expect;

describe('Airport e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let airportUpdatePage: AirportUpdatePage;
    let airportComponentsPage: AirportComponentsPage;
    let airportDeleteDialog: AirportDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Airports', async () => {
        await navBarPage.goToEntity('airport');
        airportComponentsPage = new AirportComponentsPage();
        await browser.wait(ec.visibilityOf(airportComponentsPage.title), 5000);
        expect(await airportComponentsPage.getTitle()).to.eq('airTrafficApp.airport.home.title');
    });

    it('should load create Airport page', async () => {
        await airportComponentsPage.clickOnCreateButton();
        airportUpdatePage = new AirportUpdatePage();
        expect(await airportUpdatePage.getPageTitle()).to.eq('airTrafficApp.airport.home.createOrEditLabel');
        await airportUpdatePage.cancel();
    });

    it('should create and save Airports', async () => {
        const nbButtonsBeforeCreate = await airportComponentsPage.countDeleteButtons();

        await airportComponentsPage.clickOnCreateButton();
        await promise.all([
            airportUpdatePage.setLatitudeInput('5'),
            airportUpdatePage.setLongitudeInput('5'),
            airportUpdatePage.setNameInput('name'),
            airportUpdatePage.airportLocationSelectLastOption()
        ]);
        expect(await airportUpdatePage.getLatitudeInput()).to.eq('5');
        expect(await airportUpdatePage.getLongitudeInput()).to.eq('5');
        expect(await airportUpdatePage.getNameInput()).to.eq('name');
        await airportUpdatePage.save();
        expect(await airportUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await airportComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Airport', async () => {
        const nbButtonsBeforeDelete = await airportComponentsPage.countDeleteButtons();
        await airportComponentsPage.clickOnLastDeleteButton();

        airportDeleteDialog = new AirportDeleteDialog();
        expect(await airportDeleteDialog.getDialogTitle()).to.eq('airTrafficApp.airport.delete.question');
        await airportDeleteDialog.clickOnConfirmButton();

        expect(await airportComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
