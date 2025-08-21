import { useState } from "react";
import ThemeContext from "./ThemeContext";
import ThemedBox from "./ThemedBox";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value = {theme}>
      <div className="app">
        <button onClick={toggleTheme} className="toggle-btn">Toggle Theme</button>
      </div>
      <ThemedBox />
    </ThemeContext.Provider>
  );
}

export default App;
