const { test, expect, request } = require('@playwright/test');
const {APIUtils} = require('../Utils/APIUtils');

const LoginPayLoad = { userEmail: "vasbabalwa@gmail.com", userPassword: "Password123#" }
const ordersPayLoad = { orders: [{ country: "Congo, the Democratic Republic of the", productOrderedId: "67a8df56c0d3e6622a297ccd" }] };
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext,LoginPayLoad);
  response = await apiUtils.createOrder(ordersPayLoad);
});
  



test('My Second test with filter', async ({ page }) => {

  page.addInitScript(value => {
    window.localStorage.setItem('token', value)
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");


  await page.locator('[routerlink*=myorders]').first().click();
  await page.locator('tbody tr th').first().waitFor()


  await page.locator('tbody tr').filter({ hasText: response.orderIDR }).getByRole('button', { name: 'View' }).click();
  const ordersum = await page.locator('div.col-text.-main').textContent();
  expect(response.orderIDR.includes(ordersum)).toBeTruthy();

});

