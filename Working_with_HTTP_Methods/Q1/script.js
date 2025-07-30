const BASE_URL = 'https://6888d771adf0e59551bba17f.mockapi.io/products';

// Select DOM elements
const categorySelect = document.getElementById('category');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const searchBtn = document.getElementById('searchBtn');
const productList = document.getElementById('productList');
const statusBox = document.getElementById('status');

// Search button event
searchBtn.addEventListener('click', () => {
    const category = categorySelect.value.trim();
    const minPrice = minPriceInput.value || 0;
    const maxPrice = maxPriceInput.value || 1000000;

    fetchProducts(category, minPrice, maxPrice);
});

// Fetch products based on filters
async function fetchProducts(category, min, max) {
    statusBox.textContent = "Loading...";
    productList.innerHTML = "";

    let url = `${BASE_URL}?price_gte=${min}&price_lte=${max}`;
    if (category) {
        url += `&category=${category}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const products = await response.json();

        if (products.length === 0) {
            statusBox.textContent = "No products found.";
        }
        else {
            statusBox.textContent = "";
            displayProducts(products);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        statusBox.textContent = "Failed to load products.";
    }
}

// Display product cards
function displayProducts(products) {
    productList.innerHTML = products.map(product => `
    <div class="card">
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
    </div>
  `).join('');
}