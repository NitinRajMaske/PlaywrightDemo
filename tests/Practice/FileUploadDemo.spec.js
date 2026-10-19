import {test, expect} from '@playwright/test'

test('File Upload Demo', async({page})=>{

    await page.goto("https://testing.qaautomationlabs.com/file-upload.php");
    const btnBrowse=page.getByTestId("upload-browse-btn");
    await expect(btnBrowse).toBeVisible();
    await btnBrowse.scrollIntoViewIfNeeded();
    await btnBrowse.setInputFiles(["C:\\Users\\Nitin.Maske\\OneDrive\\Desktop\\newFile.xlsx"]);

    await page.pause();
})