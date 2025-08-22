import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="navbar">
            <div className="brands">BlogApp</div>
            <nav className="navlinks">
                <NavLink to="/" end>Home</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    );
}