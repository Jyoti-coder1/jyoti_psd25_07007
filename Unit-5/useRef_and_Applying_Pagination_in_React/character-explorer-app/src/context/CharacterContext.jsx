import { createContext, useState, useEffect } from "react";

export const CharacterContext = createContext();
export function CharacterProvider({ children }) {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await fetch("https://rickandmortyapi.com/api/character");
            const data = await res.json();
            setCharacters(data.results);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <CharacterContext.Provider value={{ characters, loading }}>
            {children}
        </CharacterContext.Provider>
    );
}