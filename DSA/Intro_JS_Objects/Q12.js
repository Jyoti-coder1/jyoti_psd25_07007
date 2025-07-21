function findLargest(num1, num2, num3) {
    let largest = (num1 > num2) ? (num1 > num3 ? num1 : num3) : (num2 > num3 ? num2 : num3);
    console.log(largest);
}
findLargest(45, 78, 33);

/* Title:Find Largest of Three Numbers Using Ternary Operator

Problem Statement: Create a program that takes three numbers as input
and determines the largest number using nested ternary operators. You
must solve this problem using only ternary logic without using the
Math.max() function.

Example: let num1 = 45, num2 = 78, num3 = 33;

Output: 78 (The largest number)
*/