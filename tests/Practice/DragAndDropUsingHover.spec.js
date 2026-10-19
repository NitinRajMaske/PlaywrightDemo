import{test, expect} from '@playwright/test'

test('Dran And Drop Using Hover', async({page})=>{

    await page.goto("https://testing.qaautomationlabs.com/drag-and-drop.php");
    
    // Create the locators (do not use 'await' here)
    const listLocator = page.getByTestId("dnd-list");
    const listItems = listLocator.locator('li');

    const source = listItems.nth(1);
    const dest = listItems.nth(2);

    // The sequential manual mouse action
    await source.hover();
    await page.mouse.down();
    
    await dest.hover();
    await page.mouse.up();

    await page.pause();
})