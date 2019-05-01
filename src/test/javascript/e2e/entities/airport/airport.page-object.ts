import { element, by, ElementFinder } from 'protractor';

export class AirportComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-airport div table .btn-danger'));
    title = element.all(by.css('jhi-airport div h2#page-heading span')).first();

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

export class AirportUpdatePage {
    pageTitle = element(by.id('jhi-airport-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    latitudeInput = element(by.id('field_latitude'));
    longitudeInput = element(by.id('field_longitude'));
    nameInput = element(by.id('field_name'));
    airportLocationSelect = element(by.id('field_airportLocation'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setLatitudeInput(latitude) {
        await this.latitudeInput.sendKeys(latitude);
    }

    async getLatitudeInput() {
        return this.latitudeInput.getAttribute('value');
    }

    async setLongitudeInput(longitude) {
        await this.longitudeInput.sendKeys(longitude);
    }

    async getLongitudeInput() {
        return this.longitudeInput.getAttribute('value');
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async airportLocationSelectLastOption() {
        await this.airportLocationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async airportLocationSelectOption(option) {
        await this.airportLocationSelect.sendKeys(option);
    }

    getAirportLocationSelect(): ElementFinder {
        return this.airportLocationSelect;
    }

    async getAirportLocationSelectedOption() {
        return this.airportLocationSelect.element(by.css('option:checked')).getText();
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

export class AirportDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-airport-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-airport'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
