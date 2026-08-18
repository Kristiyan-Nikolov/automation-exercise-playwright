import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
export class DeleteAccountPage extends BasePage{
    readonly deleteAccountText: Locator;
    readonly continueButton: Locator;
    constructor(page: Page){
        super(page);
        this.deleteAccountText = page.locator('[data-qa="account-deleted"]');
        this.continueButton = page.locator('[data-qa="continue-button"]');
    }
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }
}
