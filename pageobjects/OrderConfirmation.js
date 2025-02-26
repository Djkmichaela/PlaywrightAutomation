const { expect } = require('@playwright/test');
class OrderConfirmation {

    constructor(page) {

        this.page = page;
        this.thanKyouMessage = page.locator('.hero-primary');
        this.orderIdLabel = page.locator('label.ng-star-inserted');
        this.myOrders = page.locator('[routerlink*=myorders]');
        this.orderList = page.locator('tbody tr th');
        this.buttonsInTheRow = page.locator('tbody tr button');
        this.orderIDInSum = page.locator('div.col-text.-main');
    }



    async confirmOrderMethod() {

        const textAss = await this.thanKyouMessage.textContent();
        expect(textAss).toBe(' Thankyou for the order. ')
        const orderID = await this.orderIdLabel.textContent();
        console.log(orderID);
        console.log(await orderID.split('|')[1].split('|')[0].trim());
        const orderIDReady = await orderID.split('|')[1].split('|')[0].trim();
        await this.myOrders.first().click();
        await this.orderList.first().waitFor()
        //await page.waitForLoadState('networkidle');
        const orders = await this.orderList;
        const numberOfOrders = await orders.count()
        console.log(await this.orderList.allTextContents());

        for (let i = 0; i < numberOfOrders; i++) {
            const text = await this.orderList.nth(i).textContent();
            if (text === orderIDReady) {
                await this.buttonsInTheRow.nth(i).first().click();
                console.log(text, orderIDReady);
                break;

            }
        }
        const ordersum = await this.orderIDInSum.textContent()
        expect(orderIDReady.includes(ordersum)).toBeTruthy();

    }
}
module.exports = {OrderConfirmation};