const isPrime = require('./isPrimed');
const numbers = [2, 10, 17, 21, 29, -5, "abc"];
numbers.forEach(num => {
    console.log(isPrime(num));
});