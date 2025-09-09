import React from "react";

export default function ChatMessage({ message }) {
    const isBot = message.role === "assistant";
    const time = new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit", minute: "2-digit"
    });

    const rowStyle = {
        display: "flex",
        marginBottom: "10px",
        justifyContent: isBot ? "flex-start" : "flex-end",
    };

    const bubbleStyle = {
        maxWidth: "78%",
        padding: "10px 14px",
        borderRadius: "12px",
        position: "relative",
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
        fontSize: "14px",
        lineHeight: "1.35",
        background: isBot
            ? "#111827"
            : "linear-gradient(90deg,#eef2ff,#f3e8ff)",
        color: isBot ? "#fff" : "#111827",
        borderTopLeftRadius: isBot ? "4px" : "12px",
        borderTopRightRadius: isBot ? "12px" : "4px",
    };

    const tsStyle = {
        fontSize: "11px",
        marginTop: "6px",
        textAlign: "right",
        color: isBot ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
    };

    return (
        <div style={rowStyle} aria-live="polite">
            <div style={bubbleStyle}>
                <div>{message.text}</div>
                <div style={tsStyle} aria-hidden="true">{time}</div>
            </div>
        </div>
    );
}