// Fixed incorrect id from '#massage' to 'message'
const para = document.getElementById('message');
//Fixed incorrect method name: changed getElementByName to getElementById
const textButton = document.getElementByID('textButton');

//Changed addClickEventListener to addEventListener('click', ...)
textButton.addEventListener('click', () => {
    // Fixed incorrect property : changed contentText to textContent
    para.textContent = 'New Message';
});

const box = document.getElementById('box');
const colorButton = document.getElementById('colorButton');
colorButton.addEventListener('click', () => {
    //Fixed Typo in 'style' object: changed styl to style
    box.style.backgroundColor = 'blue';
});