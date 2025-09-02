import { useMemo, useRef } from "react";
import { useApp } from "../context/AppContext.jsx";

export default function ExportPage() {
    const { state } = useApp();
    const wrapperRef = useRef(null);

    const monthEntries = useMemo(() => {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, "0");
        const prefix = `${y}-${m}-`;
        return state.entries
            .filter((e) => e.owner === state.user.name && e.date.startsWith(prefix))
            .sort((a, b) => (a.date < b.date ? 1 : -1));
    }, [state.entries, state.user]);

    const printPDF = () => {
        const w = window.open("", "_blank");
        const styles = document.querySelector("style#print-styles")?.outerHTML || "";
        const css = document.querySelector("link[rel=stylesheet]")?.outerHTML || "";
        w.document.write(`
            <html>
                <head>
                    <title>MindTrack Summary</title>
                    ${css}
                    ${styles}
                </head>
                <body class="printable">
                    <h1>MindTrack Monthly Summary</h1>
                    <h3>${state.user.name}</h3>
                    ${wrapperRef.current?.innerHTML || ""}
                </body>
            </html>
        `);
        w.document.close();
        w.focus();
        w.print();
    };

    return (
        <div className="page">
            <h2>Export Monthly PDF</h2>
            <div className="card">
                <button className="btn primary" onClick={printPDF}>Print / Save as PDF</button>
                <div className="muted small">Opens a print window; choose “Save as PDF”.</div>
            </div>

            <div className="card" ref={wrapperRef}>
                <h3>Entries</h3>
                {monthEntries.length === 0 && <div className="muted">No entries this month yet.</div>}
                {monthEntries.map((e) => (
                    <div key={e.id} className="export-row">
                        <div><b>{e.date}</b></div>
                        <div>Study: {e.studyHours}h, Break: {e.breakMinutes}m, Sleep: {e.sleepHours}h, Stress: {e.stress}/5, Focus: {e.focus}/5</div>
                        <div className="small">{e.reflection}</div>
                    </div>
                ))}
            </div>

            <style id="print-styles">
                {`@media print {.nav, .btn, .banner { display:none !important; } .card { box - shadow:none; } body { padding:0 !important; } }`}
            </style>
        </div>
    );
}