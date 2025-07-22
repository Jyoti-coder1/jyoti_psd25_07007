function nobitaFrequency(n, str) {
    let freq = {};
    for (let char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    let minFreq = Infinity;
    for (let key in freq) {
        if (freq[key] < minFreq) {
            minFreq = freq[key];
        }
    }
    let minChar = null;
    for (let key in freq) {
        if (freq[key] === minFreq) {
            if (minChar === null || key < minChar) {
                minChar = key;
            }
        }
    }
    console.log(minChar);
}
nobitaFrequency(6, "abcbaa");
nobitaFrequency(19, "vfwppatiwgrstdsgery");

/* Nobita & Frequecy 2

Description
Nobita is given a number N (length of the string) and a string, and he
needs to answer the character which is present in the string and has the
lowest frequency, i.e. suppose you have a string "abbca", in this
string the frequency of characters are as follow:
a = 2
b = 2
c = 1

Frequency of a character is the number of time they occur in a string.
If there are multiple characters with lowest frequency then output the
character which occurs first in alphabetical order, example: "abcb", in
this string 'a' and 'c' both occurs only
1 time, output will be 'a' as 'a' comes before 'c' in alphabetical order.

Note: All characters of the input string are lowercase English alphabet.

Input Description
Input Format:
First line of input contains the number N, denoting the length of the string.
Second line of input contains the string.
Constraints: 1 <= N <= 50

Output Description
Output the character which has lowest frequency and present in the
given string.
*/