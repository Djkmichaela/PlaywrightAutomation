class ProducsPage{


    constructor(page){
      this.page = page;

      this.productLabel = page.locator('.card-body h5 b');
      this.productsLocator = page.locator(".card-body");

    }





   async addProductTocart(product){


        await this.productLabel.first().waitFor(); //waits for the first element
        console.log(await this.productLabel.allTextContents());
      
        const products = await this.productsLocator;
      
        const count = await products.count();
        for (let i = 0; i < count; i++) {
          if (await products.nth(i).locator(' h5 b').textContent() === product) {
            await products.nth(i).locator('text=Add To Cart').click();
            // await products.nth(i).locator('button').nth(1).click();
            // await products.nth(i).locator("text= Add To Cart").click();
            break;
      
          }
      
        }
    }
}

module.exports ={ProducsPage};