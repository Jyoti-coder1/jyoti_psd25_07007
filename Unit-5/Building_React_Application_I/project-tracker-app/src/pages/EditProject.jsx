import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProject } from "../api/firebaseApi";

export default function EditProject() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getProjectById(id).then((res) => {
            if (res) {
                setTitle(res.title || "");
                setDesc(res.description || "");
            }
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProject(id, { title, description: desc, createdAt: Date.now() })
            .then(() => navigate("/"));
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Edit Project</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
            <button type="submit">Update</button>
        </form>
    );
}