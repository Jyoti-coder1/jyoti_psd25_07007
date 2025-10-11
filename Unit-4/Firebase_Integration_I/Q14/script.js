const BASE_URL = "https://console.firebase.google.com/my-firebase-crud-dee78/UserDashboardApp";

// Fetch and render users
const fetchUsers = () => {
    fetch(`${BASE_URL}.json`)
        .then((res) => res.json())
        .then((data) => {
            const tbody = document.querySelector("#userTable tbody");
            tbody.innerHTML = ""; // Clear previous content

            if (data) {
                Object.entries(data).forEach(([key, user]) => {
                    const tr = document.createElement("tr");
                    tr.id = key;

                    tr.innerHTML = `
            <td>${user.name || "N/A"}</td>
            <td>${user.email || "N/A"}</td>
            <td>
              <button onclick="deleteUser('${key}')">Delete</button>
            </td>
          `;

                    tbody.appendChild(tr);
                });
            } else {
                tbody.innerHTML = `<tr><td colspan="3">No users found</td></tr>`;
            }
        })
        .catch((err) => console.error("Error fetching users:", err));
};

// Delete user
const deleteUser = (key) => {
    fetch(`${BASE_URL}/${key}.json`, {
        method: "DELETE",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to delete user");
            }
            return response.json();
        })
        .then(() => {
            console.log("User deleted successfully");
            const row = document.getElementById(key);
            if (row) row.remove();
        })
        .catch((error) => console.error("Error deleting user:", error));
};
// Call fetchUsers on page load
window.onload = fetchUsers;