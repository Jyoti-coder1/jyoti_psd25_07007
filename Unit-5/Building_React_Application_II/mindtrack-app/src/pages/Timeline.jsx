import { useApp } from "../context/AppContext.jsx";
import MarkdownPreview from "../components/MarkdownPreview.jsx";

export default function Timeline() {
    const { state } = useApp();
    const my = state.entries
        .filter((e) => e.owner === state.user.name)
        .sort((a, b) => (a.date < b.date ? 1 : -1));

    return (
        <div className="page">
            <h2>Timeline</h2>
            {my.length === 0 && <div className="muted">No entries yet.</div>}
            {my.map((e) => (
                <div key={e.id} className="card">
                    <div className="row spread">
                        <div className="date">{e.date}</div>
                        <div className="chips">
                            <span className="chip">Study {e.studyHours}h</span>
                            <span className="chip">Break {e.breakMinutes}m</span>
                            <span className="chip">Sleep {e.sleepHours}h</span>
                            <span className="chip">Stress {e.stress}/5</span>
                            <span className="chip">Focus {e.focus}/5</span>
                        </div>
                    </div>
                    <MarkdownPreview value={e.reflection} />
                    {(e.mentorComments || []).length > 0 && (
                        <div className="mt">
                            <div className="muted small">Mentor comments:</div>
                            {(e.mentorComments || []).map((c) => (
                                <div key={c.id} className="comment">
                                    <div className="small muted">{c.date} · {c.mentorName}</div>
                                    <div>{c.text}</div>
                                    {c.focusSuggestions?.length > 0 && (
                                        <div className="chips">
                                            {c.focusSuggestions.map((s, i) => <span className="chip" key={i}>{s}</span>)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}