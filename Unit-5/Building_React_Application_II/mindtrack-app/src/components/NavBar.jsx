import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function NavBar() {
    const { state, actions } = useApp();
    const role = state.user?.role;

    return (
        <nav className="nav">
            <div className="nav-left">
                <span className="brand">MindTrack</span>
                {role === "student" && (
                    <>
                        <Link to="/student/dashboard">Dashboard</Link>
                        <Link to="/student/log">Log Today</Link>
                        <Link to="/student/insights">Insights</Link>
                        <Link to="/student/timeline">Timeline</Link>
                        <Link to="/export">Export</Link>
                    </>
                )}
                {role === "mentor" && <Link to="/mentor">Mentor</Link>}
            </div>
            <div className="nav-right">
                <span className="user-pill">
                    {state.user?.name} · {role}
                </span>
                <button className="btn" onClick={actions.logout}>Logout</button>
            </div>
        </nav>
    );
}