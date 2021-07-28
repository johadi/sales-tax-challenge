
// bill parameter is a MAP instance
exports.getItemValue = (bill, name, quantity) => {
    if(name && !quantity) {
        return bill.get(name);
    }

    return bill.get(`${quantity} ${name}`);
}
