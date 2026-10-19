import {Page, Locator} from '@playwright/test'
import { count } from 'node:console';
import { PlaceOrderDetails } from './PlaceOrderDetail';

export class PaymentInfo{

    private readonly page:Page;
    private readonly txtCountry:Locator;
    private readonly btnPlaceOrder:Locator;
    private readonly countrySection:Locator;

    constructor(page:Page){

        this.page=page;
        this.txtCountry=this.page.getByPlaceholder("Select Country");
        this.btnPlaceOrder=this.page.getByText("PLACE ORDER");
        this.countrySection=this.page.locator("section[class*='ta-results']");
    }

    async completeOrder(contry:string){

        await this.txtCountry.pressSequentially(contry,{delay:1000});
        const countryInput=await this.countrySection.locator('button');
        await this.page.locator(`//section[contains(@class,'ta-results')]//*[text()=' ${contry}']`).click();
        await this.btnPlaceOrder.click();
        return new PlaceOrderDetails(this.page);
    }
}