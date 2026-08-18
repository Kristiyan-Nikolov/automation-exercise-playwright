import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/auth/LoginPage';
import { CookieConsentComponents } from '../../../pages/components/CookieConsentComponent';
import { LoginUser } from '../../../types/loginUser.types';
import { invalidLoginUser, validLoginUser } from '../../../test-data/LoginUsers';
import { validUser } from '../../../test-data/SignupUsers';
import { HeaderComponent } from '../../../pages/components/HeaderComponent';

test.describe('Login', ()=>{
  let loginPage: LoginPage;
  let cookiePrompt: CookieConsentComponents;
  let headerComponent: HeaderComponent;
    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page);
        cookiePrompt = new CookieConsentComponents(page);
        headerComponent = new HeaderComponent(page);
        await loginPage.open();
        await cookiePrompt.acceptCookies();
    });
    test('User can login with valid credentials', async ({ page }) => {

      await loginPage.login(validLoginUser.email, validLoginUser.password);

      await expect(loginPage.loggedInLabel).toBeVisible();
    });

    test('User cannot login with invalid credentials', async ({ page })=>{

      await loginPage.login(invalidLoginUser.email, invalidLoginUser.password);

      await expect(loginPage.incorrectLoginMessage).toBeVisible();
    });
    test('User can login and logout with valid credentials', async ({page})=>{
      await loginPage.login(validLoginUser.email, validLoginUser.password);

      await expect(loginPage.loggedInLabel).toBeVisible();

      await headerComponent.logOut();

      await expect(page).toHaveURL(/login/);
      await expect(headerComponent.signInLogin).toBeVisible();
    });
});
