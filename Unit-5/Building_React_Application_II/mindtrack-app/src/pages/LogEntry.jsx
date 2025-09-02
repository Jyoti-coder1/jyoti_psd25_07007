import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import MarkdownPreview from "../components/MarkdownPreview.jsx";

export default function LogEntry() {
    const { state, actions, todayISO } = useApp();
    const today = todayISO();
    const existing = state.entries.find((e) => e.owner === state.user.name && e.date === today);
    const [studyHours, setStudyHours] = useState(existing?.studyHours || 0);
    const [breakMinutes, setBreakMinutes] = useState(existing?.breakMinutes || 0);
    const [sleepHours, setSleepHours] = useState(existing?.sleepHours || 0);
    const [stress, setStress] = useState(existing?.stress || 1);
    const [focus, setFocus] = useState(existing?.focus || 1);
    const [reflection, setReflection] = useState(existing?.reflection || "");
    const [shareAnon, setShareAnon] = useState(existing?.shareAnon ?? true);
    const ref = useRef(null);

    useEffect(() => {
        ref.current?.focus();
    }, []);

    const save = (e) => {
        e.preventDefault();
        const wasStreak = calcStreakIfAdded(state, state.user.name, today);
        actions.addEntry({
            owner: state.user.name,
            date: today,
            studyHours,
            breakMinutes,
            sleepHours,
            stress,
            focus,
            reflection,
            shareAnon,
        });
        if (wasStreak.increase) {
            alert(`Nice! 🔥 Your streak is now ${wasStreak.newStreak} day(s).Keep going!`);
        }
        else {
            alert("Saved!");
        }
    };

    return (
        <div className="page">
            <h2>Log Today • {today}</h2>
            <form className="card form-grid" onSubmit={save}>
                <label>Study Hours</label>
                <input type="number" min="0" step="0.5" value={studyHours} onChange={(e) => setStudyHours(e.target.value)} />

                <label>Break Time (minutes)</label>
                <input type="number" min="0" step="5" value={breakMinutes} onChange={(e) => setBreakMinutes(e.target.value)} />

                <label>Sleep (hours)</label>
                <input type="number" min="0" step="0.5" value={sleepHours} onChange={(e) => setSleepHours(e.target.value)} />

                <label>Stress (1–5)</label>
                <input type="number" min="1" max="5" value={stress} onChange={(e) => setStress(e.target.value)} />

                <label>Focus (1–5)</label>
                <input type="number" min="1" max="5" value={focus} onChange={(e) => setFocus(e.target.value)} />

                <label>Reflection (Markdown)</label>
                <textarea ref={ref} rows="6" value={reflection} onChange={(e) => setReflection(e.target.value)} placeholder="What went well? What can improve?" />

                <label>
                    <input type="checkbox" checked={shareAnon} onChange={(e) => setShareAnon(e.target.checked)} />
                    Share this entry anonymously with mentor
                </label>

                <button className="btn primary" type="submit">Save</button>
            </form>

            <div className="card">
                <h3>Preview</h3>
                <MarkdownPreview value={reflection} />
            </div>
        </div>
    );
}

function calcStreakIfAdded(state, owner, dateISO) {
    const mine = state.entries.filter((e) => e.owner === owner);
    const set = new Set(mine.map((e) => e.date));
    const d = new Date();
    const isoToday = dateISO;

    const already = set.has(isoToday);
    set.add(isoToday);

    let streak = 0;
    const cursor = new Date();
    while (true) {
        const y = cursor.getFullYear();
        const m = String(cursor.getMonth() + 1).padStart(2, "0");
        const day = String(cursor.getDate()).padStart(2, "0");
        const iso = `${y}-${m}-${day}`;
        if (set.has(iso)) {
            streak++;
            cursor.setDate(cursor.getDate() - 1);
        }
        else break;
    }
    return { newStreak: streak, increase: !already };
}