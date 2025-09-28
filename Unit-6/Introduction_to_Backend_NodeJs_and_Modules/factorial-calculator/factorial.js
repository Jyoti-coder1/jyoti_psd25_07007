function factorial(n) {
    if (typeof n !== "number") {
        return `${n} is not a number.`;
    }

    if (n < 0) {
        return `Factorial is not defined for negative numbers.`;
    }

    if (n === 0) {
        return 1;
    }

    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }

    return result;
}

module.exports = factorial;