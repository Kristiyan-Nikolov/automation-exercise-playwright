import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
    readonly homeLink: Locator;
    readonly productsLink: Locator;
    readonly cartLink: Locator;
    readonly signInLogin: Locator;
    readonly deleteLink: Locator;
    readonly logoutButton: Locator;
    constructor(private page: Page){
        this.homeLink = page.locator('a[href="/"]');
        this.productsLink = page.locator('a[href="/products"]');
        this.cartLink = page.locator('a[href="/view_cart"]');
        this.signInLogin = page.locator('a[href="/login"]');
        this.deleteLink = page.locator('a[href="/delete_account"]')
        this.logoutButton = page.locator('a[href="/logout"]');
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
    
}