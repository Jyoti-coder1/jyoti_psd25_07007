import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject, addTask, updateTask, deleteTask } from "../api/firebaseApi";

export default function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [taskTitle, setTaskTitle] = useState("");
    const [priority, setPriority] = useState("low");

    const [editingTaskById, setEditingTaskById] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editpriority, setEditPriority] = useState("low");

    const loadProject = async () => {
        const data = await getProject(id);
        setProject(data);
    };

    useEffect(() => {
        loadProject();
    }, [id]);

    const handleAddTask = async (e) => {
        e.preventDefault();
        await addTask(id, { title: taskTitle, completed: false, priority });
        setTaskTitle("");
        loadProject();
    };

    const handleToggleComplete = async (taskId, current) => {
        await updateTask(id, taskId, { completed: !current });
        loadProject();
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTask(id, taskId);
        loadProject();
    };

    const handleEditTask = (taskId, task) => {
        setEditingTaskId(taskId);
        setEditTitle(task.title);
        setEditPriority(task.priority);
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        await updateTask(id, editingTaskId, { title: editTitle, priority: editPriority });
        setEditingTaskId(null);
        loadProject();
    };

    if (!project) return <p>Loading...</p>;

    return (
        <div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>

            <h3>Tasks</h3>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit">Add Task</button>
            </form>

            <ul>
                {project.tasks && Object.entries(project.tasks).map(([taskId, task]) => (
                    <li key={taskId}>
                        {editingTaskId === taskId ? (
                            <form onSubmit={handleUpdateTask}>
                                <input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    required
                                />
                                <select
                                    value={editPriority}
                                    onChange={(e) => setEditPriority(e.target.value)}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setEditingTaskId(null)}>
                                    Cancel
                                </button>
                            </form>
                        ) : (
                            <>
                                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                    {task.title} ({task.priority})
                                </span>
                                <button onClick={() => handleToggleComplete(taskId, task.completed)}>
                                    {task.completed ? "Undo" : "Complete"}
                                </button>
                                <button onClick={() => handleDeleteTask(taskId)}>Delete</button>
                                {/* ✅ Added edit button */}
                                <button onClick={() => handleEditTask(taskId, task)}>Edit</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div >
    );
}