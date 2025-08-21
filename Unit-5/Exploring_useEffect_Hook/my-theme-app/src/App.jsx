import { useState, useEffect } from "react";
import ThemedBox from "./ThemedBox";
import "./App.css";

function ThemeApp() {
  const [theme, setTheme] = useState("light");
  // Load theme from localStorage when app starts
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className={`app-container ${theme}`}>
      <h1>Theme Toggle App</h1>
      <button onClick={toggleTheme}>
        Toggle to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
      {/* Render multiple boxes */}
      <ThemedBox theme={theme} />
      <ThemedBox theme={theme} />
      <ThemedBox theme={theme} />
    </div>
  );
}
export default ThemeApp;
