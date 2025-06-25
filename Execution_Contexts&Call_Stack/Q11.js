let age = 25;
function displayAge() {
    console.log("Age inside displayAge:", age);
}
function changeAge() {
    age = 30;
    console.log("Age inside changeAge(after update):", age);
}
console.log("Age in Global Context(before):", age);
displayAge();
changeAge();
console.log("Age in Global Context(after):", age);