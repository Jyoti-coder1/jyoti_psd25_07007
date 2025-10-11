function multiplyNumbers(a, b) {
    return (function(x) {
        return this * x;
    }).apply(a, [b]);
}
console.log(multiplyNumbers(7, 8));
console.log(multiplyNumbers(5,7));