class Tax {
    // private fields
    #salesTaxRate;
    #importTaxRate;
    #exemptedFromTaxRateCategories;

    constructor(salesTaxRate = 0, importTaxRate = 0, exemptedFromTaxRateCategories = []) {
        this.#salesTaxRate = salesTaxRate;
        this.#importTaxRate = importTaxRate;
        this.#exemptedFromTaxRateCategories = exemptedFromTaxRateCategories;
    }

    getSalesTaxRate() {
        return this.#salesTaxRate;
    }

    setSalesTaxRate(value) {
        const parsedValue = Number(value);
        if(isNaN(parsedValue)) {
            throw new Error('Sales Tax rate must be a number');
        }

        if(parsedValue < 0) {
            throw new Error('Sales Tax rate can not be less than 0');
        }

        this.#salesTaxRate = parsedValue;
    }

    computeSalesTaxRate(category) {
        if(typeof category !== 'string') {
            throw new Error('Category can only be a string');
        }

        return this.#exemptedFromTaxRateCategories.includes(category) ? 0 : this.#salesTaxRate;
    }

    getImportTaxRate(){
        return this.#importTaxRate;
    }

    setImportTaxRate(value) {
        const parsedValue = Number(value);

        if(isNaN(parsedValue)) {
            throw new Error('Import Tax rate must be a number');
        }

        if(parsedValue < 0) {
            throw new Error('Import Tax rate can not be less than 0');
        }

        this.#importTaxRate = parsedValue;
    }

    computeImportTaxRate(imported){
        if(typeof imported !== 'boolean') {
            throw new  Error('imported can only be a boolean');
        }

        return imported ? this.#importTaxRate : 0;
    }

    getExemptedFromTaxRateCategories(){
        return this.#exemptedFromTaxRateCategories;
    }

    addToExemptedFromTaxRateCategories(categories) {
        // Add if categories is a string
        if(typeof categories === 'string') {
            this.addToExemptedCategories(categories);
        }

        // If categories is array, verify and add each item
        if(Array.isArray(categories)) {
            categories.forEach((category) => {
                if (typeof category === 'string') {
                    this.addToExemptedCategories(category);
                } else {
                    console.error('Invalid Category');
                }
            })
        }
    }

    addToExemptedCategories(category) {
        if(!this.checkCategoryExist(category)) {
            this.#exemptedFromTaxRateCategories.push(category);
        }
    }

    checkCategoryExist(category) {
        return this.#exemptedFromTaxRateCategories.includes(category);
    }

    calculateTax(item) {
        const itemTaxRate = this.computeSalesTaxRate(item.category) + this.computeImportTaxRate(item.imported);

        return Math.ceil((item.price * itemTaxRate/100)*100/5)*5/100;
    }
}

module.exports = Tax;
