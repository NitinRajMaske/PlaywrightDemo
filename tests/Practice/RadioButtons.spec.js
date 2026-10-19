import{test, expect} from '@playwright/test'

test.skip('Validate Gender Checkbox', async({page})=>{

    await page.goto('https://testing.qaautomationlabs.com/index.php');
    const genderToSelect='Male';    
    

    await page.getByText('Radio Button').first().click();
    await page.getByTestId('radio-show-gender-btn').click();
    let txtOnButtonClick=await page.getByText('Please select a gender.');
    await txtOnButtonClick.waitFor({state:'visible'});
    
    await expect(txtOnButtonClick).toHaveText('Please select a gender.');
    const allGenders=await page.locator("input[data-testid*='radio-gender']");
    console.log("Gender Count = ",await allGenders.count())

    let genderVal;
    for(let i=0;i<await allGenders.count();i++){

        console.log(await allGenders.nth(i).textContent());
        if(!(await allGenders.nth(i).isChecked() && await allGenders.nth(i+1).isChecked())){

            genderVal=await allGenders.nth(i).getAttribute('value');

            console.log("Value = ",genderVal);
            if(genderVal===genderToSelect){

                await allGenders.nth(i).click();
                await expect(allGenders.nth(i)).toBeChecked();
            }
        }

    }

    await page.getByTestId('radio-show-gender-btn').click();
    txtOnButtonClick=await page.getByTestId('radio-result');
    await expect(txtOnButtonClick).toHaveText('You selected: Male');

    await page.pause();


})

test('Multi Value Radio Buttons', async({page})=>{

    const gender="Male", ageGroup="18-35";
    await page.goto("https://testing.qaautomationlabs.com/index.php");
    await page.getByRole('link',{name:'Radio Button'}).first().click();
    const radioSection=await page.locator("//*[text()='Click on button to get the selected values from Gender and Age']//parent::div//parent::div");
    const textToShowOnButtonClick=await radioSection.getByTestId('radio-combo-result');

    const btnShowSelected=await page.getByRole('button',{name:'Show Selected Values'});

    const genders=await page.locator("//input[contains(@data-testid,'radio-combo-gender')]");
    const ageGroups=await page.locator("//input[contains(@data-testid,'radio-age')]");

    await textToShowOnButtonClick.scrollIntoViewIfNeeded();
    await expect(textToShowOnButtonClick).toBeHidden();

    await btnShowSelected.click();
    await expect(textToShowOnButtonClick).toBeVisible();
    await expect(textToShowOnButtonClick).toHaveText("Please select both gender and age group.")


    for(let i=0;i<await genders.count();i++){

        let attVal=await genders.nth(i).getAttribute('value');
        if(attVal===gender){

            await genders.nth(i).check();
            await btnShowSelected.click();
            await expect(textToShowOnButtonClick).toHaveText("Please select both gender and age group.");
            await expect(genders.nth(i)).toBeChecked();
            break;
        }

    }

    for(let i=0;i<await ageGroups.count();i++){

        const attrVal=await ageGroups.nth(i).getAttribute('value');
        if(attrVal===ageGroup){

            await ageGroups.nth(i).check();
            await btnShowSelected.click();
            await expect(textToShowOnButtonClick).toHaveText("You selected: Gender = Male, Age Group =18-35");
            await expect(ageGroups.nth(i)).toBeChecked();
            break;
        }
    }

    await page.pause();



})

