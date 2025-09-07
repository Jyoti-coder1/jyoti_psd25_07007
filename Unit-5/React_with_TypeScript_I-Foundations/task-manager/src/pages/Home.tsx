import { useContext } from "react"
import { TaskContext } from "../context/TaskContext"
import TaskForm from "../components/TaskForm"
import TaskItem from "../components/TaskItem"

function Home() {
    const taskContext = useContext(TaskContext)
    if (!taskContext) return null
    const { tasks, filter, setFilter } = taskContext

    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed
        if (filter === "incomplete") return !task.completed
        return true
    })

    return (
        <div>
            <h1>Task Manager</h1>
            <TaskForm />

            <div>
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
                <button onClick={() => setFilter("incomplete")}>Incomplete</button>
            </div>

            <ul>
                {filteredTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </ul>
        </div>
    )
}

export default Home;