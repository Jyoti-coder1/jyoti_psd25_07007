import { createContext, useReducer, useContext } from "react";

const initialAuthState = {user: null, isAuthenticated: false, error: null};

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return { ...state, user: action.payload, isAuthenticated: true, error: null };
        case "LOGOUT":
            return { ...state, user: null, isAuthenticated: false };
        case "ERROR":
            return { ...state, error: action.payload };
        default:
            return state;
    }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);

    const login = (userData) => {
        dispatch({ type: "LOGIN", payload: userData });
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    const error = (msg) => {
        dispatch({ type: "ERROR", payload: msg });
    };

    return (
        <AuthContext.Provider value={{ state, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);