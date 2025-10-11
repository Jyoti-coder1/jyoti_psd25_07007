//Select buttons and container div
const addBtn = document.getElementById('addBtn');
const removeBtn = document.getElementById('removeBtn');
const container = document.getElementById('paragraphContainer');

//Add event listener to "Add Paragraph" button
addBtn.addEventListener('click', () => {
    // Create a new <p> element
    const paragraph = document.createElement('p');

    //set the etxt content of the paragraph
    paragraph.textContent = 'This is the new paragraph.';

    //Append the paragraph to the container
    container.appendChild(paragraph);
});

//Add event listener to "Remove Last Paragraph" button
removeBtn.addEventListener('click', () => {
    //Get the last child element of the container
    const lastParagraph = container.lastElementChild;

    //if there is a paragph to remove, remove it
    if (lastParagraph) {
        container.removeChild(lastParagraph);
    }
});