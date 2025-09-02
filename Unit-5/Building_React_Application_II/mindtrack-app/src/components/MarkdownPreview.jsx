function renderSimpleMarkdown(md) {
    if (!md) return "";
    let html = md;
    html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    html = html.replace(/^###### (.*)$/gm, "<h6>$1</h6>");
    html = html.replace(/^##### (.*)$/gm, "<h5>$1</h5>");
    html = html.replace(/^#### (.*)$/gm, "<h4>$1</h4>");
    html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em >");

    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');

    html = html.replace(/^\s*[-]\s+(.)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");

    html = html.replace(/\n/g, "<br/>");

    return html;
}

export default function MarkdownPreview({ value }) {
    return (
        <div
            className="md-preview"
            dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(value) }}
        />
    );
}