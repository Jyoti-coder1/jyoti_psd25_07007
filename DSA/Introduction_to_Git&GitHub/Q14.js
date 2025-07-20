function printPattern(N) {
    let result = "";
    for (let i = 0; i < N; i++) {
        result += "* ";
    }
    result += "\n";
    for (let i = 1; i < N - 1; i++) {
        result += "*\n";
    }
    if (N > 1) {
        for (let i = 0; i < N; i++) {
            result += "* ";
        }
    }
    console.log(result);
}
let N = 5;
printPattern(N);

/*
Title:Pattern Printing III

Problem Statement:

You are given a number stored in a variable with the name N You have to
print the pattern as shown below according value stored in N For example,
consider the value stored in N = 5, then the required pattern will be.

* * * * *

*

*

*

* * * * *
*/