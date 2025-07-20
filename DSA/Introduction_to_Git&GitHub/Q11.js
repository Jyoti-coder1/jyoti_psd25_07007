let num = 971;
let reversed =  0;
while(num > 0) {
    let digit = num % 10;
    reversed = reversed *10 + digit;
    num = Math.floor(num / 10);
}
console.log(reversed);

/*Title: Reverse the Number
Problem Statement: You are given a number stored in a variable with the
name num.You have to reverse the number Fo example, the number stored in
the variable num = 971, then the required output will be 179

Note: The number does not contain any leading zeroes*/