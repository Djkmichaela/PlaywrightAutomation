const { test, expect } = require('@playwright/test');


test('My First test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.{.jpg,png,jpeg}',route=>route.abort());// blocks any images with those extentions from loading
    const userName = page.locator('#username');
   // page.on('request',request=> console.log(request.url()));
    page.on('response',response=>console.log(response.url(),response.status())); //logs all the endpoint calls made on the page with theire response codes
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    console.log(await page.title());
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userName.fill("Michael");
    await page.locator("[type='password']").fill('learning');
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('password.');

    userName.fill("");
    userName.fill('rahulshettyacademy');
    await page.locator("#signInBtn").click();
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
    console.log(await page.locator(".card-body a").allTextContents());//this method doesnt wait for elements to appear on the Dom



});

test('My Second test', async ({ page }) => {



    await page.goto("https://rahulshettyacademy.com/login");
    console.log(await page.title());


});
test('Select Dropdowns', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise");
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator("[type='password']").fill('learning');
    await page.locator('.checkmark').nth(1).click();
    const dropdown = page.locator('select.form-control');
    await dropdown.selectOption("teach");
    // await page.pause();
    await page.locator('#okayBtn').click();
    expect(page.locator('.checkmark').nth(1)).toBeChecked();
    //  await page.pause();
    console.log(await page.locator('.checkmark').nth(1).isChecked());

    await page.locator('#terms').click();
    expect(page.locator('#terms')).toBeChecked();
    // await page.pause();
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await page.locator("#signInBtn").click();


});


test('Screen switch', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise");


    const document = page.locator('[href*=documents]');



    const [newPage] = await Promise.all([

        context.waitForEvent('page'),
        document.click(),
    ]);
    // await page.pause();

    const text = await newPage.locator('p.red').textContent();

    console.log(text);
    const textarray = text.split('@');
    const newarray = textarray[1].split(' ');
    const name = newarray[0];
    console.log(name);
    //await page.pause();
    await page.locator('#username').fill(name);
    //console.log(await page.locator('#username').textContent());

    //await page.pause();
});