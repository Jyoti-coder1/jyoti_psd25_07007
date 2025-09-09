import React from "react";
import { MessageSquare, X } from "lucide-react";

export default function ChatbotButton({ isOpen, onClick }) {
    const baseStyle = {
        position: "fixed",
        right: "20px",
        bottom: "20px",
        width: "56px",
        height: "56px",
        borderRadius: "999px",
        border: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: isOpen
            ? "#374151"
            : "linear-gradient(90deg,#6366f1,#8b5cf6)",
        color: "white",
        boxShadow: "0 8px 20px rgba(99,102,241,0.24)",
        cursor: "pointer",
        outline: "none",
    };

    const handleFocus = (e) => {
        e.target.style.outline = "3px solid rgba(99,102,241,0.25)";
    };

    const handleBlur = (e) => {
        e.target.style.outline = "none";
    };

    return (
        <button
            aria-pressed={isOpen}
            aria-label={isOpen ? "Close chat" : "Open chat"}
            style={baseStyle}
            onClick={onClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            {isOpen ? <X size={18} /> : <MessageSquare size={18} />}
        </button >
    );
}