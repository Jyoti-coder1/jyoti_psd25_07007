function doubleNumbers(numbers) {
    return numbers.map(function(num) {
        return num * 2;
    });
}
const numbers = [1, 2, 3, 4];
const result = doubleNumbers(numbers);
console.log(result);