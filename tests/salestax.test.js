const {assert, expect} = require('chai');
const Bill = require('../src/Bill');
const Tax = require('../src/Tax');

const { getItemValue } = require('./helpers');

describe("Sales Tax with sales tax rate of 10% and import duty of 5%", () => {
    const exemptedCategories  = ['book', 'food','medicine'];
    const salesTaxRate = 10;
    const importDuty = 5;
    const tax = new Tax(salesTaxRate, importDuty, exemptedCategories);

    describe('Testing with Single input', () => {
        describe("An exempted item which is not imported", () =>  {
            it("should have its price unchanged", () =>  {

                const input = {name: "book", price: 12.49, quantity: 1, category: "book", imported: false};
                const bill = new Bill(tax, input);
                const calculatedBill = bill.calculateBill();

                assert.equal(getItemValue(calculatedBill, input.name, input.quantity), 12.49);
                assert.equal(getItemValue(calculatedBill, 'Sales Taxes'), 0);
                assert.equal(getItemValue(calculatedBill, 'Total'), 12.49);
            });
        });

        describe("A non-exempted item which is not imported", () =>  {
            it("should have its price accrued 10% as tax which is rounded to nearest 0.05", function() {

                const input = {name: "Music CD", price: 14.99, quantity: 1, category: "music", imported: false};

                const bill = new Bill(tax, input);
                const calculatedBill = bill.calculateBill();

                assert.equal(getItemValue(calculatedBill, input.name, input.quantity), 16.49);
                assert.equal(getItemValue(calculatedBill, 'Sales Taxes'), 1.5);
                assert.equal(getItemValue(calculatedBill, 'Total'), 16.49);
            });
        });

        describe("An exempted item which is imported", () =>  {
            it("should have its price accrued 5% as tax which is rounded to nearest 0.05", () =>  {

                const input = {name: "imported box of chocolates", price: 10.00, quantity: 1, category: "food", imported: true}

                const bill = new Bill(tax, input);
                const calculatedBill = bill.calculateBill();

                assert.equal(getItemValue(calculatedBill, input.name, input.quantity), 10.50);
                assert.equal(getItemValue(calculatedBill, 'Sales Taxes'), 0.50);
                assert.equal(getItemValue(calculatedBill, 'Total'), 10.50);
            });
        });

        describe("A non-exempted item which is imported", () =>  {
            it("should have its price accrued 15% as tax which is rounded to nearest 0.05", () =>  {

                const input = {name: "imported bottle of perfume", price: 27.99, quantity: 1, category: "perfume", imported: true};

                const bill = new Bill(tax, input);
                const calculatedBill = bill.calculateBill();

                assert.equal(getItemValue(calculatedBill, input.name, input.quantity), 32.19);
                assert.equal(getItemValue(calculatedBill, 'Sales Taxes'), 4.2);
                assert.equal(getItemValue(calculatedBill, 'Total'), 32.19);
            });
        });

        describe("If supplied with negative price or quantity", () =>  {
            it("should throw an error stating \"Price cannot be negative\"", () =>  {

                const input = {name: "imported bottle of perfume", price: -27.99, quantity: 1, category: "perfume", imported: true};

                const bill = new Bill(tax, input);

                expect(bill.calculateBill.bind(bill)).to.throw('Price cannot be negative');
            });

            it('should throw an error stating \'Quantity cannot be negative\'', () =>  {

                const input = {name: "imported bottle of perfume", price: 27.99, quantity: -1, category: "perfume", imported: true};

                const bill = new Bill(tax, input);

                expect(bill.calculateBill.bind(bill)).to.throw('Quantity cannot be negative');
            });
        });
    })

    describe("Testing with combination of inputs", () => {

        describe("input 1", () =>  {
            it("should return Total: 29.83, Sales Taxes: 1.50 with correct individual prices", () =>  {

                const input1 = [
                    {name: "book", price: 12.49, quantity: 2, category: "book", imported: false},
                    {name: "music CD", price: 14.99, quantity: 1, category: "other", imported: false},
                    {name: "chocolate", price: 0.85, quantity: 1, category: "food", imported: false}
                ];

                const bill = new Bill(tax, input1);
                const calculatedBill = bill.calculateBill();

                assert.equal(getItemValue(calculatedBill, input1[0].name, input1[0].quantity), 24.98);
                assert.equal(getItemValue(calculatedBill, input1[1].name, input1[1].quantity), 16.49);
                assert.equal(getItemValue(calculatedBill, input1[2].name, input1[2].quantity), 0.85);

                assert.equal(getItemValue(calculatedBill, 'Sales Taxes'), 1.5);
                assert.equal(getItemValue(calculatedBill, 'Total'), 42.32);
            });
        });


        describe("input 2", () =>  {
            it("should return Total: 65.15, Sales Tax: 7.65 with correct individual prices", () =>  {

                const input2 = [
                    {name: "1 imported box of chocolates", price: 10.00, quantity: 1, category: "food", imported: true},
                    {name: "1 imported bottle of perfume", price: 47.50, quantity: 1, category: "other", imported: true}
                ];

                const bill = new Bill(tax, input2);
                const calculatedBill = bill.calculateBill();

                assert.equal(getItemValue(calculatedBill, input2[0].name, input2[0].quantity), 10.50);
                assert.equal(getItemValue(calculatedBill, input2[1].name, input2[1].quantity), 54.65);

                assert.equal(getItemValue(calculatedBill, 'Sales Taxes'), 7.65);
                assert.equal(getItemValue(calculatedBill, 'Total'), 65.15);
            });
        });


        describe("input 3", () =>  {
            it("should return Total: 74.68, Sales Tax: 6.70 with correct individual prices", () =>  {

                const input3 = [
                    {name: "1 imported bottle of perfume", price: 27.99, quantity: 1, category: "other", imported: true},
                    {name: "1 bottle of perfume", price: 18.99, quantity: 1, category: "other", imported: false},
                    {name: "1 packet of headache pills", price: 9.75, quantity: 1, category: "medicine", imported: false},
                    {name: "1 imported box of chocolates", price: 11.25, quantity: 3, category: "food", imported: true}
                ];

                const bill = new Bill(tax, input3);
                const calculatedBill = bill.calculateBill();

                assert.equal(getItemValue(calculatedBill, input3[0].name, input3[0].quantity), 32.19);
                assert.equal(getItemValue(calculatedBill, input3[1].name, input3[1].quantity), 20.89);
                assert.equal(getItemValue(calculatedBill, input3[2].name, input3[2].quantity), 9.75);
                assert.equal(getItemValue(calculatedBill, input3[3].name, input3[3].quantity), 35.55);

                assert.equal(getItemValue(calculatedBill, 'Sales Taxes'), 7.9);
                assert.equal(getItemValue(calculatedBill, 'Total'), 98.38);
            });
        });
    });
});
