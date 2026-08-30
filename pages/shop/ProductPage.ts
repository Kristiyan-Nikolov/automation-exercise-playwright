import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class ProductPage extends BasePage{
    readonly searchProduct: Locator;
    readonly allProductsLabel: Locator;
    readonly categoriesLinks: Locator;
    readonly brandLinks: Locator;
    
    //Learned a lot here. Instead of typing them one by one we have a more robust way to access them if they happen to change in the future.
    constructor(page:Page){
        super(page);
        this.allProductsLabel = page.getByRole('heading', {name:'All Products'});
        this.searchProduct = page.locator('[id="search_product"]');
        this.categoriesLinks = page.locator('.category-products a')
        this.brandLinks = page.locator('.brands-name h4 a');
        
       
    }
    //Boring approach to index my way out of trouble. If a product is added to the page my index will be in a rough spot if I want to target a specific product.
    //async openProduct(index: number){
    //    await this.viewProductButton.nth(index).click();
    //}
    
    //A more robust way to handle the top scenario. Selenium used xPath. This looks cleaner.
    async openProductByName(name:string){
        const product = this.page.locator('.productInfo').filter({hasText: name});
        await product.getByRole('link', {name:'ViewProduct'}).click();
    } 

    async selectCategory(category:string){
        await this.categoriesLinks.filter({hasText: category}).click();
    }

    async selectBrand(brandName:string){
        await this.brandLinks.filter({hasText:brandName}).click();
    }
    async openFirstProduct(){
        const productFirst = this.page.locator('.productInfo').first();
        await productFirst.getByRole('link', {name:'ViewProduct'}).click();
    }
}