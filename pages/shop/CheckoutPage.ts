import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class CheckoutPage extends BasePage{
    readonly addressDetailsLabel: Locator;
    readonly deliveryAddressLabel: Locator;
    readonly billingAddressLabel: Locator;
    readonly deliveryAddressFirstLastName: Locator;
    readonly deliveryCompany: Locator;
    readonly deliveryStreetAddress: Locator;
    readonly deliverySecondaryAddress:Locator;
    readonly deliveryAddressState: Locator;
    readonly deliveryAddressCountry: Locator;
    readonly deliveryAddressPhone: Locator;
    readonly billingAddressFirstLastName: Locator;
    readonly billingCompany: Locator;
    readonly billingStreetAddress: Locator;
    readonly billingSecondaryAddress: Locator;
    readonly billingAddressState: Locator;
    readonly billingAddressCountry: Locator;
    readonly billingAddressPhone: Locator;
    constructor(page:Page){
        super(page);
        this.addressDetailsLabel = page.locator('.step-one h2');
        this.deliveryAddressLabel = page.locator('#address_delivery h3');
        this.billingAddressLabel = page.locator('#address_invoice h3');
        this.deliveryAddressFirstLastName = page.locator('#address_delivery .address_firstname');
        this.deliveryCompany = page.locator('#address_delivery .')

    }
}