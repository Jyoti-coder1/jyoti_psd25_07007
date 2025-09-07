import { useState, useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";
import { Feedback } from "../types";

const FeedbackForm = () => {
    const { addFeedback } = useContext(FeedbackContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState<number | "">("");
    const [comments, setComments] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!name || !email || !rating) {
            alert("Please fill all required fields");
            return;
        }

        const newFeedback: Feedback = {
            id: Date.now(),
            name,
            email,
            rating,
            comments,
        };

        addFeedback(newFeedback);
        setSubmitted(true);
    };

    if (submitted)
        return (
            <div style={{ textAlign: "center", marginTop: "50px", color: "#ffcc00" }}>
                <h2>Thank you for your feedback!</h2>
                <p>We aprreciate your time and look forward to welcoming you back to Aromatic Bar.</p>
            </div>
        );

    return (
        <div className="feedback-form-container">
            <div className="info-box">
                <p>
                    At Aromatic Bar, we are committed to providing you with an excellent dining experience.
                    Please share your feedback so we can continue to improve and make your next visit even better!
                </p>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={rating}
                    min={1}
                    max={5}
                    onChange={(e) => setRating(Number(e.target.value))}
                />
                <textarea
                    placeholder="Comments"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    style={{ height: "100px" }}
                />
                <button type="submit">
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;