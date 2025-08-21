import { useContext } from "react";
import ThemeContext from "./ThemeContext";

function ThemedBox() {
    const theme = useContext(ThemeContext);

    return (
        <div className={`themed-box ${theme}`}>
            <p>Current Theme: {theme}</p>
        </div>
    );
}
export default ThemedBox;