import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../api/firebaseApi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [projects, setProjects] = useState([]);

    const loadProjects = async () => {
        const data = await getProjects();
        if (data) {
            const projectsArray = Object.entries(data).map(([id, val]) => ({ id, ...val }));
            setProjects(projectsArray);
        }
        else {
            setProjects([]);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleDelete = async (id) => {
        await deleteProject(id);
        loadProjects();
    };

    return (
        <div className="dashboard">
            <h1>Projects</h1>
            <p>Welcome, {user?.email}</p>
            <button onClick={logout}>Logout</button>
            <Link to="/add">+ Add Project</Link>
            <ul>
                {projects.length > 0 ? (projects.map((project) => (
                <li key={project.id}>
                    <Link to={`/project/${project.id}`}>{project.title}</Link>
                    <Link to={`/edit/${project.id}`} style={{ marginLeft: "10px" }}>Edit</Link>
                    <button onClick={() => handleDelete(project.id)}>Delete</button>
                </li>
            ))
        ) : (
            <p>No projects found</p>
        )}
        </ul>
    </div >
  );
}