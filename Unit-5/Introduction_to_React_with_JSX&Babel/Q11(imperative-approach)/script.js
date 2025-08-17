//Imperative: Step by step DOM Manipulation.Tell browser how to do step by step (create element- set text- append)
const pElement = document.createElement("p");
pElement.textContent = "Hello, World!";
document.body.appendChild(pElement);