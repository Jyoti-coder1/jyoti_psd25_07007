function getEvenSquares(numbers) {
    return numbers
    .filter(num => num % 2 === 0)
    .map(num => num * num);
}
const numbers = [1, 2, 3, 4, 5, 6];
const result = getEvenSquares(numbers);
console.log(result);