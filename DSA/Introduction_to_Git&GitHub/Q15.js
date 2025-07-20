function printPattern(N) {
    let num = 1;
    for (let i = 0; i < N; i++) {
        let row = "";
        for (let j = 0; j < N; j++) {
            row += num + " ";
            num++;
        }
        console.log(row);
    }
}
let N = 3;
printPattern(N);

/*Title:Pattern of N

**Problem Statement: **

You are given a number stored in a variable with the name N You have to
print all the numbers in the range from 1 to N*N such that there are 
exactly N numbers on each line.

For example, if the value stored inN = 3, then all the numbers in the
range, from [1,9] need to be printed, such that there are 3 numbers on
each line. Therefore, the required output is

1 2 3

4 5 6

7 8 9
*/