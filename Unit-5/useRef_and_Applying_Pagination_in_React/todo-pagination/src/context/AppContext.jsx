import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();
export function AppProvider({ children }) {
    const [todos, setTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((res) => res.json())
            .then((data) => setTodos(data))
            .catch((err) => console.error(err));
    }, []);

    const totalPages = Math.ceil(todos.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentTodos = todos.slice(indexOfFirst, indexOfLast);

    return (
        <AppContext.Provider value={{ todos, currentTodos, currentPage, setCurrentPage, totalPages }}>
            {children}
        </AppContext.Provider>
    );
}