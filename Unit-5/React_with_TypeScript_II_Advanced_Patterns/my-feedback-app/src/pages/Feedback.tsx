import React, { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

const Feedback = () => {
    const context = useContext(FeedbackContext);

    if (!context) return null;

    const { formData, updateFormData, addFeedback } = context;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || formData.rating === 0) {
            alert("Please fill all required fields");
            return;
        }
        addFeedback(formData);
        alert("Feedback submitted!");
    };

    return (
        <div style={{ padding: "30px", color: "#fff", maxWidth: "500px", margin: "auto" }}>
            <h2 style={{ marginBottom: "20px", color: "#e8c745ff" }}>Feedback Form</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("name", e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #555",
                        backgroundColor: "#2c2c2c",
                        color: "#fff"
                    }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("email", e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #555",
                        backgroundColor: "#2c2c2c",
                        color: "#fff"
                    }}
                />
                <input
                    type="number"
                    placeholder="Rating"
                    value={formData.rating}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData("rating", Number(e.target.value))}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #555",
                        backgroundColor: "#2c2c2c",
                        color: "#fff"
                    }}
                />
                <textarea
                    placeholder="Comments"
                    value={formData.comments}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData("comments", e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #555",
                        backgroundColor: "#2c2c2c",
                        color: "#fff",
                        minHeight: "80px"
                    }}
                />
                <button type="submit" style={{ backgroundColor: "#e8c745ff", color: "#000", fontWeight: 600 }}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Feedback;