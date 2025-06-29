function filterEvenNumbers(arr) {
    return arr.filter(num => num % 2 === 0);
}
function sumOfArray(arr) {
    return arr.reduce((sum, num) => sum + num, 0);
}
function sortAndConcat(arr1, arr2) {
    const sorted1 = [...arr1].sort((a, b) => a - b);
    const sorted2 = [...arr2].sort((a, b) => a - b);
    return sorted1.concat(sorted2);
}
const array1 = [12, 5, 8, 21, 14];
const array2 = [7, 2, 9, 4, 10];
const evenArray1 = filterEvenNumbers(array1);
const evenArray2 = filterEvenNumbers(array2);
const sum1 = sumOfArray(array1);
const sum2 = sumOfArray(array2);
const sortedConcat = sortAndConcat(array1, array2);
console.log("Even numbers from array1:", evenArray1);
console.log("Even numbers from array2:", evenArray2);
console.log("Sum of Array1:", sum1);
console.log("Sum Of Array2:", sum2);
console.log("Sorted and Concatenated array:", sortedConcat);