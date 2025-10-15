const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let onlineUsers = [];
let chatHistory = [];

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("register", (username, isAdmin) => {
        socket.username = username;
        socket.isAdmin = isAdmin || false;

        if (!onlineUsers.includes(username)) onlineUsers.push(username);
        io.emit("onlineUsers", onlineUsers);

        socket.emit("chatHistory", chatHistory);
    });

    socket.on("sendMessage", (msg) => {
        const messageObj = {
            user: socket.username,
            message: msg,
            timestamp: new Date().toLocaleTimeString(),
            isAdmin: socket.isAdmin
        };

        chatHistory.push(messageObj);
        io.emit("newMessage", messageObj);
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user !== socket.username);
        io.emit("onlineUsers", onlineUsers);
        console.log(`${socket.username} disconnected`);
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});