// Select the form and response container
const form = document.getElementById('postForm');
const responseDiv = document.getElementById('response');

// Listen for form submission
form.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent page reload

    // Get values from input fields
    const title = document.getElementById('title').value.trim();
    const body = document.getElementById('body').value.trim();

    // Form validation: check that both fields are not empty
    if (title === '' || body === '') {
        responseDiv.innerText = 'Both title and body are required.';
        return;
    }

    // Create the data object to be sent
    const postData = {
        title: title,
        body: body
    };

    try {
        // Send POST request using Fetch API
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        // Parse the response
        const data = await res.json();

        // Display the response dynamically
        responseDiv.innerHTML = `
            <h3>Post Created Successfully</h3>
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Title:</strong> ${data.title}</p>
            <p><strong>Body:</strong> ${data.body}</p>
        `;
    }
    catch (error) {
        // Handle errors
        responseDiv.innerText = 'An error occurred while creating the post.';
        console.error(error);
    }
});