function numberOfWish(N, S) {
    let freq = {};
    for (let i = 0; i < N; i++) {
        let ch = S[i];
        if (freq[ch]) {
            freq[ch]++;
        }
        else {
            freq[ch] = 1;
        }
    }
    let w = freq['w'] || 0;
    let i_ = freq['i'] || 0;
    let s = freq['s'] || 0;
    let h = freq['h'] || 0;
    let min = w;
    if (i_ < min) {
        min = i_;
    }
    if (s < min) {
        min = s;
    }
    if (h < min) {
        min = h;
    }
    console.log(min);
}
numberOfWish(7, "wishash");
numberOfWish(8, "wishwish");

/*Number of wish

Description
You are given an string of size N, of characters from 'a' to 'z'.
You need to print number of times you can make "wish", using characters
from string. You can use a character only once from the string.
[UseKey-Value pair based data structure]

Input Description
First line contains T, no of test cases. First line of each test case
contains N, size of string Second line of each test case contains
string S.

Constraints
1 <= T <= 10
1 <= N <= 10 ^ 6

Output Description
For each test case, print number of times you can make "wish"
*/