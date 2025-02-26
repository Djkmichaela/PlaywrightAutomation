const ExcelJs = require('exceljs');
const {test,expect} =require('@playwright/test');
async function writeExcelTest(searchText, replaceText,change, filePath) {


    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');

    const output = await readExcel(worksheet, searchText);
    //writing in a cell
    const cell = worksheet.getCell(output.row, output.col+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath)
}

async function readExcel(worksheet, searchText) {

    let output = { row: -1, col: -1 };
    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {

                output.row = rowNumber;
                output.col = colNumber;
            }

        })
    })
    return output;
}

//writeExcelTest('Papaya', '400',{rowChange:0,colChange:2} ,'/Users/030200082025/Downloads/download.xlsx');

test('Upload download excel validation',async ({page})=>{
  const textSearch ='Papaya';
const  updateValue = 1907;
 await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
 const  downloadPromise =  page.waitForEvent('download');
await page.getByRole("button",{name:'Download'}).click();
await downloadPromise;  /**downloading didnt work so well need find a way to delay the execution better */

writeExcelTest(textSearch, updateValue,{rowChange:0,colChange:2} ,'/Users/030200082025/Downloads/download.xlsx');
await page.locator('#fileinput').click();
// for upload to work your componente needs to have type="file" or else it will not work
await page.locator('#fileinput').setInputFiles('/Users/030200082025/Downloads/download.xlsx')

//const textLocator =await page.getByText(textSearch);
const desiredRow = await page.getByRole('row').filter({hasText:textSearch}); // if you wanna use has instead of hastext you need to first get by text
 expect(desiredRow.locator('#cell-4-undefined')).toContainText(String(updateValue));

})
