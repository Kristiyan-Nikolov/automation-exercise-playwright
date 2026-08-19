import { BasePage } from "../base/BasePage";
import {Page, Locator} from "@playwright/test";
export class ContactPage extends BasePage{
    readonly getInTouchLabel: Locator;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly fileLocationButton: Locator;
    readonly submitButton: Locator;
    readonly successLabel: Locator;
    constructor(page:Page){
        super(page);
        this.getInTouchLabel = page.getByRole('heading', {name: 'Get In Touch'});
        this.nameInput = page.locator('[data-qa="name"]');
        this.emailInput = page.locator('[data-qa="email"]');
        this.subjectInput = page.locator('[data-qa="subject"]');
        this.messageInput = page.locator('[data-qa="message"]');
        this.fileLocationButton = page.locator('[name="upload_file"]');
        this.submitButton = page.locator('[data-qa="submit-button"]');
        this.successLabel = page.locator('.status.alert.alert-success');
    }
    async fillContanctForm(name: string, email: string, subject: string, message: string, fileLocation: string){
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.subjectInput.fill(subject);
        await this.messageInput.fill(message);
        await this.fileLocationButton.setInputFiles(fileLocation);
        
    }
    async submit(): Promise<void> {
        this.page.once('dialog', async dialog => {
            await dialog.accept();
        });
        await this.submitButton.click();
}
    async open(): Promise<void> {
        await this.navigate('/contact_us');
    }

}