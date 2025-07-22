function mapCharAndSum(N,K,str) {
    // Write code here
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let sum = 0;
    for (let i = 0; i < K; i++) {
      let ch = str[i];
      for(let j = 0; j < 26; j++) {
        if (alphabet[j] === ch) {
          sum += N + j;
          break;
        }
      }
    }
    console.log(sum);
}

mapCharAndSum(30, 3, "abc");
mapCharAndSum(25, 5, "eyvss");
mapCharAndSum(29, 2, "wc");

/* Map Characters & sum

Description
You are given a number stored in a variable with the name N
You are also, given a string, whose length is stored in a variable with
the name K, and the string is stored in a variable with the name str.
You have to map all lower case English characters, starting from the
value stored in N.
For example, if the value stored in N = 30 , then the mapping of the
characters will be as follows
a-30
b-31
c-32
d-33
e-34
f-35
g-36
h-37
i-38
j-39
k-40
1-41
m-42
n-43
o-44
p-45
q-46
r-47
s-48
t-49
u-50
v-51
w-52
x-53
y-54
z-55

Input Description:
The first line of the input contains the value stored in N.
The second line of the input contains the value stored in K.
The last line of the input contains the value stored in the str.

Output Description
Print the sum of characters, according to the values mapped, as shown
in the problem statement.
*/