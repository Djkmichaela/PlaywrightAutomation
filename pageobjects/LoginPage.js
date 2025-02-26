class LoginPage {


    constructor(page) {
        this.page = page;
        this.username = page.locator("[type='email']");
        this.passWord = page.locator("[type='password']");
        this.signIn = page.locator("#login");

    }

    async goTo() {

        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username, password) {

        await this.username.fill(username);
        await this.passWord.fill(password);
        await this.signIn.click();

    }
}

module.exports = { LoginPage };