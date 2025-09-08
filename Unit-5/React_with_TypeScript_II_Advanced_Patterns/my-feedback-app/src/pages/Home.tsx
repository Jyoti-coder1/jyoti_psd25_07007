import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

const Home = () => {
    const context = useContext(FeedbackContext);

    return (
        <div style={{ padding: "30px", color: "#e8c745ff"}}>
            <h2 style={{ marginBottom: "20px"}}>Home Page</h2>
            <h3 style={{ marginBottom: "15px", color: "#fff" }}>Feedbacks:</h3>
            {context?.feedbacks.length === 0 ? (
                <p>No feedback yet.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {context?.feedbacks.map((f, index) => (
                        <li key={index} style={{
                            marginBottom: "15px",
                            padding: "15px",
                            borderRadius: "10px",
                            backgroundColor: "#2c2c2c",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.3)"
                        }}>
                            <strong>{f.name}</strong> ({f.email}) - Rating: {f.rating} <br />
                            <em>{f.comments}</em>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Home;