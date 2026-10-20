import { test, expect } from '@playwright/test';
import { CookieConsentComponents } from '../../../pages/components/CookieConsentComponent';
import { validUser, existingUser } from '../../../test-data/SignupUsers'
import { SignupPage } from '../../../pages/auth/SignupPage';
import { LoginPage } from '../../../pages/auth/LoginPage';
import { AccountCreatedPage } from '../../../pages/auth/AccountCreatedPage';
import { generateUniqueEmail, generateUniqueUsername } from '../../../utils/dataGenerator';
import { HeaderComponent } from '../../../pages/components/HeaderComponent';
import { DeleteAccountPage } from '../../../pages/auth/DeleteAccountPage';

test.describe('Registration', ()=>{
    test('User can register and delete account with valid data', async ({page})=>{
        const loginPage = new LoginPage(page);
        const signupPage = new SignupPage(page);
        const header = new HeaderComponent(page);
        const accountCreatedPage = new AccountCreatedPage(page);
        const deleteAccountPage = new DeleteAccountPage(page);
        const cookiePrompt = new CookieConsentComponents(page);
        const user = {
            ...validUser,
            email: generateUniqueEmail()
        };
        const username = generateUniqueUsername();
        await loginPage.open();
        await cookiePrompt.acceptCookies();

        await expect(loginPage.signupLabel).toBeVisible();

        await loginPage.signupRedirect(username, user.email);
        await expect(signupPage.accountInformationLabel).toBeVisible();

        await signupPage.registerUser(user);
        await expect(accountCreatedPage.accountCreatedText).toBeVisible();
        await accountCreatedPage.clickContinue();
        await header.deleteAccountRedirection();

        await expect(deleteAccountPage.deleteAccountText).toBeVisible();
        await deleteAccountPage.clickContinue();
    })
    test('User cannot register with an existing email', async({page})=>{
        const loginPage = new LoginPage(page);
        const cookiePrompt = new CookieConsentComponents(page);
        const user = existingUser;
        const username = generateUniqueUsername();

        await loginPage.open();
        await cookiePrompt.acceptCookies();

        await expect(loginPage.signupLabel).toBeVisible();
        await loginPage.signupRedirect(username, user.email);

        await expect(loginPage.emailAlreadyExistsMessage).toBeVisible();
    })
});