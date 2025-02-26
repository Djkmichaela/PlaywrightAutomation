const { test, expect } = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
// data set video 77
const dataset = JSON.parse(JSON.stringify(require('../Utils/placeOrderTestData.json')));
// const { LoginPage } = require('../pageobjects/LoginPage');
// const {ProducsPage} =require('../pageobjects/ProductsPage');
// const {CheckoutPage} = require('../pageobjects/CheckoutPage');
// const {PlaceOrder} = require('../pageobjects/PlaceOrder');
// const {OrderConfirmation} = require('../pageobjects/OrderConfirmation');
for(const data of dataset){
test(`My Second test +${data.product}`, async ({ page }) => {

  // const username = 'vasbabalwa@gmail.com';
  // const product = 'IPHONE 13 PRO';
  // const password = 'Password123#';
   const poManagerObject = new POManager(page,data.product)
  
  const loginOb = poManagerObject.getLoginPage();
  await loginOb.goTo();
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");
  await loginOb.validLogin(data.username, data.password);
 
  const productsPage = poManagerObject.getProductsPage();
 await productsPage.addProductTocart(data.product);
  
 const checkoutob = poManagerObject.getCheckoutPage();
 await checkoutob.viewCartAndCheckOut();
 const placeOrderOb = poManagerObject.getPlaceOrderPage();
 await placeOrderOb.selectCountryAndPlaceOrder(data.username);
  
 const orderConfirm = poManagerObject.getOrderConfirmationPage();
 await orderConfirm.confirmOrderMethod();
});

}
