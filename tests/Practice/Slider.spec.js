import{test,expect} from '@playwright/test'

test('Slider Demo', async({page})=>{

    const slideInput="50";
    await page.goto("https://testing.qaautomationlabs.com/slider.php");

    const slider1=page.locator("#slider1");
    const sliderVal=page.getByTestId("slider-1-value");
    await expect(sliderVal).not.toHaveText(slideInput);

    await slider1.fill(slideInput);

    await expect(sliderVal).toHaveText(slideInput);

    await page.pause();
})