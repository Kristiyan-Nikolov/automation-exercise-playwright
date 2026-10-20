import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class ProductPage extends BasePage{
    readonly searchProductInputField: Locator;
    readonly allProductsLabel: Locator;
    readonly categoriesLinks: Locator;
    readonly brandLinks: Locator;
    readonly searchedProductsLabel: Locator;
    readonly productNameLabel: Locator;
    readonly searchButton: Locator;
    
    
    
    //Learned a lot here. Instead of typing them one by one we have a more robust way to access them if they happen to change in the future.
    constructor(page:Page){
        super(page);
        this.allProductsLabel = page.getByRole('heading', {name:'All Products'});
        this.searchProductInputField = page.locator('[id="search_product"]');
        this.categoriesLinks = page.locator('.category-products a')
        this.brandLinks = page.locator('.brands-name h4 a');
        this.searchedProductsLabel = page.locator('.productinfo h2');
        this.productNameLabel = page.locator('.productinfo p');
        this.searchButton = page.locator('[id="submit_search"]');
       
        
        
        
       
    }
    //Boring approach to index my way out of trouble. If a product is added to the page my index will be in a rough spot if I want to target a specific product.
    //async openProduct(index: number){
    //    await this.viewProductButton.nth(index).click();
    //}
    
    //A more robust way to handle the top scenario. Selenium used xPath. This looks cleaner.
    //Edit: Why did I even create this??
    async openProductByName(name:string){
        const product = this.page.locator('.productinfo').filter({hasText: name});
        await product.getByRole('link', {name:'View Product'}).click();
    } 

    async selectCategory(category:string){
        await this.categoriesLinks.filter({hasText: category}).click();
    }

    async selectBrand(brandName:string){
        await this.brandLinks.filter({hasText:brandName}).click();
    }
    async openFirstProduct(){
        const productFirst = this.page.locator('.product-image-wrapper').first();
        await productFirst.getByRole('link', {name:'View Product'}).click();
        
    }
    //async open(): Promise<void> {
       // await this.navigate('');
    //}
    async searchForProduct(productName: string) {
        await this.searchProductInputField.fill(productName);
        await this.searchButton.click();
    }
    async verifyProductName(productName: string){
        await expect(this.productNameLabel).toHaveText(productName);
    }
    async addProductToCart(cardNumber: number){
        const productCard = this.page.locator('.product-image-wrapper').nth(cardNumber);
        await productCard.hover();
        await productCard.locator('a.add-to-cart:visible').first().click();
    }
   
    async readProductDetails(cardNumber: number){
        const productCard = this.page.locator('.product-image-wrapper').nth(cardNumber);
        const name = await productCard.locator('.productinfo p').innerText();
        const priceText = await productCard.locator('.productinfo h2').innerText();


        return{
            name,
            //cast priceText to be a number and remove the Rs. part
            price: Number(priceText.replace('Rs. ',''))
        };
    }
}