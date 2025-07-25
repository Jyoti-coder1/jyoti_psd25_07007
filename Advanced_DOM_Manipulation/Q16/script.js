// Array of product objects
const products = [
    { id: 1, name: "Product A", price: 60, inStock: true },
    { id: 2, name: "Product B", price: 40, inStock: false },
    { id: 3, name: "Product C", price: 80, inStock: true },
    { id: 4, name: "Product D", price: 10, inStock: false }
];

// Select the container where product cards will be added
const grid = document.getElementById('productGrid');

// Loop through each product
products.forEach(product => {
    // Create a new div for the product card
    const card = document.createElement('div');
    card.classList.add('product-card'); // Add common styling

    // Apply conditional background color based on stock status
    if (product.inStock) {
        card.classList.add('in-stock'); // Green for in-stock
    } else {
        card.classList.add('out-of-stock'); // Red for out-of-stock
    }

    // Fill in product details
    card.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: $${product.price}</p>
        <p>Status: ${product.inStock ? 'In Stock' : 'Out of Stock'}</p>
    `;

    // Append the card to the grid container
    grid.appendChild(card);
});