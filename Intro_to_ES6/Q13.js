let people = [{name: "Alice", address: {city: "New York", street: {name: "Broadway", number: 123}}}, {name: "Bob", address: {city: "Los Angeles", street: {name: "Sunset Boulevard", number: 456}}}];
let result = [];
for (let i = 0; i < people.length; i++) {
  let {name, address: {city, street: {name: streetName}}} = people[i];
  let sentence = name + " lives in " + city + " on " + streetName;
  result.push(sentence);
}
console.log(result);