const API_BASE = 'https://fakestoreapi.com';
const productGrid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortOrder = document.getElementById('sortOrder');
const productCount = document.getElementById('productCount');

let allProducts = [];

// Fetch categories
async function loadCategories() {
    const res = await fetch(`${API_BASE}/products/categories`);
    const categories = await res.json();
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categoryFilter.appendChild(option);
    });
}

// Fetch products
async function loadProducts() {
    const res = await fetch(`${ API_BASE}/products`);
    allProducts = await res.json();
    updateDisplay();
}

// Update displayed products based on filters
function updateDisplay() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedSort = sortOrder.value;

    let filtered = allProducts.filter(p =>
        p.title.toLowerCase().includes(searchTerm)
    );

    if (selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedSort === 'asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    productCount.textContent = `Total Products: ${filtered.length}`;
    displayProducts(filtered);
}

// Render product cards
function displayProducts(products) {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h4>${product.title}</h4>
      <p><strong>$${product.price}</strong></p>
    `;
        productGrid.appendChild(card);
    });
}

// Event Listeners
searchInput.addEventListener('input', updateDisplay);
categoryFilter.addEventListener('change', updateDisplay);
sortOrder.addEventListener('change', updateDisplay);

// Initialize
loadCategories();
loadProducts();