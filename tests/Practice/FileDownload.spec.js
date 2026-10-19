import{test, expect} from '@playwright/test'
import fs from 'fs'

test('File Download Demo', async({page})=>{

    const filePath='C:\\Users\\Nitin.Maske\\OneDrive\\Desktop\\myNewFile.txt';
    await page.goto("https://testing.qaautomationlabs.com/file-download.php")
    const btnGenerateFile=await page.getByRole('button',{name:'Generate File'});
    await btnGenerateFile.scrollIntoViewIfNeeded();
    const btnDownloadFile=await page.getByRole('link',{name:' Download File'});

    await expect(btnDownloadFile).toBeHidden();
    await page.on('dialog', async dialog=>await dialog.accept());
    await btnGenerateFile.click();
    const txtEnterTxt=await page.getByPlaceholder("Type your text here...");
    await txtEnterTxt.pressSequentially('I am Nitin', {delay:1000});
    await btnGenerateFile.click();
    await expect(btnDownloadFile).toBeVisible();

    const [download]=await Promise.all([

        page.context().waitForEvent('download'),
        btnDownloadFile.click()
    ])

    await download.saveAs(filePath);

    await expect(fs.existsSync(filePath)).toBe(true);
    const fileSize=await fs.statSync(filePath).size;

    console.log("File Size = ",fileSize)

    await page.pause();
})