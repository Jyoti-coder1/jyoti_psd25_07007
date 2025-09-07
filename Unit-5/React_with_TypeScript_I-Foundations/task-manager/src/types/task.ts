export type Priority = "Low" | "Medium" | "High"

export interface Task {
    id: number
    description: string
    priority: Priority
    completed: boolean
}