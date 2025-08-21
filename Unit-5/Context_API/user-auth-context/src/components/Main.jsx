import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

function Main() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <main className="main">
            {isAuthenticated ? (
                <p>Yeah, You are logged in!</p>
                ) : (
                <p>Plaese login to continue.</p>
            )}
        </main>
    );
}

export default Main;