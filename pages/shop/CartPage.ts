import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class CartPage extends BasePage{
    readonly proceedToCheckoutBtn: Locator;
    readonly cartRows: Locator;
    constructor(page:Page){
        super(page);
        this.proceedToCheckoutBtn = page.locator('.check_out');
        this.cartRows = page.locator('#cart_info_table tbody tr');
    }
    async readProductDetails(cardIndex: number){
        const nthRow = this.cartRows.nth(cardIndex);
        const name = await nthRow.locator('.cart_description a').innerText();
        const priceText = await nthRow.locator('.cart_price p').innerText();
        const quantityText = await nthRow.locator('.cart_quantity button').innerText();
        const totalText = await nthRow.locator('.cart_total p').innerText();

        return{
            name,
            price: Number(priceText.replace('Rs. ','')),
            quantity: Number(quantityText),
            total: Number(totalText.replace('Rs. ',''))
        };
    }
         
}