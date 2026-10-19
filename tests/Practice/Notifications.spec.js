import{test, expect} from '@playwright/test'

test('Notification Demo', async({page})=>{

    await page.goto("https://testing.qaautomationlabs.com/notifications.php");
    const btnSuccessMsg=page.getByTestId("notify-success-btn");

    await expect(btnSuccessMsg).toBeVisible();
    
    await expect.soft(btnSuccessMsg).toHaveCSS('background-color', 'rgb(0,128,0)');
    const successToasMsg=page.locator("[class*='bg-success']");

    await expect(successToasMsg).toBeHidden();

    await btnSuccessMsg.click();

    await expect(successToasMsg).toBeVisible();

    const notTitle=await successToasMsg.locator('strong').textContent();
    console.log(notTitle);

    await expect.soft(notTitle).toBe("Notification Title")

    await expect.soft(successToasMsg.locator('small')).toHaveText("Notification Subtitle")

    await expect.soft(successToasMsg.locator('[class="toast-body"]')).toHaveText("Notification Body:- You Notification Body Goes Here.");

    await expect.soft(successToasMsg).toHaveCSS('background-color','rgb(0,128,0)');
    
    console.log("Executing Last Line");

    await page.pause();
})