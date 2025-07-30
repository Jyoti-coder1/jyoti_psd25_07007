document.getElementById("registrationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageDiv = document.getElementById("message");

    if (!name || !email || !password) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Please fill all fields.";
        return;
    }

    const userData = {
        name,
        email,
        password
    };

    try {
        const response = await fetch("https://mockapi.io/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            messageDiv.style.color = "green";
            messageDiv.textContent = "Registration successful!";
            document.getElementById("registrationForm").reset();
        }
        else {
            const errorData = await response.json();
            messageDiv.style.color = "red";
            messageDiv.textContent = errorData.message || "Registration failed. Try again.";
        }
    }
    catch (error) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Network error. Try again later.";
    }
});