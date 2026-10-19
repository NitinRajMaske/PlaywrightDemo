import {test, expect} from '@playwright/test'

test('Javscript Alerts Demo', async({page})=>{

    await page.goto("https://testing.qaautomationlabs.com/javaScript-alert.php");
    const alertSection=await page.locator('div[class="card-tools"]').last();
    await page.on('dialog', async dialog=> dialog.accept());  //register the event first before clicking on the button which causes the pop up to open
    await alertSection.getByTestId("alert-show-alert-btn").click();   

    //await page.pause();
})

test('Javscript Confirm Demo', async({page})=>{

    const action="accept1";
    await page.goto("https://testing.qaautomationlabs.com/javaScript-alert.php");
    const alertSection=page.locator('div[class="card-tools"]').last();
    const alerOutput=page.getByTestId('alert-output');

    await alertSection.scrollIntoViewIfNeeded();
    await expect(alerOutput).toBeHidden();    

    if(action==='accept'){

        await page.on('dialog', async dialog=>await dialog.accept());
        await alertSection.getByTestId("alert-show-confirm-btn").click();
        await expect(alerOutput).toBeVisible();
        await expect(alerOutput).toHaveText("You clicked OK on confirm button.");
    }else{
        await page.on('dialog', async dialog=>await dialog.dismiss());
        await alertSection.getByTestId("alert-show-confirm-btn").click();
        await expect(alerOutput).toBeVisible();
        await expect(alerOutput).toHaveText("You clicked Cancel on confirm button.");
    }
    

    //await page.pause();
})

test('Javascript Prompt Demo', async({page})=>{


    const name="Nitin";
    await page.goto("https://testing.qaautomationlabs.com/javaScript-alert.php");
    const alertSection=page.locator('div[class="card-tools"]').last();
    const alerOutput=page.getByTestId('alert-output');

    const btnShowPrompt=await alertSection.getByRole('button',{name:'Show Prompt'});
    await page.on('dialog',async dialog=>await dialog.accept(name));
    await btnShowPrompt.click();

    await expect(alerOutput).toBeVisible();
    await expect(alerOutput).toHaveText('You entered: '+name);

    //await page.pause();

})