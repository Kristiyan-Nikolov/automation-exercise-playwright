import {test, expect} from "@playwright/test";
import { HeaderComponent } from "../../../pages/components/HeaderComponent";
import { CookieConsentComponents } from "../../../pages/components/CookieConsentComponent";
import { ContactPage } from "../../../pages/contact/ContactPage";
import { validContactForm } from "../../../test-data/ContactForm";
test.describe('Contact Form', ()=>{
    let contactPage: ContactPage;
    let headerComponent: HeaderComponent;
    let cookiePrompt: CookieConsentComponents;
    test.beforeEach(async ({page})=>{
        contactPage = new ContactPage(page);
        headerComponent = new HeaderComponent(page);
        cookiePrompt = new CookieConsentComponents(page);
        await headerComponent.open();
        await cookiePrompt.acceptCookies();
        await headerComponent.openContactForm();
    })
    test('Fill contact form with valid data', async()=>{
        await expect(contactPage.getInTouchLabel).toBeVisible();
        
        await contactPage.fillContanctForm(validContactForm.name, validContactForm.email, validContactForm.subject, validContactForm.message, validContactForm.filePath);
        
        await contactPage.submit();
        await expect(contactPage.successLabel).toBeVisible();
    })

})