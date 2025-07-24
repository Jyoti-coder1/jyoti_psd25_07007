const ul = document.querySelector('#list');
const button = document.querySelector('#add');
button.addEventListener('click', () => {
    const n = ul.children.length + 1;
    ul.innerHTML += `<li>Item ${n}</li>`;
    const li = ul.lastElementChild;
    if (n % 2 === 1) {
        li.style.fontWeight = "bold"; 
        li.style.color = "blue";
    }
    else {
        li.style.fontStyle = "italic";
        li.style.color = "red";
    }
});