import {test, expect} from '@playwright/test'

test('Drag And Drop Demo Examples', async({page})=>{

    await page.goto("https://testing.qaautomationlabs.com/drag-and-drop.php");

    const dragList=await page.getByTestId("dnd-list")
    const allDragItems=await dragList.locator("li");

    const source=await allDragItems.first();
    const dest=await allDragItems.last();

    await source.dragTo(dest);

    await page.pause();

})