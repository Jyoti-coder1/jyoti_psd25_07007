// index.js

const factorial = require('./factorial');

// Values to calculate factorial for
const numbers = [5, 7, 10, -3, "abc", 0];

numbers.forEach(num => {
    const result = factorial(num);
    console.log(
        typeof result === "number" ? `Factorial of ${num} is: ${result}` : result
    );
});