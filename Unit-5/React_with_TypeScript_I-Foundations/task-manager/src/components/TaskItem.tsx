import { useContext } from "react"
import type { Task } from "../types/task"
import { TaskContext } from "../context/TaskContext"

function TaskItem({ task }: { task: Task }) {
    const taskContext = useContext(TaskContext)
    if (!taskContext) return null
    const { toggleTask } = taskContext

    return (
        <li>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
            />
            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.description} ({task.priority})
            </span>
        </li>
    )
}

export default TaskItem;