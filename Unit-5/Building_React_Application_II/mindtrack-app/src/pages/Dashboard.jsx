import { useNavigate, Link } from "react-router-dom";
import { useApp, calcStreak } from "../context/AppContext.jsx";
import Heatmap from "../components/Heatmap.jsx";

export default function Dashboard() {
    const { state } = useApp();
    const nav = useNavigate();

    const myEntries = state.entries
        .filter((e) => e.owner === state.user.name)
        .sort((a, b) => (a.date < b.date ? 1 : -1));

    const streak = calcStreak(myEntries);

    return (
        <div className="page">
            {state.ui.banner && (
                <div className="banner">
                    {state.ui.banner} <button className="btn link" onClick={() => nav("/student/log")}>Log now</button>
                </div>
            )}
            <h2>Welcome, {state.user.name} 👋</h2>
            <div className="grid-2">
                <div className="card">
                    <h3>Today</h3>
                    <p>Keep your momentum going.</p>
                    <Link to="/student/log" className="btn primary">Log Today’s Entry</Link>
                    <div className="streak">🔥 Streak: <b>{streak}</b> day{streak === 1 ? "" : "s"}</div>
                </div>
                <div className="card">
                    <h3>Monthly Heatmap</h3>
                    <Heatmap entries={myEntries} />
                </div>
            </div>

            <div className="card">
                <h3>Recent Reflections</h3>
                {myEntries.slice(0, 3).map((e) => (
                    <div key={e.id} className="row">
                        <div>{e.date}</div>
                        <div className="pill">Study {e.studyHours}h</div>
                        <div className="pill">Sleep {e.sleepHours}h</div>
                        <div className="pill">Stress {e.stress}/5</div>
                        <div className="pill">Focus {e.focus}/5</div>
                    </div>
                ))}
                {myEntries.length === 0 && <div className="muted">No entries yet. Start logging!</div>}
            </div>
        </div>
    );
}