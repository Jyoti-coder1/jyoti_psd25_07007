import React, { useEffect, useRef } from "react";
import { useChatState, useChatActions } from "../context/ChatContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatWindow({ isOpen, onClose }) {
    const { messages, loading, error } = useChatState();
    const { dispatch, sendToGemini } = useChatActions();
    const endRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (isOpen && containerRef.current) containerRef.current.focus();
    }, [isOpen]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    async function handleSend(userText) {
        const userMsg = { id: Date.now().toString(), role: "user", text: userText, timestamp: Date.now() };
        dispatch({ type: "ADD_USER", payload: userMsg });

        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null });

        try {
            const assistantText = await sendToGemini(userText, { timeout: 12000, retry: 1 });
            const botMsg = { id: Date.now().toString() + "-bot", role: "assistant", text: assistantText, timestamp: Date.now() };
            dispatch({ type: "ADD_ASSISTANT", payload: botMsg });
        }
        catch (err) {
            console.error(err);
            const errMsg = {
                id: "err-" + Date.now(),
                role: "assistant",
                text: "Sorry — I couldn't get a response from the AI. Please try again.",
                timestamp: Date.now(),
            };
            dispatch({ type: "ADD_ASSISTANT", payload: errMsg });
            dispatch({ type: "SET_ERROR", payload: err.message || String(err) });
        }
        finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    }

    if (!isOpen) return null;

    const overlayStyle = {
        position: "fixed",
        right: "20px",
        bottom: "88px",
        width: "360px",
        maxWidth: "calc(100% - 40px)",
        zIndex: 1200,
        outline: "none",
    };

    const panelStyle = {
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: "14px",
        boxShadow: "0 12px 40px rgba(2,6,23,0.12)",
        overflow: "hidden",
        height: "520px",
    };

    const headerStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 14px",
        background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
        color: "white",
    };

    const subStyle = { fontSize: "12px", opacity: 0.9 };

    const controlsBtnStyle = {
        background: "transparent",
        color: "white",
        border: "none",
        cursor: "pointer",
        fontSize: "13px",
    };

    const messagesStyle = {
        padding: "12px",
        overflowY: "auto",
        background: "linear-gradient(180deg,#f8fafc,#ffffff)",
        flex: "1 1 auto",
    };

    const loadingStyle = { fontSize: "13px", color: "#6b7280", margin: "8px 0" };

    const errorStyle = {
        padding: "8px 12px",
        background: "#fee2e2",
        color: "#991b1b",
        fontSize: "13px",
    };

    return (
        <div style={{
            ...overlayStyle,
            ...(window.innerWidth <= 480
                ? { right: "12px", left: "12px", bottom: "80px", width: "auto" }
                : {}
            ),
        }}
            role="dialog"
            aria-modal="true"
            aria-label="AI Chat"
            tabIndex={-1}
            ref={containerRef}
        >
            <div style={panelStyle}>
                <header style={headerStyle}>
                    <div>
                        <strong>AI Assistant</strong>
                        <div style={subStyle}>Powered by Gemini</div>
                    </div>
                    <div>
                        <button
                            onClick={onClose}
                            aria-label="Close chat"
                            style={controlsBtnStyle}
                        >
                            Close
                        </button>
                    </div>
                </header>

                <main style={messagesStyle} aria-live="polite">
                    {messages.map((m) => (
                        <ChatMessage key={m.id} message={m} />
                    ))}
                    {loading && (
                        <div style={loadingStyle}>AI is thinking…</div>
                    )}
                    <div ref={endRef} />
                </main>

                {error && <div style={errorStyle} role="alert">Error: {error}</div>}

                <ChatInput onSend={handleSend} disabled={loading} />
            </div>
        </div>
    );
}