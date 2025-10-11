// Reference to DOM elements
const userList = document.getElementById('user-list');
const sortSelect = document.getElementById('sort-select');
const errorDiv = document.getElementById('error');

// Base API URL
const API_URL = 'https://jsonplaceholder.typicode.com/users';

// Fetch and display users with optional sort
async function fetchAndDisplayUsers(sortOrder = '') {
    try {
        // Clear previous data
        userList.innerHTML = '';
        errorDiv.textContent = '';

        // Fetch user data from API
        const res = await fetch(API_URL);
        const data = await res.json();

        // Sort data based on name if sortOrder is provided
        if (sortOrder === 'asc') {
            data.sort((a, b) => a.name.localeCompare(b.name));
        }
        else if (sortOrder === 'desc') {
            data.sort((a, b) => b.name.localeCompare(a.name));
        }

        // Display each user
        data.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>City: ${user.address.city}</p>
            `;
            userList.appendChild(userCard);
        });
    }
    catch (error) {
        // Show error message if fetch fails
        errorDiv.textContent = 'Failed to load users. Please try again later.';
        console.error('Error fetching users:', error);
    }
}

// Event listener for sorting dropdown
sortSelect.addEventListener('change', () => {
    fetchAndDisplayUsers(sortSelect.value);
});

// Initial fetch on page load
fetchAndDisplayUsers();