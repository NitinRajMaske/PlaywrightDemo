import{test, expect} from '@playwright/test'

test('Window Popup Modal Demo', async({page})=>{

    await page.goto("https://testing.qaautomationlabs.com/window-popup-modal.php")
    const btnSuccessPopup=await page.getByTestId("modal-open-success-btn")
    const btnInfoPopup=page.getByRole('button',{name:'Info Modal Popup'});
    const btnPrimaryPopup=page.getByText('Primary Modal Popup');
    const popups=page.locator('div[class="modal-content"]');
    const popupName="Success Popup";

    switch(popupName){

        case "Success Popup":{
            await expect(popups.nth(2)).toBeHidden();
            await btnSuccessPopup.click();
            await popups.nth(2).waitFor({state:'visible'})
            await expect(popups.nth(2)).toBeVisible();
            const successMsg=await popups.nth(2).getByTestId("modal-success-title");
            await expect(successMsg).toHaveCSS('background-color','rgb(0,140,0)')
            await expect(successMsg).toHaveText("Success Modal Popup");
            const successBody=await popups.nth(2).getByTestId("modal-success-body");
            await expect(successBody).toHaveText("Modal Popup Body");
            const btnClose=await popups.nth(2).getByRole('button',{name:"Close",exact:true}).filter({visible:true}).first();
            await btnClose.click();
            await expect(popups.nth(2)).toBeHidden();
            break;
        }

        case "Info Popup":{

            await expect(popups.nth(1)).toBeHidden();
            await btnInfoPopup.click();
            await expect(popups.nth(1)).toBeVisible();
            const successMsg=await popups.nth(1).getByTestId("modal-info-title");
            await expect(successMsg).toHaveText("Info Modal Popup");
            const successBody=await popups.nth(1).getByTestId("modal-info-body");
            await expect(successBody).toHaveText("Modal Popup Body");
            const btnClose=await popups.nth(1).getByRole('button',{name:"Close",exact:true}).filter({visible:true}).first();
            await btnClose.click();
            await expect(popups.nth(1)).toBeHidden();
            break;

        }

        default:{
            console.log("Case Not Matching")
        }

    }
})