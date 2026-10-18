import { test, expect} from "../../fixtures";
import { HeaderComponent } from "../../../pages/components/HeaderComponent";
import { ProductPage } from "../../../pages/shop/ProductPage";
import { CartPage } from "../../../pages/shop/CartPage";

test.describe('Cart Page', ()=>{
    let headerComponent: HeaderComponent;
    let productPage: ProductPage;
    let cartPage: CartPage;
    test.beforeEach(async({page})=>{
        headerComponent = new HeaderComponent(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        await headerComponent.open();
        await headerComponent.openProducts();
    })
    test('Add products in cart and verify name and price', async()=>{
        const productFirst = await productPage.readProductDetails(0);
        await productPage.addProductToCart(0);

        await productPage.continueShopping();

        const productSecond =  await productPage.readProductDetails(1);
        await productPage.addProductToCart(1);

        await productPage.viewCartPromptRedirection();

        const cartProductFirst = await cartPage.readProductDetails(0);
        const cartProductSecond = await cartPage.readProductDetails(1);

        expect(productFirst.name).toBe(cartProductFirst.name);
        expect(productFirst.price).toBe(cartProductFirst.price);

        expect(productSecond.name).toBe(cartProductSecond.name);
        expect(productSecond.price).toBe(cartProductSecond.price);

    })
})