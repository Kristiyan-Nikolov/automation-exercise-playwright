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
    constructor(page: Page){
        super(page);
        this.homeLink = page.locator('a[href="/"]');
        this.productsLink = page.locator('a[href="/products"]');
        this.cartLink = page.locator('a[href="/view_cart"]');
        this.signInLogin = page.locator('a[href="/login"]');
        this.deleteLink = page.locator('a[href="/delete_account"]')
        this.logoutButton = page.locator('a[href="/logout"]');
        this.contactFormButton = page.locator('a[href="/contact_us"]');
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
    
    
}