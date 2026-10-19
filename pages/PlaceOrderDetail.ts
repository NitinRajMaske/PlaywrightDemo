import{Page, Locator} from '@playwright/test'

export class PlaceOrderDetails{

    private readonly page:Page;
    private readonly orderSuccessLabel:Locator;

    constructor(page:Page){
        this.page=page;
        this.orderSuccessLabel=this.page.locator("//table[@id='htmlData']//tr//table//h1");
    }

    async verifyOrder(){
        return await this.orderSuccessLabel.textContent();
    }
}
