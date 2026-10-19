import {Page, Locator} from '@playwright/test'
import { PaymentInfo } from './PaymentInfoPage';

export class CartDetails{

    private readonly page:Page;
    private readonly productDetails:Locator;

    constructor(page:Page){

        this.page=page;
        this.productDetails=this.page.locator("div[class='infoWrap']");
    }

    async verifyProduct(){
        const prodName=await this.productDetails.locator('h3');
        return prodName;
    }

    async clickBuyNowButton(){
        await this.productDetails.getByRole('button',{name:'Buy Now'}).click();
        return new PaymentInfo(this.page);
    }
}