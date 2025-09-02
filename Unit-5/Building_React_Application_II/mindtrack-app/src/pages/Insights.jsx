import { useMemo } from "react";
import { useApp } from "../context/AppContext.jsx";
import MarkdownPreview from "../components/MarkdownPreview.jsx";

export default function Insights() {
    const { state } = useApp();
    const my = state.entries.filter((e) => e.owner === state.user.name);
    const last7 = useMemo(() => {
        const sorted = [...my].sort((a, b) => (a.date < b.date ? 1 : -1));
        return sorted.slice(0, 7);
    }, [my]);

    const insights = generateInsights(last7);

    return (
        <div className="page">
            <h2>Insights</h2>
            {last7.length < 7 && (
                <div className="muted">Add {7 - last7.length} more daily logs to unlock stronger insights.</div>
            )}
            <div className="card">
                <h3>Simple Patterns</h3>
                {insights.length === 0 && <div className="muted">Not enough data yet. Keep logging!</div>}
                <ul className="bullets">
                    {insights.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
            </div>

            <div className="card">
                <h3>Recent Mentor Feedback</h3>
                {my.slice(0, 10).flatMap((e) => (e.mentorComments || []).map((c) => ({ e, c }))).length === 0 && (
                    <div className="muted">No mentor comments yet.</div>
                )}
                {my.slice(0, 10).flatMap((e) => (e.mentorComments || []).map((c) => ({ e, c }))).map(({ e, c }) => (
                    <div key={c.id} className="comment">
                        <div className="small muted">{e.date} · {c.mentorName}</div>
                        <div>{c.text}</div>
                        {c.focusSuggestions?.length > 0 && (
                            <div className="chips">
                                {c.focusSuggestions.map((s, i) => <span className="chip" key={i}>{s}</span>)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function avg(arr) {
    return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

function generateInsights(entries) {
    if (entries.length < 7) return [];
    const sleep = entries.map(e => e.sleepHours);
    const focus = entries.map(e => e.focus);
    const stress = entries.map(e => e.stress);
    const breaks = entries.map(e => e.breakMinutes);

    const msgs = [];

    const highSleepIdx = entries.filter(e => e.sleepHours >= 8).map(e => e.focus);
    const lowSleepIdx = entries.filter(e => e.sleepHours < 8).map(e => e.focus);
    if (highSleepIdx.length && lowSleepIdx.length && avg(highSleepIdx) > avg(lowSleepIdx) + 0.5) {
        msgs.push("You focus better after 8+ hours of sleep.");
    }

    const longBreak = entries.filter(e => e.breakMinutes >= 40).map(e => e.stress);
    const shortBreak = entries.filter(e => e.breakMinutes < 40).map(e => e.stress);
    if (longBreak.length && shortBreak.length && avg(longBreak) < avg(shortBreak) - 0.5) {
        msgs.push("Longer breaks seem to reduce stress levels.");
    }

    const highStudy = entries.filter(e => e.studyHours >= 3).map(e => e.focus);
    const lowStudy = entries.filter(e => e.studyHours < 3).map(e => e.focus);
    if (highStudy.length && lowStudy.length && avg(highStudy) > avg(lowStudy) + 0.5) {
        msgs.push("More study time correlates with higher focus for you.");
    }

    msgs.push("Suggested focus area: Maintain a steady sleep cycle.");
    msgs.push("Suggested focus area: Reduce screen time before bed.");

    return msgs;
}