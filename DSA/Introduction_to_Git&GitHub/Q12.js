function sumOfSquares(n) {
    let sum = 0;
    while (n > 0) {
        let digit = n % 10;
        sum += digit * digit;
        n = Math.floor(n / 10);
    }
    return sum;
}
function isHappy(n) {
    let seen = new Set();
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = sumOfSquares(n);
    }
    return n === 1;
}
let num = 19;
console.log(isHappy(num));

/*Title: Happy number

Problem Statement:Write an algorithm to determine if a number n is happy.
A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of
the squares of its digits.

Repeat the process until the number equals 1 (where it will stay), or
it loops endlessly in a cycle which does not include 1.

Those numbers for which this process ends in 1 are happy.

**Hint** n = 19
1 ^ 2 + 9 ^ 2 = 82
8 ^ 2 + 2 ^ 2 = 68
6 ^ 2 + 8 ^ 2 = 100
1 ^ 2 + 0 ^ 2 + 0 ^ 2 = 1 
*/