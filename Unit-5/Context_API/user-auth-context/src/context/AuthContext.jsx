import { useState } from "react";
import { children } from "react";
import { createContext } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const toggleAuth = () => {
        setIsAuthenticated((prev) => !prev);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
            {children}
        </AuthContext.Provider>
    );
}