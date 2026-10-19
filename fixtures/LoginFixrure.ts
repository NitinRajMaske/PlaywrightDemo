import{test, expect} from '@playwright/test'
import { SignInPage } from '../pages/SignInPage'
import { APIUtils } from '../util/APIUtil/APIUtil'

const orderPayload={orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
const loginPayload={userEmail: "maske.nitinraj@gmail.com", userPassword: "Password123"}
let token:string;

type MyFixture=({
    loginPage:SignInPage;
    loginAPI:SignInPage
})

export const testNG=test.extend<MyFixture>({

    loginPage: async({page, playwright}, use)=>{

        const apiContext=await playwright.request.newContext();
        const apiUtil=await new APIUtils(apiContext);
        token=await apiUtil.Login(loginPayload);
        console.log('API Token = ',token)

        const orderId=await apiUtil.placeOrder(orderPayload, token);

        await page.addInitScript(value=>{
            window.localStorage.setItem('token', value)
        },token)

        const signPage=new SignInPage(page);
        await signPage.navigateToDashboard('https://rahulshettyacademy.com/client/#/dashboard/dash');
        await use(orderId);
        
    },

    loginAPI: async({page},use)=>{

        const sign=new SignInPage(page);
        await use(sign);

    }
})