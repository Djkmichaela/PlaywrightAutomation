const { expect } = require('@playwright/test');
class PlaceOrder{


    constructor(page){
     this.page = page;
     this.searchCountry = page.locator("[placeholder='Select Country']");
     this.countriesSelector = page.locator('.ta-results.list-group:nth-child(2) button');
     this.emailValue = page.locator(".user__name [type='text']");
     this.placeOrderButton = page.locator('.action__submit');
    }


async selectCountryAndPlaceOrder(username){

          await this.searchCountry.pressSequentially('Ind');
          await this.countriesSelector.first().waitFor();
          const countries = await this.countriesSelector;
          //await countries.waitFor();
        
          console.log(await this.countriesSelector.allTextContents());
          const opt = await countries.count()
          for (let i = 0; i < opt; i++) {
            const text = await this.countriesSelector.nth(i).textContent();
            //video 28
            //text.includes('India')
            //text.trim()==='India'
            if (text === ' India') {
              console.log(text);
              await this.countriesSelector.nth(i).click();
              break;
            }
          }
          // console.log(await countries.locator('button').textContent());
          //await page.pause();
          await expect(this.emailValue.first()).toHaveText(username); //uses element's texts
          await this.placeOrderButton.click();
    }
}

module.exports ={PlaceOrder};