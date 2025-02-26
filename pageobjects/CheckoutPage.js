const {expect} = require('@playwright/test');
class CheckoutPage {


    constructor(page,product) {
 
        this.page = page;
        this.cartButton = page.locator('[routerlink*=cart]');
        this.listOfProducts = page.locator('li div h3');
        this.ProductInCartList =page.locator("h3:has-text('"+product+"')");
        this.chechoutButton = page.locator('text=Checkout');
    

    }


    async viewCartAndCheckOut() {

        await this.cartButton.click();

        await this.listOfProducts.waitFor();

        const bool = await this.ProductInCartList.isVisible();
        expect(bool).toBeTruthy();
        // const val = await page.locator('li div h3').textContent();
        // console.log(await page.locator('li div h3').textContent());
        //  await expect( val).toBe('IPHONE 13 PRO')

        await  this.chechoutButton.click();
    }
}

module.exports ={CheckoutPage};