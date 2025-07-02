function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
const original = {
    name: "Alice",
    hobbies: ["reading", "travelling",]
};
const clone = deepClone(original);
clone.hobbies.push("coding");
console.log("Original:", original);
console.log("Clone:", clone);