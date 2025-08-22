import { createContext, useState } from "react";

export const UserContext = createContext();
export function UserProvider({ children }) {
    const [user, setUser] = useState({
        name: "Jyoti",
        email: "jyoti@example.com"
    });
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}