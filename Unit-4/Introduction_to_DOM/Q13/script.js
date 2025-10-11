//select all required elements
const colorInput = document.getElementById("colorInput");
const textInput = document.getElementById("textInput");
const box = document.getElementById("box");

//Change background color
document.getElementById("changeColorBtn").addEventListener("click", () => {
    const color = colorInput.value; //get color from input
    box.style.backgroundColor = color; //Apply it

    //Check if color actually applied
    if (box.style.backgroundColor === "") {
        alert("Invalid color name!");
    }
});

//Update the text inside the box
document.getElementById("updateTextBtn").addEventListener("click", () => {
    const text = textInput.value;
    if (text === "") {
        alert("Please enter some text!");
    }
    else {
        box.textContent = text; //Set new text
    }
});