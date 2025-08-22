import { createContext } from "react";

export const MovieContext = createContext();
export function MovieProvider({ children }) {
    const apiKey = "38bd14df";
    return (
        <MovieContext.Provider value={apiKey}>
            {children}
        </MovieContext.Provider>
    );
}