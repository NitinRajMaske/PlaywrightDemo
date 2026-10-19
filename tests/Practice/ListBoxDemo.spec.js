import{test, expect} from '@playwright/test'

test('ListBox Demo Example', async({page})=>{

    await page.goto("https://testing.qaautomationlabs.com/list-box.php")
    const btnSections=page.locator("[class='buttons']");

    await expect(btnSections.locator("button")).toHaveCount(4);
    const sourceList=page.getByTestId("listbox-source");
    const targetList=page.getByTestId("listbox-target");
    let targetCount=await targetList.locator('option').count();

    console.log(targetCount)
    targetCount=targetCount===null || targetCount ===undefined ? targetCount=0 : targetCount;
    
    console.log("Initial Count = ", targetCount)
    await sourceList.selectOption({label:'Sakshi'});
    await btnSections.locator("button").first().click();

    targetCount=await targetList.locator('option').count();
    console.log("Target Count After Adding Element = ",targetCount);

    await targetList.selectOption({index:0});
    const selectedValue=await targetList.inputValue();
    console.log("Selected Value = ",selectedValue)
    await page.pause();
})

test.only('ADD All elements from source list to destination list', async({page})=>{

    await page.goto("https://testing.qaautomationlabs.com/list-box.php")
    const btnSections=page.locator("[class='buttons']");

    await expect(btnSections.locator("button")).toHaveCount(4);
    const sourceList=page.getByTestId("listbox-source");
    const targetList=page.getByTestId("listbox-target");
    let sourceCount=await sourceList.locator("option").count();
    let targetCount=await targetList.locator('option').count();

    targetCount=targetCount===null || targetCount ===undefined ? targetCount=0 : targetCount;
    
    console.log("Source List Count ", sourceCount)
    console.log("Target List Initial Count = ", targetCount)

    await btnSections.locator("button").nth(1).click();
    targetCount =await targetList.locator("option").count();
    console.log("Target List Count After Adding All The Elements = ",targetCount);

    await expect(sourceCount).toEqual(targetCount);
    
    const valueToDelete="Sakshi";
    await targetList.selectOption({label:valueToDelete})
    await btnSections.locator("button").nth(2).click();

    targetCount=await targetList.locator('option').count();
    await expect(targetCount).toBe(targetCount)

    const newCount=await sourceList.locator("option").count();
    console.log("Source List New Count = ",newCount);
    await expect(newCount).toBe(1);

    const sourceListItem=await sourceList.inputValue();
    console.log("Value Added = ", sourceListItem)

    await expect(sourceListItem).toBe(valueToDelete)

    await expect(sourceList).toHaveValue(valueToDelete);

    await btnSections.locator("button").nth(3).click();
    targetCount=await targetList.locator('option').count();

    console.log("Target List Count After Deleting All The Elements = ", targetCount)

    await expect(targetCount).toBe(0);
    sourceCount=await sourceList.locator("option").count();
    await expect(sourceCount).toBe(10)

    console.log("Source List Count After Deleting All The Elements = ", sourceCount)
    await page.pause();

})