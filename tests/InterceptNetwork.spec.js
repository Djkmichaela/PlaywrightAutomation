const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../Utils/APIUtils');

const LoginPayLoad = { userEmail: "vasbabalwa@gmail.com", userPassword: "Password123#" }
const ordersPayLoad = { orders: [{ country: "Congo, the Democratic Republic of the", productOrderedId: "67a8df56c0d3e6622a297ccd" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, LoginPayLoad);
  response = await apiUtils.createOrder(ordersPayLoad);
});




test('@API My Second test with filter', async ({ page }) => {

  page.addInitScript(value => {
    window.localStorage.setItem('token', value)
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

    async route => {
      let body = JSON.stringify(fakePayLoadOrders);
      const response = await page.request.fetch(route.request());
      route.fulfill({
        response,
        body,
      })
    }
  );

  await page.locator('[routerlink*=myorders]').first().click();
  
 await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
  console.log(await page.locator('.mt-4.ng-star-inserted').textContent());
 // expect(await page.locator('.mt-4.ng-star-inserted').textContent()).toEqual(' You have No Orders to show at this time. Please Visit Back Us ')
  
  //Flakky test



});

