import TodoList from "../components/TodoList";
import Pagination from "../components/Pagination";

function Home() {
    return (
        <div>
            <h2>Todo Pagination</h2>
            <TodoList />
            <Pagination />
        </div>
    );
}

export default Home;