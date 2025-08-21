import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const toggleAuth = () => setLoggedIn(!prev);

    return (
        <AuthContext.Provider value={{ loggedIn, toggleAuth }}>
            {children}
        </AuthContext.Provider>
    );
}