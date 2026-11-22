import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class OrderPlace extends BasePage{

    readonly orderPlacedLabel: Locator;
    readonly downloadInvoiceBtn: Locator;
    readonly continueBtn: Locator;
    
    constructor(page:Page){
        super(page);
        this.orderPlacedLabel = page.locator('[data-qa="order-placed"]');
        this.downloadInvoiceBtn = page.locator('.check_out');
        this.continueBtn = page.locator('[data-qa="continue-button"]');
    }
    async downloadInvoice(){
        await this.downloadInvoiceBtn.click();
    }
    async continue(){
        await this.continueBtn.click();
    }
}