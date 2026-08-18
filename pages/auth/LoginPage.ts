import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
export class LoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordLoginInput: Locator;
    readonly loginButton: Locator;
    readonly loggedInLabel: Locator;
    readonly signupNameInput: Locator;
    readonly signupEmailInput: Locator;
    readonly signupButton: Locator;
    readonly signupLabel: Locator;
    readonly incorrectLoginMessage: Locator;
    readonly emailAlreadyExistsMessage: Locator;
    constructor(page: Page){
        super(page);
        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordLoginInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');
        this.loggedInLabel = page.locator('text=Logged in as');
        this.signupNameInput = page.locator('[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');
        this.signupLabel = page.locator('text="New User Signup!"');
        this.incorrectLoginMessage = page.locator('text="Your email or password is incorrect!"')
        this.emailAlreadyExistsMessage = page.locator('text="Email Address already exist!"')
        
    }
    async open(){
        await this.navigate('/login');
    }
    async login(email: string, password: string){
        await this.emailInput.fill(email);
        await this.passwordLoginInput.fill(password);
        await this.loginButton.click();
    }
    async signupRedirect(name: string, email: string)
    {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }
    
}