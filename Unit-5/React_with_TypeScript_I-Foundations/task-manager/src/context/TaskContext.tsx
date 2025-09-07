import  { createContext, useState } from "react"
import type { ReactNode } from "react"
import type { Task, Priority } from "../types/task"

interface TaskContextType {
    tasks: Task[]
    addTask: (description: string, priority: Priority) => void
    toggleTask: (id: number) => void
    filter: string
    setFilter: (value: string) => void
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [filter, setFilter] = useState("all")

    const addTask = (description: string, priority: Priority) => {
        const newTask: Task = {
            id: Date.now(),
            description,
            priority,
            completed: false,
        }
        setTasks([...tasks, newTask])
    }

    const toggleTask = (id: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, toggleTask, filter, setFilter }}>
            {children}
        </TaskContext.Provider>
    )
}