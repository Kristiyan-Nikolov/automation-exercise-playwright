import { test, expect} from "../../../fixtures/fixtures";
import { HeaderComponent } from "../../../pages/components/HeaderComponent";
import { ProductPage } from "../../../pages/shop/ProductPage";
import { CartPage } from "../../../pages/shop/CartPage";
import { ProductDetailsPage } from "../../../pages/shop/ProductDetailsPage";
import { SignupPage } from "../../../pages/auth/SignupPage";
import { validUser } from "../../../test-data/SignupUsers";
import { generateUniqueEmail, generateUniqueUsername } from "../../../utils/dataGenerator";
import { AccountCreatedPage } from "../../../pages/auth/AccountCreatedPage";
import { CheckoutPage } from "../../../pages/shop/CheckoutPage";
import { LoginPage } from "../../../pages/auth/LoginPage";
import { ValidCreditCard } from "../../../test-data/CreditCard";
import { readFileSync } from 'node:fs';
import { PaymentPage } from '../../../pages/shop/PaymentPage';
import { DeleteAccountPage } from "../../../pages/auth/DeleteAccountPage";
import { validLoginUser } from "../../../test-data/LoginUsers";


test.describe('Cart Page', ()=>{
    let deletedAccount : DeleteAccountPage;
    let payment: PaymentPage;
    let headerComponent: HeaderComponent;
    let product: ProductPage;
    let cartPage: CartPage;
    let productDetails: ProductDetailsPage;
    let signup: SignupPage;
    let checkout: CheckoutPage;
    let login: LoginPage;
    const username = generateUniqueUsername();
    const user = {
            ...validUser,
            email: generateUniqueEmail()
        };
    const checkoutDescription = readFileSync(
        'test-data/checkoutDescription.txt',
        'utf8',
    ).trim();

    let accountCreated: AccountCreatedPage;
    test.beforeEach(async({page})=>{
        deletedAccount = new DeleteAccountPage(page);
        payment = new PaymentPage(page);
        headerComponent = new HeaderComponent(page);
        product = new ProductPage(page);
        cartPage = new CartPage(page);
        productDetails = new ProductDetailsPage(page);
        signup = new SignupPage(page);
        accountCreated = new AccountCreatedPage(page);
        checkout = new CheckoutPage(page);
        login = new LoginPage(page);
        
        await headerComponent.open();
        
        
    })
    test('Add products in cart and verify name and price', async()=>{
        await headerComponent.openProducts();
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
        await headerComponent.openProducts();
        await product.openFirstProduct();
        await productDetails.verifyProductDetails();

        await productDetails.setQuantity('4');
        await productDetails.addToCart();
        await headerComponent.viewCartPromptRedirection();
        
        const cartProductDetails = await cartPage.readProductDetails(0);

        expect(cartProductDetails.quantity).toBe(4);

    })
    test('Place order and register while checking out', async ()=>{
        await headerComponent.openProducts();
        await product.addProductToCart(0);
        await headerComponent.viewCartPromptRedirection();

        await cartPage.proceedToCheckout();

        await headerComponent.loginRegisterRedirection();

        await login.signupRedirect(username, user.email);
        await signup.registerUser(user);
        await expect(accountCreated.accountCreatedText).toBeVisible();
        await accountCreated.clickContinue();
        await expect (headerComponent.logoutButton).toBeVisible();

        await headerComponent.openCart();

        await cartPage.proceedToCheckout();
        
        const expectedName = `${user.title}. ${user.firstName} ${user.lastName}`;
        await expect(checkout.deliveryAddressFirstLastName).toHaveText(expectedName);
        await expect(checkout.billingAddressFirstLastName).toHaveText(expectedName);

        await expect(checkout.deliveryCompany).toHaveText(user.company);
        await expect(checkout.billingCompany).toHaveText(user.company);
        
        await expect(checkout.deliveryStreetAddress).toHaveText(user.address);
        await expect(checkout.billingStreetAddress).toHaveText(user.address);

        const expectedStateCityAndZipCode = `${user.city} ${user.state} ${user.zipcode}`;
        await expect(checkout.deliveryAddressStateCityZip).toHaveText(expectedStateCityAndZipCode);
        await expect(checkout.billingAddressStateCityZip).toHaveText(expectedStateCityAndZipCode);

        await expect(checkout.deliveryAddressCountry).toHaveText(user.country);
        await expect(checkout.billingAddressCountry).toHaveText(user.country);

        await expect(checkout.deliveryAddressPhone).toHaveText(user.mobilePhone);
        await expect(checkout.billingAddressPhone).toHaveText(user.mobilePhone);
        
        await checkout.enterDescription(checkoutDescription);
        await checkout.placeOrder();

        await payment.fillCardPaymentInfo(ValidCreditCard);
        await payment.payAndConfirmOrder();

        await expect(payment.orderPlacedLabel).toBeVisible();
        await headerComponent.deleteAccountRedirection();

        await expect(deletedAccount.deleteAccountText).toBeVisible();
        await deletedAccount.clickContinue();

    })
    test('Place order and register before checking out', async()=>{
        await headerComponent.openLoginPage();

        await login.signupRedirect(username, user.email);
        await signup.registerUser(user);
        await expect(accountCreated.accountCreatedText).toBeVisible();
        await accountCreated.clickContinue();
        await expect (headerComponent.logoutButton).toBeVisible();

        await headerComponent.openProducts();
        await product.addProductToCart(0);
        await headerComponent.viewCartPromptRedirection();

        await cartPage.proceedToCheckout();

        const expectedName = `${user.title}. ${user.firstName} ${user.lastName}`;
        await expect(checkout.deliveryAddressFirstLastName).toHaveText(expectedName);
        await expect(checkout.billingAddressFirstLastName).toHaveText(expectedName);

        await expect(checkout.deliveryCompany).toHaveText(user.company);
        await expect(checkout.billingCompany).toHaveText(user.company);
        
        await expect(checkout.deliveryStreetAddress).toHaveText(user.address);
        await expect(checkout.billingStreetAddress).toHaveText(user.address);

        const expectedStateCityAndZipCode = `${user.city} ${user.state} ${user.zipcode}`;
        await expect(checkout.deliveryAddressStateCityZip).toHaveText(expectedStateCityAndZipCode);
        await expect(checkout.billingAddressStateCityZip).toHaveText(expectedStateCityAndZipCode);

        await expect(checkout.deliveryAddressCountry).toHaveText(user.country);
        await expect(checkout.billingAddressCountry).toHaveText(user.country);

        await expect(checkout.deliveryAddressPhone).toHaveText(user.mobilePhone);
        await expect(checkout.billingAddressPhone).toHaveText(user.mobilePhone);

        await checkout.enterDescription(checkoutDescription);
        await checkout.placeOrder();

        await payment.fillCardPaymentInfo(ValidCreditCard);
        await payment.payAndConfirmOrder();

        await expect(payment.orderPlacedLabel).toBeVisible();
        await headerComponent.deleteAccountRedirection();

        await expect(deletedAccount.deleteAccountText).toBeVisible();
        await deletedAccount.clickContinue();
    })
    test('Place order and login before checking out', async()=>{
        await headerComponent.openLoginPage();
        await login.login(validLoginUser.email, validLoginUser.password);
        await expect (headerComponent.logoutButton).toBeVisible();

        await headerComponent.openProducts();
        await product.addProductToCart(0);
        await headerComponent.viewCartPromptRedirection();

        await cartPage.proceedToCheckout();

        const expectedName = `${user.title}. ${user.firstName} ${user.lastName}`;
        await expect(checkout.deliveryAddressFirstLastName).toHaveText(expectedName);
        await expect(checkout.billingAddressFirstLastName).toHaveText(expectedName);

        await expect(checkout.deliveryCompany).toHaveText(user.company);
        await expect(checkout.billingCompany).toHaveText(user.company);
        
        await expect(checkout.deliveryStreetAddress).toHaveText(user.address);
        await expect(checkout.billingStreetAddress).toHaveText(user.address);

        const expectedStateCityAndZipCode = `${user.city} ${user.state} ${user.zipcode}`;
        await expect(checkout.deliveryAddressStateCityZip).toHaveText(expectedStateCityAndZipCode);
        await expect(checkout.billingAddressStateCityZip).toHaveText(expectedStateCityAndZipCode);

        await expect(checkout.deliveryAddressCountry).toHaveText(user.country);
        await expect(checkout.billingAddressCountry).toHaveText(user.country);

        await expect(checkout.deliveryAddressPhone).toHaveText(user.mobilePhone);
        await expect(checkout.billingAddressPhone).toHaveText(user.mobilePhone);

        await checkout.enterDescription(checkoutDescription);
        await checkout.placeOrder();

        await payment.fillCardPaymentInfo(ValidCreditCard);
        await payment.payAndConfirmOrder();

        await expect(payment.orderPlacedLabel).toBeVisible();
    })
    
})