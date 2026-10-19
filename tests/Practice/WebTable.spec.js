import{test, expect} from '@playwright/test'

test.skip('Web Table Testing', async({page})=>{


    const name="Luca Rossi";
    await page.goto("https://testing.qaautomationlabs.com/web-table.php");
    const table=await page.getByTestId('webtable-table');
    const tblRows=await table.locator('tbody tr');
    const btnNextPage=await page.getByTestId('webtable-next').filter({visible:true});

    const totalRows=await tblRows.count();

    let initialName="";
    outerloop:while(true){
    for(let i=0;i<totalRows;i++){

        const rowValue=await tblRows.nth(i).textContent();
        const lastName=await tblRows.last().textContent();
        if(rowValue.includes(name)){

            initialName=await tblRows.filter({hasText:name}).textContent();
            break outerloop;
        }else if(i===totalRows-1 && await btnNextPage.isEnabled() && !lastName.includes(name)){

            await btnNextPage.click();
        }else if(i===totalRows-1 && await btnNextPage.isDisabled() && !lastName.includes(name)){

           break outerloop;
        }
    }

}
    console.log("Value Returned = ",initialName)

})

test.skip('Add Record To A Dynamic Table', async({page})=>{

    const name="Nitin", country="India";
    await page.goto("https://testing.qaautomationlabs.com/web-table.php");
    const table=await page.getByTestId('webtable-table');
    let tblRows=await table.locator('tbody tr');
    const btnNextPage=await page.getByTestId('webtable-next').filter({visible:true});
    const pagination=await page.locator("[data-testid='webtable-pagination'] li");
    console.log('Pagination Count = ',await pagination.count())

    await page.getByPlaceholder('Name').fill(name);
    await page.getByPlaceholder('Country').fill(country);
    await page.getByRole('button',{name:'Add Record'}).click();

    const name1="Sachin"
    let returnValue="";

    outerloop:for(let i=1;i<await pagination.count()-2;i++){

       
        const rowCount=await tblRows.count();

        for(let j=0;j<rowCount;j++){

             tblRows=await table.locator('tbody tr');
             let namecheck=await tblRows.nth(j).textContent();
            if(namecheck.includes(name1)){
                returnValue=await tblRows.filter({hasText:name}).textContent();
                break outerloop;
            }          

        }

        if(await pagination.last().isEnabled()){

            await pagination.last().click();
        }else{
            console.log("Element not found");
            break outerloop;
        }

    }

    console.log("Return Value = ",returnValue)

})

test('Update Table Record', async({page})=>{

    const originalName="Rahul Sharma", originalCountry="India";
    const nameToUpdate="Nitin", countryToUpdate="US"
    await page.goto("https://testing.qaautomationlabs.com/web-table.php");
    const tblData=await page.getByTestId("webtable-table");
    const data=await tblData.locator("//tbody//tr").filter({hasText:originalName})
    const data1=await tblData.locator("//tbody//tr").filter({hasText:nameToUpdate})
    console.log("Count = ",await data.count());
    const dataVal=await data.textContent();
    console.log("Selected Data = ",dataVal);

    await data.locator("//button[@title='Edit']").click();
    const txtName=page.locator("//input[@value='"+originalName+"']");
    console.log(await txtName.inputValue());
    const txtCountry=page.locator("//input[@value='"+originalCountry+"']");

    await expect(txtName).toBeEnabled();
    await expect(txtCountry).toBeEnabled();
    await txtName.clear();
    await txtName.fill(nameToUpdate);
    await txtCountry.clear();
    await txtCountry.fill(countryToUpdate);
    await page.locator("//button[@title='Save']").click();

    console.log(await data1.locator("//td[contains(@data-testid,'webtable-cell-name')]").textContent());
    console.log(await data1.locator("//td[contains(@data-testid,'webtable-cell-country')]").textContent());

    await page.pause();

})