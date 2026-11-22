import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { CreditCard } from "../../types/creditCard.types";

export class PaymentPage extends BasePage{
    readonly nameOnCard: Locator;
    readonly cardNumber: Locator;
    readonly cvcNumber: Locator;
    readonly expirationMonth: Locator;
    readonly expirationYear: Locator;
    readonly payBtn: Locator;
    constructor(page:Page){
        super(page);
        this.nameOnCard = page.locator('[data-qa="name-on-card"]');
        this.cardNumber = page.locator('[data-qa="card-number"]');
        this.cvcNumber = page.locator('[data-qa="cvc"]');
        this.expirationMonth = page.locator('[data-qa="expiry_month"]');
        this.expirationYear = page.locator('[data-qa="expiry-year"]');
        this.payBtn = page.locator('#submit');
    }
    async fillCardPaymentInfo(creditCard: CreditCard){
        await this.nameOnCard.fill(creditCard.nameOnCard);
        await this.cardNumber.fill(creditCard.cardNumber);
        await this.cvcNumber.fill(creditCard.cvcNumber);
        await this.expirationMonth.fill(creditCard.expirationMonth);
        await this.expirationYear.fill(creditCard.expirationYear);
    }
    async payAndConfirmOrder(){
        await this.payBtn.click();
    }
}