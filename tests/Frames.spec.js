const {test,expect} =require('@playwright/test');
// const { chromium } = require('playwright-core');
// const bundledChromium = require('chrome-aws-lambda');


// const browser = await Promise.resolve(bundledChromium.executablePath).then(
//     (executablePath) => {
//       if (!executablePath) {
//         // local execution
//         return chromium.launch({});
//       }
//       return chromium.launch({ executablePath });
//     }
//   );


//test.describe.configure({mode:'serial'}) // the advantage of adding this is that when tests are dependent if one fails it will not execute others that are dependent on the one that failed
//test.describe.configure({mode:'parallel'}) // this line will execute tests in this file in parallel
test('Popup validations and Frames', async ({browser})=>{
 
    // await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    // await page.goto("https://Google.com/");
    // await page.goBack();
    // await page.goForward();
   
    const context = await browser.newContext();
    const page = await context.newPage();
   
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    await page.locator('#displayed-text').isVisible();
    await page.locator('#hide-textbox').click();
    await page.locator('#displayed-text').isHidden();
    await page.locator('#show-textbox').click();
    await page.locator('#displayed-text').isVisible();
    //await page.locator()
   
    
    page.on("dialog", dialog=> dialog.accept())
    //await page.getByRole('button',{name:'Confirm'}).click()
    await page.locator('#confirmbtn').click();

    await page.locator('#mousehover').hover() //hovering


    const framep = page.frameLocator('#courses-iframe');
    await framep.locator("(//a[text()='All Access plan'])[1]").click();
    console.log(await framep.locator('.text h2 span').textContent());
    expect(await framep.locator('.text h2 span').textContent()).toEqual('13,522')
    
});

test('Taking screenshots', async ({page})=>{


    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    await page.locator('#displayed-text').isVisible();
    await page.locator('#displayed-text').screenshot({path:"partialScreenShot.png"})// takes a screenshot of the element
    await page.locator('#hide-textbox').click();
    await page.locator('#displayed-text').isHidden();
    await page.locator('#show-textbox').click();
    await page.screenshot({path:'screenshot.jpeg'}); // teakes a screenshot of the page after the click
    await page.locator('#displayed-text').isVisible();

});

test('Visual testing by comparing screenshots', async ({page})=>{


    await page.goto("https://Google.com");
    /*The below compares two images first time it will complain because their is no 
    existing image to compare with and the second time it will compare
     */
    expect(await page.screenshot()).toMatchSnapshot('landingPage.png');

});