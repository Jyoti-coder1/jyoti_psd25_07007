import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
    const { state, dispatch } = useContext(ThemeContext);

    return (
        <div className="toggle-container">
            <p>Current Theme: <b>{state.theme}</b></p>
            <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
                Toggle Theme
            </button>
        </div>
    );
}

export default ThemeToggle;