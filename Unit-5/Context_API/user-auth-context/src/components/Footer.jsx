import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

function Footer() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <footer className="footer">
            {isAuthenticated ? "Welcome, User" : "Please log in"}
        </footer>
    );
}

export default Footer;