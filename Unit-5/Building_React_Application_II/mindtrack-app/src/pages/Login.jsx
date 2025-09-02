import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Login() {
    const { actions } = useApp();
    const [name, setName] = useState("");
    const [role, setRole] = useState("student");
    const nav = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        const trimmed = name.trim() || (role === "mentor" ? "Mentor" : "Student");
        actions.login(trimmed, role);
        nav(role === "student" ? "/student/dashboard" : "/mentor");
    };

    return (
        <div className="center-card">
            <h1>MindTrack</h1>
            <p className="muted">Student Mental Wellness & Study Habit Journal</p>
            <form onSubmit={submit} className="card">
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
                <label>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="student">Student</option>
                    <option value="mentor">Academic Mentor</option>
                </select>
                <button className="btn primary" type="submit">Enter</button>
            </form>
            <div className="note">
                Tip: Use Student first, add some logs, then switch to Mentor to see anonymized entries.
            </div>
        </div>
    );
}