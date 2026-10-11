import { test, expect} from "@playwright/test";
import { HeaderComponent } from "../../../pages/components/HeaderComponent";
import { CookieConsentComponents } from "../../../pages/components/CookieConsentComponent";
import { ProductPage } from "../../../pages/shop/ProductPage";
import { ProductDetailsPage } from "../../../pages/shop/ProductDetailsPage";

test.describe('Shop', ()=>{
    let product: ProductPage;
    let productDetails: ProductDetailsPage;
    let headerComponent: HeaderComponent;
    let cookiePrompt: CookieConsentComponents;
    test.beforeEach(async ({page})=>{
        product = new ProductPage(page);
        productDetails = new ProductDetailsPage(page);
        headerComponent = new HeaderComponent(page);
        cookiePrompt = new CookieConsentComponents(page);
        await headerComponent.open();
        await cookiePrompt.acceptCookies();
        await headerComponent.openContactForm();
    })
    test('Verify All Products and product detail page', async({page})=>{
        await product.open();
        await product.openFirstProduct();
        expect(productDetails.productNameLabel).toBeVisible();
        
    })
})