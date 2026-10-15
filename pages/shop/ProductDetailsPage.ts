import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class ProductDetailsPage extends BasePage{
    readonly productNameLabel: Locator;
    readonly categoryLabel: Locator;
    readonly priceLabel: Locator;
    readonly availabilityLabel: Locator;
    readonly conditionLabel: Locator;
    readonly brandLabeL: Locator;
    constructor(page:Page){
        super(page);
        this.productNameLabel = page.locator('.product-information h2');
        this.categoryLabel = page.locator('.product-information p').filter({ hasText: 'Category:'});
        this.priceLabel = page.locator('.product-information span').getByText(/^Rs\.\s*\d+$/);
        this.availabilityLabel = page.locator('.product-information b').filter({hasText:'Availability:'});
        this.conditionLabel = page.locator('.product-information b').filter({hasText: 'Condition:'});
        this.brandLabeL = page.locator('.product-information b').filter({hasText: 'Brand:'});
    }
    async verifyProductDetails(){
        await expect(this.productNameLabel).toBeVisible();
        await expect(this.categoryLabel).toBeVisible();
        await expect(this.brandLabeL).toBeVisible();
        await expect(this.availabilityLabel).toBeVisible();
        await expect(this.conditionLabel).toBeVisible();
        await expect(this.priceLabel).toBeVisible();
    }
}