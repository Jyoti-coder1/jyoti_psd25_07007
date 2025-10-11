const apiURL = 'https://<your-project>.mockapi.io/users'; // Replace with your real MockAPI endpoint
const form = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Fetch and display users (GET)
async function fetchUsers() {
    try {
        const res = await fetch(apiURL);
        const users = await res.json();
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} - ${user.email}`;
            userList.appendChild(li);
        });
    } catch (err) {
        console.error('Error fetching users:', err);
    }
}

// Add new user (POST)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    // Simple duplicate prevention (client-side)
    const existingEmails = [...userList.children].map(li => li.textContent.split(' - ')[1]);
    if (existingEmails.includes(email)) {
        alert('User with this email already exists.');
        return;
    }

    try {
        const res = await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        if (!res.ok) throw new Error('Failed to add user');

        form.reset();
        fetchUsers();
    } catch (err) {
        console.error('Error adding user:', err);
        alert('Something went wrong.');
    }
});

// Initial load
fetchUsers();