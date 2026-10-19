import{test,expect} from '@playwright/test'
import { SignInPage } from '../../pages/SignInPage'
import { testNG as setup } from '../../fixtures/LoginFixrure';

setup('Auth Login', async({page, loginAPI})=>{

    //const signInPage=new SignInPage(page);
    await loginAPI.navigate();
    await loginAPI.login('maske.nitinraj@gmail.com','Password123');
    await page.waitForTimeout(5000);
    await page.context().storageState({path:'user.json'})

})