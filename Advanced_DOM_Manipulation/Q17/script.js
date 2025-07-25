//Fetch data from API
fetch('https://fakestoreapi.com/products')
    .then(response => response.json()) //Convert response to JSON
    .then(data => {

        //Call function to display products on page
        displayProducts(data);
    });

//Function to display product cards
function displayProducts(products) {

    //Get the container element to insert product cards
    const grid = document.getElementById('product-grid');

    //Loop through all products
    products.forEach(product => {

        //Create a card element for each product
        const card = document.createElement('div');
        card.classList.add('product-card');

        //Apply conditional styling based on price
        if (product.price > 50) {
            card.classList.add('yellow-border'); //Yellow if price > 50
        }
        else {
            card.classList.add('green-border'); //Green if price ≤ 50
        }

        //Create and set image element
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;

        //Create and set title element
        const title = document.createElement('div');
        title.classList.add('product-title');
        title.textContent = product.title;

        //Create and set price element
        const price = document.createElement('div');
        price.classList.add('product-price');
        price.textContent = `$${ product.price.toFixed(2)}`;

        //Append image, title, and price to card
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);

        //Append card to the main grid container
        grid.appendChild(card);
    });
}