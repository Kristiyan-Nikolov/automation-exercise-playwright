import { test, expect} from "../../fixtures";
import { HeaderComponent } from "../../../pages/components/HeaderComponent";
import { CookieConsentComponents } from "../../../pages/components/CookieConsentComponent";
import { ProductPage } from "../../../pages/shop/ProductPage";
import { ProductDetailsPage } from "../../../pages/shop/ProductDetailsPage";
import { CartPage } from "../../../pages/shop/CartPage";


test.describe('Shop', ()=>{
    let product: ProductPage;
    let productDetails: ProductDetailsPage;
    let headerComponent: HeaderComponent;
    //let cookiePrompt: CookieConsentComponents;
    
    test.beforeEach(async ({page})=>{
        product = new ProductPage(page);
        productDetails = new ProductDetailsPage(page);
        headerComponent = new HeaderComponent(page);
        //cookiePrompt = new CookieConsentComponents(page);
        await headerComponent.open();
        await headerComponent.openProducts();
        //await cookiePrompt.acceptCookies();
        //await page.route(
        ///googleads\.g\.doubleclick\.net|pagead2\.googlesyndication\.com/,
        //route => route.abort()
    
        
    })
    test('Verify All Products and product detail page', async({page})=>{
        //await product.open();
        //console.log('Product cards:', await page.locator('.productinfo').count());
        await expect(page).toHaveURL(/\/products/);

        await product.openFirstProduct();

        await productDetails.verifyProductDetails();
        
    })
    test('Search product should return correct item', async({page})=>{
        await expect(page).toHaveURL(/\/products/);

        await product.searchForProduct('Winter Top');

        await expect(product.searchedProductsLabel).toBeVisible();

        await product.verifyProductName('Winter Top');
    })
  
})