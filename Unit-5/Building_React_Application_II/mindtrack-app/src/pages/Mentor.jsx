import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext.jsx";

export default function Mentor() {
    const { state, actions } = useApp();
    const allAnon = state.entries
        .filter((e) => e.shareAnon)
        .sort((a, b) => (a.date < b.date ? 1 : -1));

    const [page, setPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(allAnon.length / pageSize));
    const pageItems = useMemo(() => allAnon.slice((page - 1) * pageSize, page * pageSize), [allAnon, page]);

    const [text, setText] = useState("");
    const [suggest, setSuggest] = useState("");

    const submit = (entryId) => {
        const suggestions = suggest
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);
        actions.addMentorComment(entryId, state.user.name, text.trim(), suggestions);
        setText("");
        setSuggest("");
        alert("Comment added!");
    };

    return (
        <div className="page">
            <h2>Mentor Dashboard</h2>
            <div className="muted">Viewing anonymized student entries (only if students opted-in).</div>

            {pageItems.length === 0 && <div className="muted mt">No shared entries yet.</div>}
            {pageItems.map((e) => (
                <div key={e.id} className="card">
                    <div className="row spread">
                        <div className="date">{e.date}</div>
                        <div className="chips">
                            <span className="chip">Study {e.studyHours}h</span>
                            <span className="chip">Break {e.breakMinutes}m</span>
                            <span className="chip">Sleep {e.sleepHours}h</span>
                            <span className="chip">Stress {e.stress}</span>
                            <span className="chip">Focus {e.focus}</span>
                        </div>
                    </div>
                    <div className="mt small muted">Reflection (anonymous)</div>
                    <div className="quote">{e.reflection || <em>No text</em>}</div>

                    <div className="form-inline mt">
                        <input
                            className="grow"
                            placeholder="Positive comment"
                            value={text}
                            onChange={(ev) => setText(ev.target.value)}
                        />
                        <input
                            className="grow"
                            placeholder="Focus suggestions (comma separated)"
                            value={suggest}
                            onChange={(ev) => setSuggest(ev.target.value)}
                        />
                        <button className="btn" onClick={() => submit(e.id)}>Add</button>
                    </div>
                </div>
            ))}

            {totalPages > 1 && (
                <div className="pager">
                    <button className="btn" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
                    <span>Page {page} / {totalPages}</span>
                    <button className="btn" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
                </div>
            )}
        </div>
    );
}