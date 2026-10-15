import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class HeaderComponent extends BasePage {
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly signInLogin: Locator;
    readonly deleteLink: Locator;
    readonly logoutButton: Locator;
    readonly contactFormButton: Locator;
    readonly subscriptionLabel: Locator;
    readonly subscriptionEmailInputField: Locator;
    readonly subscriptionButton: Locator;
    readonly subscriptionSuccessLabel: Locator;
    constructor(page: Page){
        super(page);
        this.homeLink = page.locator('a[href="/"]');
        this.productsLink = page.locator('a[href="/products"]');
        this.cartLink = page.locator('header a[href="/view_cart"]');
        this.signInLogin = page.locator('a[href="/login"]');
        this.deleteLink = page.locator('a[href="/delete_account"]')
        this.logoutButton = page.locator('a[href="/logout"]');
        this.contactFormButton = page.locator('a[href="/contact_us"]');
        this.subscriptionLabel = page.locator('.single-widget h2');
        this.subscriptionEmailInputField = page.locator('[id="susbscribe_email"]');
        this.subscriptionButton = page.locator('[id="subscribe"]');
        this.subscriptionSuccessLabel = page.locator('.alert-success').filter({hasText:'You have been successfully subscribed!'});
    }
    async openLoginPage(){
        await this.signInLogin.click();
    }
    async openCart(){
        await this.cartLink.click();
    }
    async openProducts(){
        await this.productsLink.click();
    }
    async deleteAccountRedirection()
    {
        await this.deleteLink.click();
    }
    async logOut()
    {
        await this.logoutButton.click();
    }
    async openContactForm()
    {
        await this.contactFormButton.click();
    }
    async open(){
        await this.navigate('/');
    }
    async subscribeEmail(email: string){
        await this.subscriptionEmailInputField.fill(email);
        await this.subscriptionButton.click();
    }
    
}