import { createContext, useContext, useEffect, useReducer } from "react";

const AppContext = createContext();

const initialState = {
    user: null,
    entries: [],
    ui: {
        banner: null,
    },
};

const todayISO = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
};
const yestISO = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
};
const uid = () => `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export function calcStreak(entries) {
    const set = new Set(entries.map((e) => e.date));
    let streak = 0;
    const d = new Date();
    while (true) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        const iso = `${y}-${m}-${day}`;
        if (set.has(iso)) {
            streak++;
            d.setDate(d.getDate() - 1);
        }
        else break;
    }
    return streak;
}

function save(state) {
    localStorage.setItem("mindtrack_state", JSON.stringify(state));
}

function load() {
    try {
        const raw = localStorage.getItem("mindtrack_state");
        return raw ? JSON.parse(raw) : initialState;
    } catch {
        return initialState;
    }
}

function reducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload, ui: { banner: null } };
        case "LOGOUT":
            return { ...state, user: null, ui: { banner: null } };
        case "ADD_ENTRY": {
            const existsIdx = state.entries.findIndex(
                (e) => e.date === action.payload.date && e.owner === state.user?.name
            );
            let entries;
            if (existsIdx >= 0) {
                entries = [...state.entries];
                entries[existsIdx] = { ...entries[existsIdx], ...action.payload };
            } else {
                entries = [...state.entries, action.payload];
            }
            return { ...state, entries };
        }
        case "ADD_MENTOR_COMMENT": {
            const { entryId, comment } = action.payload;
            const entries = state.entries.map((e) =>
                e.id === entryId ? { ...e, mentorComments: [...(e.mentorComments || []), comment] } : e
            );
            return { ...state, entries };
        }
        case "SET_BANNER":
            return { ...state, ui: { ...state.ui, banner: action.payload } };
        default:
            return state;
    }
}

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, undefined, load);

    useEffect(() => save(state), [state]);

    useEffect(() => {
        if (state.user?.role === "student") {
            const missed = !state.entries.some(
                (e) => e.owner === state.user.name && e.date === yestISO()
            );
            if (missed) {
                dispatch({
                    type: "SET_BANNER",
                    payload: "Gentle nudge: You missed yesterday’s log. Want to add it now?",
                });

                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("MindTrack", {
                        body: "You missed yesterday’s log. Add it to keep your streak alive!",
                    });
                }
            }
            else {
                dispatch({ type: "SET_BANNER", payload: null });
            }
        }
    }, [state.user, state.entries]);

    useEffect(() => {
        if (state.user?.role === "student" && "Notification" in window) {
            if (Notification.permission === "default") {
                Notification.requestPermission();
            }
        }
    }, [state.user]);

    const actions = {
        login: (name, role) => dispatch({ type: "LOGIN", payload: { name, role } }),
        logout: () => dispatch({ type: "LOGOUT" }),
        addEntry: (data) =>
            dispatch({
                type: "ADD_ENTRY",
                payload: {
                    id: data.id || uid(),
                    owner: data.owner,
                    date: data.date || todayISO(),
                    studyHours: Number(data.studyHours || 0),
                    breakMinutes: Number(data.breakMinutes || 0),
                    sleepHours: Number(data.sleepHours || 0),
                    stress: Number(data.stress || 1),
                    focus: Number(data.focus || 1),
                    reflection: data.reflection || "",
                    shareAnon: !!data.shareAnon,
                    mentorComments: data.mentorComments || [],
                },
            }),
        addMentorComment: (entryId, mentorName, text, focusSuggestions = []) =>
            dispatch({
                type: "ADD_MENTOR_COMMENT",
                payload: {
                    entryId,
                    comment: {
                        id: uid(),
                        mentorName,
                        text,
                        focusSuggestions,
                        date: todayISO(),
                    },
                },
            }),
    };

    return (
        <AppContext.Provider value={{ state, actions, todayISO }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    return useContext(AppContext);
}