export default function Heatmap({ entries }) {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const first = new Date(y, m, 1);
    const last = new Date(y, m + 1, 0);
    const daysInMonth = last.getDate();

    const map = new Map();
    entries.forEach((e) => {
        const score = e.studyHours * 1 + e.focus * 2 - e.stress * 1 - (e.breakMinutes / 60) * 0.5 + e.sleepHours * 0.5;
        map.set(e.date, Math.max(0, Math.round(score)));
    });

    const cells = [];
    for (let d = 1; d <= daysInMonth; d++) {
        const iso = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        const score = map.get(iso) || 0;
        let level = 0;
        if (score >= 10) level = 4;
        else if (score >= 7) level = 3;
        else if (score >= 4) level = 2;
        else if (score >= 1) level = 1;
        cells.push(
            <div key={iso} className={`heat-cell heat-${level}`} title={`${iso} • Score: ${score}`} />
        );
    }

    const pad = first.getDay();
    const padCells = Array.from({ length: pad }, (_, i) => <div className="heat-pad" key={"p" + i} />);

    return (
        <div>
            <div className="heat-heading">
                {now.toLocaleString(undefined, { month: "long", year: "numeric" })}
            </div>
            <div className="heat-grid">
                {padCells}
                {cells}
            </div>
        </div>
    );
}