import{Page, Locator} from '@playwright/test'
import { CartDetails } from './CartDetailsPage';

export class DashboardPage{

    private readonly page:Page;
    private readonly header:Locator
    private readonly productSection:Locator;
    private readonly btnCart:Locator;
    readonly toastMsg:Locator;

    constructor(page:Page){
        this.page=page;
        this.productSection=this.page.locator("//section[@id='products']//div[@class='row']");
        this.header=this.page.locator("ul[_ngcontent-olq-c33]").filter({visible:true});
        this.btnCart=this.page.locator("button[routerlink='/dashboard/cart']");
        this.toastMsg=this.page.locator('#toast-container');
    }

    public get productSectionDetail():Locator{
        return this.productSection;
    }

    async addProductToCart(productName:string){

        const allProducts=await this.productSection.locator("div[class='card']");
        const productDetails=await allProducts.filter({hasText:productName})
        let currentCartCount=await this.cartCount();
        console.log("Current Cart Count = ",currentCartCount);
        await productDetails.getByRole('button',{name:'Add To Cart'}).click();
        let cartCountAfterAddingProduct=await this.cartCount();
        console.log("Cart Count After Adding Product = ",cartCountAfterAddingProduct);
        //await this.page.waitForTimeout(3000);
    }

    async clickCartButton(){

        await this.btnCart.click();
        return new CartDetails(this.page);
    }

    async cartCount(){
        const currentCartCount=await this.btnCart.locator('label').count();   
        if(currentCartCount>0){
            return await this.btnCart.locator('label').textContent();
        }     
        
        return "zero"
    }

}