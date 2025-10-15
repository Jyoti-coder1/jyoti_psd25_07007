const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("userLoggedIn", (username) => {
    console.log(`> User ${username} logged in`);
});

eventEmitter.on("messageReceived", (username, message) => {
    console.log(`> ${username} received message: "${message}"`);
});

eventEmitter.on("dataSynced", (username) => {
    console.log(`> Data sync complete for ${username}`);
});

eventEmitter.on("userLoggedOut", (username) => {
    console.log(`> User ${username} logged out`);
});

eventEmitter.on("errorOccurred", (err) => {
    console.log(`> Error: ${err}`);
});

function simulateUserActivity(username) {
    setTimeout(() => eventEmitter.emit("userLoggedIn", username), 1000);

    setTimeout(() =>
        eventEmitter.emit("messageReceived", username, "Welcome to the system!"),
        2000);

    setTimeout(() => {
        console.log(`> Syncing data for ${username}...`);
        eventEmitter.emit("dataSynced", username);
    }, 3000);

    setTimeout(() => eventEmitter.emit("userLoggedOut", username), 4000);
}

const users = ["John", "Alice", "Bob"];
users.forEach(simulateUserActivity);

setInterval(() => {
    eventEmitter.emit("dataSynced", "John");
}, 15000);