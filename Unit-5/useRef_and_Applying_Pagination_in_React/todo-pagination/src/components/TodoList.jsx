import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function TodoList() {
    const { currentTodos } = useContext(AppContext);

    return (
        <ul className="todo-list">
            {currentTodos.map((todo) => (
                <li key={todo.id}>
                    {todo.id}. {todo.title}
                </li>
            ))}
        </ul>
    );
}

export default TodoList;