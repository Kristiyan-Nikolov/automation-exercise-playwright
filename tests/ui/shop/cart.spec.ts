import { test, expect} from "../../fixtures";
import { HeaderComponent } from "../../../pages/components/HeaderComponent";
import { ProductPage } from "../../../pages/shop/ProductPage";
import { CartPage } from "../../../pages/shop/CartPage";
import { ProductDetailsPage } from "../../../pages/shop/ProductDetailsPage";
import { SignupPage } from "../../../pages/auth/SignupPage";
import { validUser } from "../../../test-data/SignupUsers";
import { generateUniqueEmail } from "../../../utils/dataGenerator";
import { AccountCreatedPage } from "../../../pages/auth/AccountCreatedPage";

test.describe('Cart Page', ()=>{
    let headerComponent: HeaderComponent;
    let product: ProductPage;
    let cartPage: CartPage;
    let productDetails: ProductDetailsPage;
    let signup: SignupPage;
    const user = {
            ...validUser,
            email: generateUniqueEmail()
        };
    let accountCreated: AccountCreatedPage;
    test.beforeEach(async({page})=>{
        headerComponent = new HeaderComponent(page);
        product = new ProductPage(page);
        cartPage = new CartPage(page);
        productDetails = new ProductDetailsPage(page);
        signup = new SignupPage(page);
        accountCreated = new AccountCreatedPage(page);
        await headerComponent.open();
        await headerComponent.openProducts();
        
    })
    test('Add products in cart and verify name and price', async()=>{
        const productFirst = await product.readProductDetails(0);
        await product.addProductToCart(0);

        await headerComponent.continueShopping();

        const productSecond =  await product.readProductDetails(1);
        await product.addProductToCart(1);

        await headerComponent.viewCartPromptRedirection();

        const cartProductFirst = await cartPage.readProductDetails(0);
        const cartProductSecond = await cartPage.readProductDetails(1);

        expect(cartProductFirst.name).toBe(productFirst.name);
        expect(cartProductFirst.price).toBe(productFirst.price);


        expect(cartProductSecond.name).toBe(productSecond.name);
        expect(cartProductSecond.price).toBe(productSecond.price);

    })
      test('Verify product quantity in cart', async ()=>{
        await product.openFirstProduct();
        await productDetails.verifyProductDetails();

        await productDetails.setQuantity('4');
        await productDetails.addToCart();
        await headerComponent.viewCartPromptRedirection();
        
        const cartProductDetails = await cartPage.readProductDetails(0);

        expect(cartProductDetails.quantity).toBe(4);

    })
    test('Place order and register while checking out', async ()=>{
        await product.openFirstProduct();
        await productDetails.addToCart();

        await cartPage.verifyCartPageVisibility();
        await cartPage.proceedToCheckout();

        await headerComponent.loginRegisterRedirection();

        await signup.registerUser(user);
        await expect(accountCreated.accountCreatedText).toBeVisible();
        await accountCreated.clickContinue();
        expect (headerComponent.logoutButton).toBeVisible();

        await headerComponent.openCart();

        await cartPage.proceedToCheckout();
    })
})