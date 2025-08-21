import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

function Sidebar() {
    const { isLoggedIn } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    if (!isLoggedIn) return null;

    return (
        <div className={`sidebar ${theme}`}>
            <h3>Welcome User!</h3>
        </div>
    );
}

export default Sidebar;