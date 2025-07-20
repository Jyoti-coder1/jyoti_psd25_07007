function sumOfSquares(n) {
    let left = 0;
    let right = Math.floor(Math.sqrt(n));
    while (left <= right) {
        let sum = left * left + right * right;
        if (sum === n) {
            return true;

        }
        else if (sum < n) {
            left++;
        }
        else {
            right--;
        }
    }
    return false;
}
console.log(sumOfSquares(25));
console.log(sumOfSquares(7));

/*
Title: Sum of square number

Problem Statement: Given a non-negative integerk, decide whether there
are two integers a and b such that a^2+b^2= k.

Hint: In the first sample test case, the value stored is = 25
for the values a = 3, b = 4, the sum of square = a*a + b*b= 3*3 + 4*4
= 25,which is equal to 25
Thus the output is true.

In the second sample test case, the value stored is = 7
there is no value of a and b exists, which will be equal to c = 7
Thus the output is false.
*/