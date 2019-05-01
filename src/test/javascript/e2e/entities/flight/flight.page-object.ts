import { element, by, ElementFinder } from 'protractor';

export class FlightComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-flight div table .btn-danger'));
    title = element.all(by.css('jhi-flight div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class FlightUpdatePage {
    pageTitle = element(by.id('jhi-flight-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    numberInput = element(by.id('field_number'));
    passengersInput = element(by.id('field_passengers'));
    distanceInput = element(by.id('field_distance'));
    companyInput = element(by.id('field_company'));
    seatsInput = element(by.id('field_seats'));
    dateInput = element(by.id('field_date'));
    departureAirportSelect = element(by.id('field_departureAirport'));
    arrivalAirportSelect = element(by.id('field_arrivalAirport'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setNumberInput(number) {
        await this.numberInput.sendKeys(number);
    }

    async getNumberInput() {
        return this.numberInput.getAttribute('value');
    }

    async setPassengersInput(passengers) {
        await this.passengersInput.sendKeys(passengers);
    }

    async getPassengersInput() {
        return this.passengersInput.getAttribute('value');
    }

    async setDistanceInput(distance) {
        await this.distanceInput.sendKeys(distance);
    }

    async getDistanceInput() {
        return this.distanceInput.getAttribute('value');
    }

    async setCompanyInput(company) {
        await this.companyInput.sendKeys(company);
    }

    async getCompanyInput() {
        return this.companyInput.getAttribute('value');
    }

    async setSeatsInput(seats) {
        await this.seatsInput.sendKeys(seats);
    }

    async getSeatsInput() {
        return this.seatsInput.getAttribute('value');
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async departureAirportSelectLastOption() {
        await this.departureAirportSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async departureAirportSelectOption(option) {
        await this.departureAirportSelect.sendKeys(option);
    }

    getDepartureAirportSelect(): ElementFinder {
        return this.departureAirportSelect;
    }

    async getDepartureAirportSelectedOption() {
        return this.departureAirportSelect.element(by.css('option:checked')).getText();
    }

    async arrivalAirportSelectLastOption() {
        await this.arrivalAirportSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async arrivalAirportSelectOption(option) {
        await this.arrivalAirportSelect.sendKeys(option);
    }

    getArrivalAirportSelect(): ElementFinder {
        return this.arrivalAirportSelect;
    }

    async getArrivalAirportSelectedOption() {
        return this.arrivalAirportSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class FlightDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-flight-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-flight'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
