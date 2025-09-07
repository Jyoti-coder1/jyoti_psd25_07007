import { useState, useContext } from "react"
import { TaskContext } from "../context/TaskContext"
import type { Priority } from "../types/task"

function TaskForm() {
    const taskContext = useContext(TaskContext)
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState<Priority>("Low")

    if (!taskContext) return null
    const { addTask } = taskContext

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (description.trim() === "") return
        addTask(description, priority)
        setDescription("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter task"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                <option value={"Low"}>Low</option>
                <option value={"Medium"}>Medium</option>
                <option value={"High"}>High</option>
            </select>
            <button type="submit">Add</button>
        </form>
    )
}

export default TaskForm;