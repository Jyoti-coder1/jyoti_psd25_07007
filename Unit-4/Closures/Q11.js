function outerFunction() {
    let message = "Hello from Closures!";
    function innerFunction() {
        console.log(message);
    }
    return innerFunction;
}
const closureFunc = outerFunction();
closureFunc();