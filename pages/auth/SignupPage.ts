import {Page, Locator} from '@playwright/test'
import { BasePage } from '../base/BasePage'
import {User} from '../../types/user.types'

export class SignupPage extends BasePage {
    readonly mrRadioButton: Locator;
    readonly mrsRadioButton: Locator;
    readonly passwordInput: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly countryDropdown: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipCodeInput: Locator;
    readonly mobilePhoneInput: Locator;
    readonly createAccountButton: Locator;
    readonly newsletterCheckin: Locator;
    readonly specialOffersCheckin: Locator;
    readonly birthDaySelect: Locator;
    readonly birthMonthSelect: Locator;
    readonly birthYearSelect: Locator;
    readonly accountInformationLabel: Locator;
    constructor(page: Page){
        super(page);
        this.mrRadioButton =  page.locator('[id="id_gender1"]');
        this.mrsRadioButton = page.locator('[id="id_gender2"]');
        this.passwordInput = page.locator('[data-qa="password"]');
        this.firstNameInput = page.locator('[data-qa="first_name"]');
        this.lastNameInput = page.locator('[data-qa="last_name"]');
        this.companyInput = page.locator('[data-qa="company"]');
        this.addressInput = page.locator('[data-qa="address"]');
        this.countryDropdown = page.locator('[data-qa="country"]');
        this.cityInput = page.locator('[data-qa="city"]');
        this.stateInput = page.locator('[data-qa="state"]');
        this.zipCodeInput = page.locator('[data-qa="zipcode"]');
        this.mobilePhoneInput = page.locator('[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('[data-qa="create-account"]');
        this.newsletterCheckin = page.locator('[id="newsletter"]');
        this.specialOffersCheckin = page.locator('[id="optin"]');
        this.birthDaySelect = page.locator('[data-qa="days"]');
        this.birthMonthSelect = page.locator('[data-qa="months"]');
        this.birthYearSelect = page.locator('[data-qa="years"]');
        this.accountInformationLabel = page.getByText('Enter Account Information');
    }
    async registerUser(user: User): Promise<void> {
        if (user.title === "Mr"){
            await this.mrRadioButton.check();
        } else {
            await this.mrsRadioButton.check()
        }
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.passwordInput.fill(user.password);
        await this.birthDaySelect.selectOption(user.birthDay);
        await this.birthMonthSelect.selectOption(user.birthMonth);
        await this.birthYearSelect.selectOption(user.birthYear);
        await this.companyInput.fill(user.company);
        await this.addressInput.fill(user.address);
        await this.countryDropdown.selectOption(user.country);
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipCodeInput.fill(user.zipcode);
        await this.mobilePhoneInput.fill(user.mobilePhone);
        await this.newsletterCheckin.check();
        await this.specialOffersCheckin.check();
        await this.createAccountButton.click();
    }
}