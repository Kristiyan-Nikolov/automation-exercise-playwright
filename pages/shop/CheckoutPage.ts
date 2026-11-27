import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class CheckoutPage extends BasePage{
    readonly addressDetailsLabel: Locator;
    readonly deliveryAddressLabel: Locator;
    readonly billingAddressLabel: Locator;
    readonly deliveryAddressFirstLastName: Locator;
    readonly deliveryCompany: Locator;
    readonly deliveryStreetAddress: Locator;
    readonly deliverySecondaryAddress:Locator;
    readonly deliveryAddressStateCityZip: Locator;
    readonly deliveryAddressCountry: Locator;
    readonly deliveryAddressPhone: Locator;
    readonly billingAddressFirstLastName: Locator;
    readonly billingCompany: Locator;
    readonly billingStreetAddress: Locator;
    readonly billingSecondaryAddress: Locator;
    readonly billingAddressStateCityZip: Locator;
    readonly billingAddressCountry: Locator;
    readonly billingAddressPhone: Locator;
    readonly descriptionBox: Locator;
    readonly placeOrderBtn: Locator;
    constructor(page:Page){
        super(page);
        this.addressDetailsLabel = page.locator('.step-one h2');
        this.deliveryAddressLabel = page.locator('#address_delivery h3');
        this.billingAddressLabel = page.locator('#address_invoice h3');
        this.deliveryAddressFirstLastName = page.locator('#address_delivery .address_firstname');
        this.deliveryCompany = page.locator('#address_invoice li.address_address1.address_address2').nth(0);
        this.deliveryStreetAddress = page.locator('#address_invoice li.address_address1.address_address2').nth(1);
        this.deliverySecondaryAddress = page.locator('#address_invoice li.address_address1.address_address2').nth(2);
        this.deliveryAddressStateCityZip = page.locator('#address_delivery .address_state_name');
        this.deliveryAddressCountry = page.locator('#address_delivery .address_country_name');
        this.deliveryAddressPhone = page.locator('#address_delivery .address_phone');
        this.billingAddressFirstLastName = page.locator('#address_invoice .address_firstname');
        this.billingCompany = page.locator('#address_invoice .address_address1').nth(0);
        this.billingStreetAddress = page.locator('#address_invoice .address_address1').nth(1);
        this.billingSecondaryAddress = page.locator('#address_invoice .address_address1').nth(2);
        this.billingAddressStateCityZip = page.locator('#address_invoice .address_state_name');
        this.billingAddressCountry = page.locator('#address_invoice .address_country_name');
        this.billingAddressPhone = page.locator('#address_invoice .address_phone');
        this.descriptionBox = page.locator('[name="message"]');
        this.placeOrderBtn = page.locator('a[href="/payment"]');

    }
    async enterDescription(string: string){
        await this.descriptionBox.fill(string);
    }
    async placeOrder(){
        await this.placeOrderBtn.click();
    }
}