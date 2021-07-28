const Tax = require('./src/Tax');
const Bill = require('./src/Bill');

const input1 = require('./inputs/input1.json');
const input2 = require('./inputs/input2.json');
const input3 = require('./inputs/input3.json');
const exempted = require('./inputs/exempted.json');

const { outputBill } = require('./helpers');

const SALES_TAX_RATE = 10;
const IMPORT_DUTY = 5;

const tax = new Tax(SALES_TAX_RATE, IMPORT_DUTY, exempted);

// Input1
console.log('\n******** Output 1 ********** \n');
const input1Bill = new Bill(tax, input1);
const input1CalculatedBill = input1Bill.calculateBill();
outputBill(input1CalculatedBill);

// Input2
console.log('\n******** Output 2 ********** \n');
const input2Bill = new Bill(tax, input2);
const input2CalculatedBill = input2Bill.calculateBill();
outputBill(input2CalculatedBill);

// Input3
console.log('\n******** Output 3 ********** \n');
const input3Bill = new Bill(tax, input3);
const input3CalculatedBill = input3Bill.calculateBill();
outputBill(input3CalculatedBill);
