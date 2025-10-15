const socket = io();

const joinBtn = document.getElementById("joinBtn");
const usernameInput = document.getElementById("username");
const isAdminCheckbox = document.getElementById("isAdmin");
const chatContainer = document.getElementById("chatContainer");
const messagesDiv = document.getElementById("messages");
const onlineUsersUl = document.getElementById("onlineUsers");
const msgInput = document.getElementById("msgInput");
const sendBtn = document.getElementById("sendBtn");
const disconnectBtn = document.getElementById("disconnectBtn");

joinBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    const isAdmin = isAdminCheckbox.checked;
    if (!username) return alert("Enter your name");

    socket.emit("register", username, isAdmin);
    chatContainer.style.display = "block";
});

socket.on("onlineUsers", (users) => {
    onlineUsersUl.innerHTML = "";
    users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user;
        onlineUsersUl.appendChild(li);
    });
});

socket.on("chatHistory", (history) => {
    messagesDiv.innerHTML = "";
    history.forEach(displayMessage);
});

socket.on("newMessage", displayMessage);

function displayMessage(msgObj) {
    const p = document.createElement("p");
    p.innerHTML = `<strong>${msgObj.isAdmin ? "Admin" : msgObj.user}</strong> [${msgObj.timestamp}]: ${msgObj.message}`;
    messagesDiv.appendChild(p);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

sendBtn.addEventListener("click", () => {
    const msg = msgInput.value.trim();
    if (!msg) return;
    socket.emit("sendMessage", msg);
    msgInput.value = "";
});

disconnectBtn.addEventListener("click", () => {
    socket.disconnect();
    chatContainer.style.display = "none";
});