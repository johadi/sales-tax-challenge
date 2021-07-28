// Print bill, which is a MAP instance, to the console.
exports.outputBill = (bill) => {
    bill.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });
}
