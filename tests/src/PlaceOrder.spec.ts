import {test, expect} from '@playwright/test'
import { SignInPage } from '../../pages/SignInPage'
import { DashboardPage } from '../../pages/DashboardPage'
import { PlaceOrderDetails } from '../../pages/PlaceOrderDetail'
import { CartDetails } from '../../pages/CartDetailsPage'
import { PaymentInfo } from '../../pages/PaymentInfoPage'
import { testNG } from '../../fixtures/LoginFixrure'


test('Place Order', async({page})=>{

    const signInPage=new SignInPage(page);
    await signInPage.navigate();
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");

    await expect(signInPage.emailInput).toBeEnabled();
    await expect(signInPage.passwordInput).toBeEditable();
    await expect(signInPage.submitButton).toBeEnabled();

    const dashboardPage=await signInPage.login('maske.nitinraj@gmail.com','Password123');

    await expect(dashboardPage.productSectionDetail).toBeVisible();

    await dashboardPage.addProductToCart('ZARA COAT 3');

    if(await dashboardPage.toastMsg.isVisible()){
        await dashboardPage.toastMsg.waitFor({state:'hidden'});
    }
    
    const cartDetils=await dashboardPage.clickCartButton();
    const paymentInfo=await cartDetils.clickBuyNowButton();
    const placeOrderDetails=await paymentInfo.completeOrder('India');
    await placeOrderDetails.verifyOrder();

    await page.pause();
})

testNG('Place Order Using API', async({loginPage, page})=>{

    const dashboard=new DashboardPage(page);
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');
    await page.pause();
})

test.only('Login With Storage State', async({page})=>{

    const signInPage=new SignInPage(page);
    await signInPage.navigateToDashboard('https://rahulshettyacademy.com/client/#/dashboard/dash');
})