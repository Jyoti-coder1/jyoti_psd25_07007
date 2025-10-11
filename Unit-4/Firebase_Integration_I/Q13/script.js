const firebaseURL = 'https://console.firebase.google.com/my-firebase-crud-dee78/UserDashboardApp';

const feedbackForm = document.getElementById('feedbackForm');
const feedbackTable = document.querySelector('#feedbackTable tbody');

const editModal = document.getElementById('editModal');
const editForm = document.getElementById('editForm');
const editUsername = document.getElementById('editUsername');
const editMessage = document.getElementById('editMessage');
const closeModal = document.getElementById('closeModal');

let currentEditId = null;

// Submit new feedback
feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;

    const response = await fetch(`${firebaseURL}.json`, {
        method: 'POST',
        body: JSON.stringify({ username, message }),
        headers: { 'Content-Type': 'application/json' }
    });

    feedbackForm.reset();
    loadFeedbacks();
});

// Load and display feedbacks
async function loadFeedbacks() {
    const response = await fetch(`${firebaseURL}.json`);
    const data = await response.json();

    feedbackTable.innerHTML = '';
    for (let id in data) {
        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${data[id].username}</td>
      <td>${data[id].message}</td>
      <td>
        <button onclick="openEditModal('${id}', '${data[id].username}', '${data[id].message}')">Edit</button>
      </td>
    `;
        feedbackTable.appendChild(row);
    }
}

// Open edit modal
function openEditModal(id, username, message) {
    currentEditId = id;
    editUsername.value = username;
    editMessage.value = message;
    editModal.style.display = 'flex';
}

// Close modal
closeModal.addEventListener('click', () => {
    editModal.style.display = 'none';
});

// Update feedback
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedData = {
        username: editUsername.value,
        message: editMessage.value
    };

    await fetch(`${firebaseURL}/${currentEditId}.json`, {
        method: 'PATCH',
        body: JSON.stringify(updatedData),
        headers: { 'Content-Type': 'application/json' }
    });

    editModal.style.display = 'none';
    loadFeedbacks();
});

window.onload = loadFeedbacks;