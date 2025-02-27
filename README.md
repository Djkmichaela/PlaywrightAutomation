npm init playwright -- in the project folder so that you can get all the files needed


executing in debug mode : npx playwright test --debug
Execute using the playwright UI: npx playwright test --UI
one way to generate a selector i css you can run the program in debug then click explore and click on
any element that you want a selector and it will generate the css for you.

//div[text()='theText']
//abbr[text()='"+day+"']
page.locator('css:visible').click()  // this is how to select visible items
page.locator("button:has-text('View')") // this is how to select by name of element as well

video 22 codegen
A very important tool is codegen you navigate to the url that you want yo to manually automate then perform actions the actions on it then you save the code. the command is below

npx playwright codegen http://google.com 

logout from zscaler , to not be restricted with permisions

Debuging all your code video 54 section 11
add the command to execute with the linked file under the script section in the package.json file
shift+ctrl+p
select debug:Debug npm Script
you may need to increase the timeout time in the config file for the debut to not timeout
also watch video 55
npx playwright test tests/APITest.spec.js --headed
--------
./ means same folder
../ means outside of the folder
 page.on('response',response=>console.log(response.url(),response.status())); //logs all the endpoint calls made on the page with theire response codes

Config file when you have deferent projects profiles by default it will run in all the browsers if you dont specify in what browser you want it to run see command below

 npx playwright test tests/ClientAppPOsingledataset.spec.js --config playwright.config1.js --project=safari

Parallel execution
workers mean test files
by default tests run in parallel in a test suite by tests in a test file/worker run sequentially

workers: 1, // this means that you want one test file to run in parallel at a time
tests in one worker file will run in sequence by default not in parallel
test.describe.configure({mode:'parallel'}) // this line will execute tests in this file in parallel
test.describe.configure({mode:'serial'}) // the advantage of adding this is that when tests are dependent if one fails it will not execute others that are dependent on the one that failed

running tests with tags
below means any test with annotation "@API" will be executed
npx playwright test --grep "@API"

Scripts
to run scripts see command below
npm run nameOfScript 

Reporting
 npm i -D @playwright/test allure-playwright

npx playwright test --grep "@API" --reporter=line,allure-playwright
