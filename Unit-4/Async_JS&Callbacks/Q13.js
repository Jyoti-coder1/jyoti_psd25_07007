const loaddingInterval = setInterval(() => {
    console.log("Loading...");
}, 1000);
setTimeout(() => {
    clearInterval(loaddingInterval);
    console.log("Loaded successfully");
}, 5000);