import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import FilterControls from "../components/FilterControls";
import IssueCard from "../components/IssueCard";
import axios from "axios";

const initialFilterState = {
    status: "open",
    label: "",
};

function filterReducer(state, action) {
    switch (action.type) {
        case "SET_STATUS":
            return { ...state, status: action.payload };
            case "SET_LABEL":
            return { ...state, label: action.payload };
        default:
            return state;
    }
}

function IssuesPage() {
    const { owner, repoName } = useParams();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filterState, dispatch] = useReducer(filterReducer, initialFilterState);
    useEffect(() => {
        setLoading(true);
        setError(null);

        axios
            .get(`https://api.github.com/repos/${owner}/${repoName}/issues`, {
                params: { state: filterState.status },
            })
            .then((res) => setIssues(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [owner, repoName, filterState.status]);

    const filteredIssues = issues.filter((issue) =>
        filterState.label ? issue.labels.some((label) =>
            label.name.toLowerCase().includes(filterState.label.toLowerCase())
        )
            : true
    );

    return (
        <div className="container">
            <h1>Issues for {owner}/{repoName}</h1>
            <FilterControls 
                filterState={filterState}
                dispatch={dispatch}
            />
            {loading && <p>Loading issues...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && filteredIssues.length === 0 && <p>No issues found.</p>}
            {filteredIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
            ))}
        </div>
    );
}

export default IssuesPage;
