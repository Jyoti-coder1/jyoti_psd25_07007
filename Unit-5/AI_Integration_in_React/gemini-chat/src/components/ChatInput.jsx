import React, { useState, useRef } from "react";

export default function ChatInput({ onSend, disabled }) {
    const [value, setValue] = useState("");
    const ref = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        const text = value.trim();
        if (!text) return;
        onSend(text);
        setValue("");
        ref.current.focus();
    }

    function onKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    }

    const formStyle = {
        display: "flex",
        gap: "8px",
        padding: "12px",
        borderTop: "1px solid #e6e7ee",
        background: "white",
    };

    const textareaStyle = {
        flex: 1,
        minHeight: "36px",
        maxHeight: "120px",
        resize: "none",
        padding: "8px 10px",
        border: "1px solid #dbeafe",
        borderRadius: "8px",
        fontSize: "14px",
    };

    const sendStyle = {
        background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "8px",
        cursor: disabled || !value.trim() ? "not-allowed" : "pointer",
        opacity: disabled || !value.trim() ? 0.5 : 1,
    };

    return (
        <form style={formStyle} onSubmit={handleSubmit} aria-label="Chat input">
            <textarea
                ref={ref}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Type a message..."
                rows={1}
                style={textareaStyle}
                disabled={disabled}
                aria-disabled={disabled}
            />
            <button
                type="submit"
                style={sendStyle}
                disabled={disabled || !value.trim()}
                aria-label="Send message"
            >
                Send
            </button>
        </form>
    );
}