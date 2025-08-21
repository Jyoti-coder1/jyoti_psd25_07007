import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../App.css"

function Navbar() {
    const { isAuthenticated, toggleAuth } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <h1>User Authentication App</h1>
            <button onClick={toggleAuth}>{isAuthenticated ? "Logout" : "Login"}</button>
        </nav>
    );
}

export default Navbar;