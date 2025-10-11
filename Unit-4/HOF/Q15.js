function getCharacterFrequecy(str) {
    return str
    .trim()
    .toLowerCase()
    .split('')
    .reduce((acc, char) => {
        if(char !== ' ') {
            acc[char] = (acc[char] || 0) + 1;
        }
        return acc;
    }, {});
}
const str = " Hello World! ";
const result = getCharacterFrequecy(str);
console.log(result);