const { test, expect } = require('@playwright/test');


test('Calandar test', async ({ page }) => {

    const day = '6';
    const month = '4';
    const year = '2028'
    const date = [ month, day,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__wrapper").first().click()
    await page.locator('.react-calendar__navigation__label__labelText--from').click();
    await page.locator('.react-calendar__navigation__label').first().click();
    // await page.getByAltText(year).click()
    await page.locator('.react-calendar__decade-view__years').filter({ hasText: year }).click()

    await page.locator('.react-calendar__year-view__months button').nth(Number(month) - 1).click();
    await page.locator("//abbr[text()='" + day + "']").click(); //very important line use when you need to match the exact text

    //assert video 40
    const datex = await page.locator('.react-date-picker__inputGroup input');
    //await 
    console.log( await datex.count())
    let counting = 0;
    for(let i = 1; i <await datex.count(); i++) {

        const value =await page.locator('.react-date-picker__inputGroup input').nth(i).getAttribute("value");
        console.log(value,date[counting])
        expect(value).toEqual(date[counting]);
        counting++;
    }

});