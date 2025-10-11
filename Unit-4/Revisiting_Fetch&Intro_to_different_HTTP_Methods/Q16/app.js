//Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCSXgYAt1x5ZkCO2KHadJQ3D3dD3jpdNP0",
    authDomain: "my-firebase-crud-dee78.firebaseapp.com",
    databaseURL: "https://my-firebase-crud-dee78-default-rtdb.firebaseio.com",
    projectId: "my-firebase-crud-dee78",
    storageBucket: "my-firebase-crud-dee78.appspot.com",
    messagingSenderId: "1003685141784",
    appId: "1:1003685141784:web:76f2a451bce379b97e526d"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM elements
const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const userList = document.getElementById("userList");
const loading = document.getElementById("loading");

// Show/Hide loading
function showLoading() {
    loading.style.display = "block";
}
function hideLoading() {
    loading.style.display = "none";
}

// Read users from Firebase
function fetchUsers() {
    showLoading();
    db.ref("users").on("value", (snapshot) => {
        userList.innerHTML = "";
        const users = snapshot.val();
        if (users) {
            Object.keys(users).forEach((id) => {
                const { name, email } = users[id];

                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                li.innerHTML = `
                        <span>${name} (${email})</span>
                        <div>
                        <button class="btn btn-sm btn-warning me-2" onclick="editUser('${id}', '${name}', '${email}')">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteUser('${id}')">Delete</button>
                        </div>
                    `;
                userList.appendChild(li);
            });
        }
        hideLoading();
    });
}

// Add user
userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    showLoading();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const newUserRef = db.ref("users").push();
    newUserRef.set({ name, email }, () => {
        hideLoading();
        userForm.reset();
    });
});

// Edit user (prompt modal)
function editUser(id, name, email) {
    const newName = prompt("Edit Name:", name);
    const newEmail = prompt("Edit Email:", email);
    if (newName && newEmail) {
        showLoading();
        db.ref("users/" + id).set({ name: newName, email: newEmail }, () => {
            hideLoading();
        });
    }
}

// Delete user
function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        showLoading();
        db.ref("users/" + id).remove(() => {
            hideLoading();
        });
    }
}

// Initial fetch
fetchUsers();