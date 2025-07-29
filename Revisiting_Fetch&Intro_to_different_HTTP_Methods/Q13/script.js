// Select the DOM elements for error message and product container
const productGrid = document.getElementById('product-grid');
const errorMessage = document.getElementById('error-message');

// Async function to fetch and display products
async function fetchProducts() {
    try {
        // Send a GET request to the FakeStoreAPI
        const response = await fetch('https://fakestoreapi.com/products');

        // If response is not OK (e.g., 404 or 500), throw an error
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }

        // Parse the response JSON
        const products = await response.json();

        // Loop through each product and display it in the grid
        products.forEach(product => {
            // Create product card
            const productCard = document.createElement('div');
            productCard.className = 'product';

            // Fill in product details
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p><strong>$${product.price}</strong></p>
                <button>View Details</button>
            `;

            // Add card to the grid
            productGrid.appendChild(productCard);
        });
    }
    catch (error) {
        // If any error occurs, show a user-friendly message
        errorMessage.textContent = 'Failed to fetch products. Please try again later.';
        console.error('Fetch error:', error); // For debugging
    }
}

// Call the function to fetch products on page load
fetchProducts();