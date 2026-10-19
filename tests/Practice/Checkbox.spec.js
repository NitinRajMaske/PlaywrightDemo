import{test, expect} from '@playwright/test'
import { execSync } from 'node:child_process';

test.skip('Checkbox validations', async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://testing.qaautomationlabs.com/index.php');
   
    await page.locator("[href*='checkbox']").first().click();

    await page.pause();
})

test.skip('Click Multiple Checkboxes', async({browser})=>{

    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://testing.qaautomationlabs.com/index.php');

     await page.locator("[href*='checkbox']").first().click();
     const allChecks=await page.locator("[id*='multichk']");

     const count=await allChecks.count();

    for(let i=0;i<count;i++){

        await allChecks.nth(i).click();
    }

})

test.skip('Check Visibility Of Checkboxes', async({page})=>{

    await page.goto('https://testing.qaautomationlabs.com/checkbox.php');
    await page.getByTestId('checkbox-toggle-all-btn').scrollIntoViewIfNeeded();
    await page.getByTestId('checkbox-toggle-all-btn').click();
    const allChecks=await page.locator("[id*='multichk']");
    await expect(allChecks).toHaveCount(4);
    const total=await allChecks.count();
    console.log('Total Count = ',total)

    for(let i=0;i<total;i++){

        await expect(allChecks.nth(i)).toBeChecked();
    }
})

test('check disability of checkboxes', async({page})=>{

    await page.goto('https://testing.qaautomationlabs.com/checkbox.php');
    const allChecks=await page.locator("[data-testid*='checkbox-disable']");
    allChecks.first().scrollIntoViewIfNeeded();

    for(let i=0;i<allChecks.count();i++){

        await expect(allChecks.nth(i)).toBeDisabled();
    }
})

