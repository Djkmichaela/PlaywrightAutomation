const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
// data set video 77
const dataset = JSON.parse(JSON.stringify(require('../Utils/singleDataSetPlaceOrder.json')));


test('My Second test ', async ({ page }) => {

  // const username = 'vasbabalwa@gmail.com';
  // const product = 'IPHONE 13 PRO';
  // const password = 'Password123#';
  const poManagerObject = new POManager(page, dataset.product)

  const loginOb = poManagerObject.getLoginPage();
  await loginOb.goTo();
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");
  await loginOb.validLogin(dataset.username, dataset.password);

  const productsPage = poManagerObject.getProductsPage();
  await productsPage.addProductTocart(dataset.product);

  const checkoutob = poManagerObject.getCheckoutPage();
  await checkoutob.viewCartAndCheckOut();
  const placeOrderOb = poManagerObject.getPlaceOrderPage();
  await placeOrderOb.selectCountryAndPlaceOrder(dataset.username);

  const orderConfirm = poManagerObject.getOrderConfirmationPage();
  await orderConfirm.confirmOrderMethod();
});


