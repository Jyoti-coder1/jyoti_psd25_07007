//Select "Item 2" by its ID
const item2 = document.getElementById('item2');

//Add click event listener
item2.addEventListener('click', () => {

    //Alert the etxt content of the parent node (<ul>)
    alert(item2.parentNode.textContent);

    //Log the previous sibling (<li id="item1">) text content
    console.log(item2.previousElementSibling.textContent);

    //Log the next sibling (<li id="item3">) text content
    console.log(item2.nextElementSibling.textContent);
});