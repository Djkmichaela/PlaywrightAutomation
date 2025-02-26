
const { LoginPage } = require('./LoginPage');
const {ProducsPage} =require('./ProductsPage');
const {CheckoutPage} = require('./CheckoutPage');
const {PlaceOrder} = require('./PlaceOrder');
const {OrderConfirmation} = require('./OrderConfirmation');
class POManager {
    //Page object manager video 75
    constructor(page, products) {
        this.products = products;
        this.page = page;
        this.loginpage = new LoginPage(this.page);
        this.checkoutpage = new CheckoutPage(this.page,this.products);
        this.productspage = new ProducsPage(this.page);
        this.placeorderpage = new PlaceOrder(this.page);
        this.orderconfirmationpage = new OrderConfirmation(this.page);

    }

    getLoginPage() {

        return this.loginpage;
    }

    getCheckoutPage() {

        return this.checkoutpage;
    }

    getOrderConfirmationPage() {

        return this.orderconfirmationpage;
    }

    getPlaceOrderPage() {

        return this.placeorderpage;
    }

    getProductsPage() {

        return this.productspage;
    }
}

module.exports = { POManager };