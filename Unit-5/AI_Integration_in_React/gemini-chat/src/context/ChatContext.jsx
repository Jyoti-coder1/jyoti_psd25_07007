import React, { createContext, useContext, useEffect, useReducer, useCallback } from "react";

const STORAGE_KEY = "mg_chat_history_v1";
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/";
const MODEL = "gemini-1.5-flash";

const ChatStateContext = createContext();
const ChatDispatchContext = createContext();

function uid() {
    return Math.random().toString(36).slice(2, 9);
}

const initialState = {
    messages: [],
    loading: false,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "INIT":
            return { ...state, messages: action.payload || [] };
        case "ADD_USER":
            return {
                ...state,
                messages: [...state.messages, action.payload],
            };
        case "ADD_ASSISTANT":
            return { ...state, messages: [...state.messages, action.payload] };
        case "SET_LOADING":
            return { ...state, loading: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "CLEAR":
            return initialState;
        default:
            return state;
    }
}

export function ChatProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                dispatch({ type: "INIT", payload: parsed });
            }
            else {
                const greeting = [
                    {
                        id: uid(),
                        role: "assistant",
                        text: "Hi! I'm your AI assistant. Ask me anything.",
                        timestamp: Date.now(),
                    },
                ];
                dispatch({ type: "INIT", payload: greeting });
            }
        }
        catch (err) {
            console.error("Failed to read storage:", err);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages));
        }
        catch (err) {
            console.error("Failed to save chat:", err);
        }
    }, [state.messages]);

    const sendToGemini = useCallback(async (userText, { timeout = 12000, retry = 1 } = {}) => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) throw new Error("Missing VITE_GEMINI_API_KEY");

        const url = `${BASE_URL}chat/completions`;
        const body = {
            model: MODEL,
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: userText },
            ],
            max_tokens: 512,
            temperature: 0.2,
        };

        async function attemptFetch() {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);

            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify(body),
                    signal: controller.signal,
                });
                clearTimeout(id);

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`API error ${res.status}: ${text}`);
                }

                const data = await res.json();

                let reply = "";

                if (data.choices && data.choices[0]) {
                    const c = data.choices[0];
                    if (c.message && (c.message.content || c.message.role)) {
                        if (typeof c.message.content === "string") reply = c.message.content;
                        else if (Array.isArray(c.message.content) && c.message.content[0]?.text) reply = c.message.content[0].text;
                        else reply = JSON.stringify(c.message.content);
                    }
                    else if (c.text) {
                        reply = c.text;
                    }
                }
                else if (data.output && Array.isArray(data.output) && data.output[0]?.content) {
                    const first = data.output[0].content;
                    reply = Array.isArray(first) ? first.map((p) => p.text || "").join("\n") : first.text || "";
                }
                else if (data.text) {
                    reply = data.text;
                }
                else {
                    reply = JSON.stringify(data).slice(0, 500);
                }

                return reply.trim();
            }
            catch (err) {
                clearTimeout(id);
                throw err;
            }
        }

        let lastErr;
        for (let i = 0; i <= retry; i++) {
            try {
                const r = await attemptFetch();
                return r;
            }
            catch (err) {
                lastErr = err;
                if (i < retry) await new Promise((res) => setTimeout(res, 600));
            }
        }
        throw lastErr;
    }, []);

    return (
        <ChatStateContext.Provider value={state}>
            <ChatDispatchContext.Provider value={{ dispatch, sendToGemini }}>
                {children}
            </ChatDispatchContext.Provider>
        </ChatStateContext.Provider>
    );
}

export function useChatState() {
    const ctx = useContext(ChatStateContext);
    if (!ctx) throw new Error("useChatState must be used inside ChatProvider");
    return ctx;
}

export function useChatActions() {
    const ctx = useContext(ChatDispatchContext);
    if (!ctx) throw new Error("useChatActions must be used inside ChatProvider");
    return ctx;
}