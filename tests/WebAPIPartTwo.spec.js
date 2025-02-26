const { test, expect } = require('@playwright/test');
let webContext;
const email = 'vasbabalwa@gmail.com';
const product = 'IPHONE 13 PRO';

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    await page.locator("[type='email']").fill(email);
    await page.locator("[type='password']").fill('Password123#');
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle'); // waits for all the calls on the nework to complete
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});



test('@API Web API Test', async ({ }) => {


    const page = await webContext.newPage(); //created a new context and passed the json data in the browser
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator('.card-body h5 b').first().waitFor(); //waits for the first element
    console.log(await page.locator(".card-body h5 b").allTextContents());

    const products = await page.locator(".card-body");

    const count = await products.count();
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator(' h5 b').textContent() === product) {
            await products.nth(i).locator('text=Add To Cart').click();
            // await products.nth(i).locator('button').nth(1).click();
            // await products.nth(i).locator("text= Add To Cart").click();
            break;

        }

    }

    await page.locator('[routerlink*=cart]').click();

    await page.locator('li div h3').waitFor();

    const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
    expect(bool).toBeTruthy();
    // const val = await page.locator('li div h3').textContent();
    // console.log(await page.locator('li div h3').textContent());
    //  await expect( val).toBe('IPHONE 13 PRO')

    await page.locator('text=Checkout').click();
    await page.locator("[placeholder='Select Country']").pressSequentially('Ind');
    await page.locator('.ta-results.list-group:nth-child(2) button').first().waitFor();
    const countries = await page.locator('.ta-results.list-group:nth-child(2) button')
    //await countries.waitFor();

    console.log(await page.locator('.ta-results.list-group:nth-child(2) button').allTextContents());
    const opt = await countries.count()
    for (let i = 0; i < opt; i++) {
        const text = await page.locator('.ta-results.list-group:nth-child(2) button').nth(i).textContent();
        //video 28
        //text.includes('India')
        //text.trim()==='India'
        if (text === ' India') {
            console.log(text);
            await page.locator('.ta-results.list-group:nth-child(2) button').nth(i).click();
            break;
        }
    }
    // console.log(await countries.locator('button').textContent());
    //await page.pause();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email); //uses element's texts
    await page.locator('.action__submit').click();
    const textAss = await page.locator('.hero-primary').textContent();
    expect(textAss).toBe(' Thankyou for the order. ')
    const orderID = await page.locator('label.ng-star-inserted').textContent();
    console.log(orderID);
    console.log(await orderID.split('|')[1].split('|')[0].trim());
    const orderIDReady = await orderID.split('|')[1].split('|')[0].trim();
    await page.locator('[routerlink*=myorders]').first().click();
    await page.locator('tbody tr th').first().waitFor()
    //await page.waitForLoadState('networkidle');
    const orders = await page.locator('tbody tr th')
    const numberOfOrders = await orders.count()
    console.log(await page.locator('tbody tr th').allTextContents());

    for (let i = 0; i < numberOfOrders; i++) {
        const text = await page.locator('tbody tr th').nth(i).textContent();
        if (text === orderIDReady) {
            await page.locator('tbody tr button').nth(i).first().click();
            console.log(text, orderIDReady);
            break;

        }
    }
    const ordersum = await page.locator('div.col-text.-main').textContent()
    expect(orderIDReady.includes(ordersum)).toBeTruthy();

});


test('Web API Test two skips login', async ({ }) => {


    const page = await webContext.newPage(); //created a new context and passed the json data in the browser
    await page.goto("https://rahulshettyacademy.com/client");
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body h5 b').first().waitFor(); //waits for the first element
    console.log(await page.locator(".card-body h5 b").allTextContents());
});

test('My Second test with filter', async ({}) => {

    const email = 'vasbabalwa@gmail.com';
    const product = 'IPHONE 13 PRO';
    const page = await webContext.newPage(); 
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    // await page.locator("[type='email']").fill(email);
    // await page.locator("[type='password']").fill('Password123#');
    // await page.locator("#login").click();
    await page.waitForLoadState('networkidle');// this waits for all the network calls before it checks for elements
    await page.locator('.card-body h5 b').first().waitFor(); //waits for the first element
    await page.locator('.card-body').filter({ hasText: 'IPHONE 13 PRO' }).getByRole('button', { name: "Add To Cart" }).click()


    //    console.log(await page.locator(".card-body h5 b").allTextContents());

    //    const products = await page.locator(".card-body");
    //    //await page.pause();

    //  const count = await products.count();
    //    for (let i = 0; i < count; i++) {
    //    if(await products.nth(i).locator(' h5 b').textContent() === product)  {
    //       await products.nth(i).locator('text=Add To Cart').click();
    //        // await products.nth(i).locator('button').nth(1).click();
    //     // await products.nth(i).locator("text= Add To Cart").click();
    //       break;

    //    }

    //  }

    await page.locator('[routerlink*=cart]').click();

    await page.locator('li div h3').waitFor();

    const bool = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
    expect(bool).toBeTruthy();
    // const val = await page.locator('li div h3').textContent();
    // console.log(await page.locator('li div h3').textContent());
    //  await expect( val).toBe('IPHONE 13 PRO')

    await page.locator('text=Checkout').click();
    await page.locator("[placeholder='Select Country']").pressSequentially('Ind');
    await page.locator('.ta-results.list-group:nth-child(2) button').first().waitFor();
    //const countries = await page.locator('.ta-results.list-group:nth-child(2) button')
    console.log(await page.locator('.ta-results.list-group:nth-child(2) button').allTextContents());
    //await countries.waitFor();
    await page.locator('.ta-results.list-group:nth-child(2) button').filter({ hasText: 'India', hasNotText: 'Ocean' }).click();


    //  const opt = await countries.count()
    //  for(let i=0;i<opt;i++){
    //  const  text = await page.locator('.ta-results.list-group:nth-child(2) button').nth(i).textContent();
    //    //video 28
    //    //text.includes('India')
    //    //text.trim()==='India'
    //  if(text===' India'){
    //      console.log(text);
    //      await page.locator('.ta-results.list-group:nth-child(2) button').nth(i).click();
    //      break;
    //    }
    //  }
    // console.log(await countries.locator('button').textContent());
    //await page.pause();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email); //uses element's texts
    await page.locator('.action__submit').click();
    const textAss = await page.locator('.hero-primary').textContent();
    expect(textAss).toBe(' Thankyou for the order. ')
    const orderID = await page.locator('label.ng-star-inserted').textContent();
    console.log(orderID);
    console.log(await orderID.split('|')[1].split('|')[0].trim());
    const orderIDReady = await orderID.split('|')[1].split('|')[0].trim();
    await page.locator('[routerlink*=myorders]').first().click();
    await page.locator('tbody tr th').first().waitFor()
    //await page.waitForLoadState('networkidle');

    await page.locator('tbody tr').filter({ hasText: orderIDReady }).getByRole('button', { name: 'View' }).click();

    //  const orders = await page.locator('tbody tr th')
    //  const numberOfOrders = await orders.count()
    //  console.log(await page.locator('tbody tr th').allTextContents());

    //  for(let i=0;i<numberOfOrders;i++){
    //    const text = await page.locator('tbody tr th').nth(i).textContent();
    //    if(text===orderIDReady){
    //      await page.locator('tbody tr button').nth(i).first().click();
    //      console.log(text,orderIDReady);
    //      break;

    //    }
    //  }
    const ordersum = await page.locator('div.col-text.-main').textContent()
    expect(orderIDReady.includes(ordersum)).toBeTruthy();

});

