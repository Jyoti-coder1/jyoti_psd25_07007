import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar({ toggleTheme, theme }) {
    const { state, logout } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            {!state.isAuthenticated ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <button onClick={logout}>Logout</button>
            )}
            <button onClick={toggleTheme}>
                {theme === "light" ? "Dark" : "Light"}
            </button>
        </nav>
    );
}

export default Navbar;