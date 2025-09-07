import { useContext, useState } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

const FeedbackList = () => {
    const { feedbacks } = useContext(FeedbackContext);
    const [filterName, setFilterName] = useState("");
    const [filterRating, setFilterRating] = useState(0);
    const filteredFeedbacks = feedbacks
        .filter((fb) =>
            fb.name.toLowerCase().includes(filterName.toLowerCase())
        )
        .filter((fb) => (filterRating > 0 ? fb.rating === filterRating : true))
        .sort((a, b) => b.id - a.id);

    if (feedbacks.length === 0) return <p style={{ textAlign: "center" }}>No feedbacks yet.</p>;

    return (
        <div className="feedback-list-container">
            <div className="feedback-filters">
                <input
                    type="text"
                    placeholder="Filter by Name"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Filter by Rating"
                    value={filterRating}
                    onChange={(e) => setFilterRating(Number(e.target.value))}
                />
            </div>

            <div className="feedback-cards-grid">
                {filteredFeedbacks.map((fb) => (
                    <div key={fb.id} className="feedback-card">
                        <h3>{fb.name}</h3>
                        <p>Email: {fb.email}</p>
                        <p style={{ color: fb.rating === 5 ? "#ffcc00" : "#fff" }}>
                            Rating: {fb.rating} ⭐
                        </p>
                        <p>Comments: {fb.comments}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackList;