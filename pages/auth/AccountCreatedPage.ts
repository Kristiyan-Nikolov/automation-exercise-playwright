import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
export class AccountCreatedPage extends BasePage
{
    readonly continueButton : Locator;
    readonly accountCreatedText : Locator;
    
    constructor(page: Page){
        super(page);
        this.continueButton = page.locator('[data-qa="continue-button"]');
        this.accountCreatedText = page.locator('[data-qa="account-created"]');

    }
    async clickContinue(){
        await this.continueButton.click();
    }
}