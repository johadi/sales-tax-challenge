const Tax = require('./Tax');

class Bill {
    // private fields
    #items;
    #tax;

    constructor(tax, items) {
        if(!(tax instanceof Tax)) {
            throw new Error('{tax} should be an instance of Tax class');
        }

        if(!Array.isArray(items) && typeof(items) === 'object') {
            items = [items];
        }

        if(!Array.isArray(items)) {
            throw new Error('{items} should be an object or an array of items');
        }

        this.#tax = tax;
        this.#items = items;
    }

    getTax(){
        return this.#tax;
    }

    setTax(value){
        if(!(value instanceof Tax)) {
            throw new Error('{value} should be an instance of Tax class');
        }

        this.#tax = value;
    }

    getItems() {
        return this.#items;
    }

    setItems(value) {
        if(!Array.isArray(value) && typeof(value) === 'object') {
            value = [value];
        }

        if(!Array.isArray(value)) {
            throw new Error('{value} should be an object or an array of items');
        }

        this.#items = value;
    }

    calculateBill() {
        const bill = new Map();
        let salesTaxes = 0;
        let total = 0;

        this.#items.forEach((item) => {
            if(typeof item !== "object") throw new Error("Item should be an object");

            if(item.price < 0) throw new Error("Price cannot be negative");
            if(item.quantity < 0) throw new Error("Quantity cannot be negative");

            const itemTaxValue = this.#tax.calculateTax(item);
            const itemTotalPrice = (item.price + itemTaxValue) * item.quantity;

            bill.set(`${item.quantity} ${item.name}`, this.roundValue(itemTotalPrice, 2));
            salesTaxes = this.roundValue(salesTaxes + itemTaxValue * item.quantity, 2);
            total = this.roundValue(total + itemTotalPrice, 2);
        });

        bill.set('Sales Taxes', salesTaxes);
        bill.set('Total', total);

        return bill;
    }

    roundValue(value, round) {
        return Number((value).toFixed(round));
    }
}

module.exports = Bill;
