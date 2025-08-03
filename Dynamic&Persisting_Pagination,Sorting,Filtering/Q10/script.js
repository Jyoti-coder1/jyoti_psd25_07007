// Constants for API base URL and pagination
const API_URL = "https://jsonplaceholder.typicode.com/users";
const LIMIT = 6; // Number of users per page

// DOM elements
const userContainer = document.getElementById("user-container");
const paginationContainer = document.getElementById("pagination-buttons");

// Fetch and display users for a given page
async function fetchUsers(page = 1) {
    try {
        // Fetch users with pagination
        const res = await fetch(`${API_URL}?_page=${page}&_limit=${LIMIT}`);

        // Error handling for failed fetch
        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        displayUsers(data); // Display fetched users
    } catch (err) {
        userContainer.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
}

// Display user data inside the container
function displayUsers(users) {
    userContainer.innerHTML = ""; // Clear previous users

    // Create a user card for each user
    users.forEach(user => {
        const card = document.createElement("div");
        card.className = "user-card";
        card.innerHTML = `
            <h3>${user.name}</h3>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>City:</strong> ${user.address.city}</p>
        `;
        userContainer.appendChild(card);
    });
}

// Create pagination buttons (2 pages, since there are only 10 users total)
function createPaginationButtons(totalPages = 2) {
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = `Page ${i}`;
        btn.addEventListener("click", () => fetchUsers(i)); // On click, fetch page data
        paginationContainer.appendChild(btn);
    }
}

// Initial setup: fetch first page & create buttons
fetchUsers(1); // Fetch page 1 on load
createPaginationButtons(2); // Since only 10 users exist, 2 pages with limit=6