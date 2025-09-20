import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const [repo, setRepo] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!repo.includes("/")) {
            alert ("Enter in owner/repo format");
            return;
        }
        const [owner, repoName] = repo.split("/");
        navigate(`/repo/owner/${owner}/${repoName}`);
    };
    return (
        <div className="container">
            <h1>GitHub Issue Tracker</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="owner/repo"
                    value={repo}
                    onChange={
                        (e) => setRepo(e.target.value)
                    }
                />
                <button type="submit">View Issues</button>
            </form>
        </div>
    );
}

export default HomePage;