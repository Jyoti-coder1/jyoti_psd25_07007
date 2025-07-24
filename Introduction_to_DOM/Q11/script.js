// Select the <h1> by its id and change its text
document.getElementById('main-heading').textContent = "Welcome to the DOM World!";

// Select all <p> elements and change their text color to blue
const paragraphs = document.getElementsByTagName('p');
for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].style.color = 'blue';
}

// Select the first <div> with class "container" and change its background color
const containerDiv = document.querySelector('.container');
containerDiv.style.backgroundColor = 'yellow';