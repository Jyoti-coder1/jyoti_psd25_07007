// Get the UL elemnt where user name will be displayed
const userList = document.getElementById('userList');

// Fetch user data from JSONPlaceholder API
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json()) // Convert response to JSON
    .then(users => {
        // Loop through each user object
        users.forEach(user => {
            const li = document.createElement('li'); // Create list item
            li.textContent = user.name; // Set user name as list text

            // Add click event to show user's email in an alert
            li.addEventListener('click', () => {
                alert(user.email); // Show email in alert
            });

            userList.appendChild(li); // Add <li> to <ul>
        });
    })
    .catch(error => {
        // Handle and log any error during fetch
        console.error('Error fetching users:', error);
        userList.innerHTML = '<li>Failed to load users.</li>';
});