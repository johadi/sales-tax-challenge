# Sales Tax Challenge
## General Requirements
- Use either Ruby or Javascript. If you feel more comfortable with another language, please let us know and we can discuss.
- Do not use any external libraries to solve this problem. You may only use external libraries or tools for building or testing purposes (e.g., Rspec, Jest, Mocha, etc.).
- Include detailed instructions on how to run the application and an explanation of assumptions you make (if any)


**IMPORTANT:**  
Please limit the amount of time you spend on the problem to **4 hours**. If you haven't completed the challenge within the allotted time, please submit the work you have completed. Focus on implementing the requirements with the best code you can produce within the given timeframe.


## Problem Statement

This problem requires some kind of input. You are free to implement any mechanism for feeding the input into your solution. You should provide sufficient evidence that your solution is complete by, as a minimum, indicating that it works correctly against the supplied test data.

**Basic sales tax** is applicable at a rate of **10%** on all goods, **except** books, food, and medical products that are exempt. **Import duty** is an additional sales tax applicable on all imported goods at a rate of 5%, with no exemptions.

When I purchase items I receive a receipt which lists the name of all the items and their price (including tax), finishing with the total cost of the items, and the total amounts of sales taxes paid. The rounding rules for sales tax are that for a tax rate of n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of sales tax.


Write an application that prints out the receipt details for these shopping baskets:

### Input

#### Input 1:
```
2 book at 12.49
1 music CD at 14.99
1 chocolate bar at 0.85
```

#### Input 2:
```
1 imported box of chocolates at 10.00
1 imported bottle of perfume at 47.50
```

#### Input 3:
```
1 imported bottle of perfume at 27.99
1 bottle of perfume at 18.99
1 packet of headache pills at 9.75
3 imported boxes of chocolates at 11.25
```

### Output

#### Output 1:
```
2 book: 24.98
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 42.32
```

#### Output 2:
```
1 imported box of chocolates: 10.50
1 imported bottle of perfume: 54.65
Sales Taxes: 7.65
Total: 65.15
```

#### Output 3:
```
1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
3 imported box of chocolates: 35.55
Sales Taxes: 7.90
Total: 98.38
```

## Assumptions
* The input files are in json format which are arrays of items. A typical item inside the json array has the following structure:
```json
{
    "name": "book",
    "price": 12.49,
    "quantity": 2,
    "category": "book",
    "imported": false
}
```

* The exempted categories are also placed inside a json file `exempted.json`. It is just an array of exempted categories in string:
```json
[
  "book",
  "food",
  "medicine"
]
```


* Below is what the files look like inside the `inputs` folder within the project directory:

 ### input files
* input1.json
* input2.json
* input3.json

 ### exempted file
* exempted.json

## How to run the project
* The project is in JavaScript and should be run on a `NodeJS` environment.
* Navigate to the project directory as shown below:
```
cd sales-tax-challenge
```
* Run the command below to start the application:
```
node app.js
```
or
```
npm start
```

## Running tests

* `Mocha` is installed as the test runner.
* `Chai` is the assertion library

The test file is located within the `tests` folder in the project's root folder.

Install the test dependencies with the following command:

```bash
npm install
```
Run the following command  for the tests:
```bash
npm run test
```

## Author
Jimoh Hadi
