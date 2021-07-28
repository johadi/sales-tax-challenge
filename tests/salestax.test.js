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
});