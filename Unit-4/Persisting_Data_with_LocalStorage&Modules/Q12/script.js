// Get references to DOM elements
const themeSelector = document.getElementById("themeSelector");
const body = document.body;

// Function to apply the selected theme
function applyTheme(theme) {
    // Remove existing theme classes
    body.classList.remove("light", "dark", "blue");
    
    // Add the new theme class
    body.classList.add(theme);
}

// Load saved theme from sessionStorage (if any)
const savedTheme = sessionStorage.getItem("theme");

// If a theme was saved in session, apply it
if (savedTheme) {
    applyTheme(savedTheme);
    themeSelector.value = savedTheme; // Set dropdown value
}
else {
    applyTheme("light"); // Default to light theme
}

// When dropdown changes, update theme and save to sessionStorage
themeSelector.addEventListener("change", function () {
    const selectedTheme = this.value;
    applyTheme(selectedTheme);
    sessionStorage.setItem("theme", selectedTheme); // Save theme for session
});