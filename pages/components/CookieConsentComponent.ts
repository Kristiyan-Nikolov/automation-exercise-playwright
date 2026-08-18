import {Page, Locator} from '@playwright/test'
//import { BasePage } from '../base/BasePage'

export class CookieConsentComponents {
    readonly consent: Locator;
    constructor(private page: Page){
        this.consent = page.locator('button.fc-cta-consent');
    }
    async acceptCookies(): Promise<void> {
        try {
            await this.consent.waitFor({
                state: 'visible',
                timeout: 5000
            });

            await this.consent.click();
        } catch {
            console.log('Cookie banner not displayed.');
        }
    }

}