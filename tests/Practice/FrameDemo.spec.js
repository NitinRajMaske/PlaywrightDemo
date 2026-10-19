import{test,expect} from '@playwright/test'

test('Frame Demo Examples', async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();

    const number=[1,2];

    await page.goto("https://testing.qaautomationlabs.com/iframe.php");
    await page.getByText("IFrame Demo").scrollIntoViewIfNeeded();

    //await expect(frameMessage).toBeHidden();

    for(let i=0;i<number.length;i++){

        const framePage=await page.frameLocator(`[data-testid='iframe-frame-${number[i]}']`);
        const frameMessage=await page.getByTestId("iframe-message");        

        await framePage.getByTestId(`iframe${number[i]}-button`).click();
        await frameMessage.waitFor({state:'visible'});
        await expect(frameMessage).toHaveText(`You have clicked on iframe ${number[i]} button`);

    }

    
})