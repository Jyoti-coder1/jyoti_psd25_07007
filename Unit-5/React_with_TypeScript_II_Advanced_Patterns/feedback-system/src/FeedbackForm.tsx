import React, { useState } from "react";

interface FormData {
    name: string;
    email: string;
    rating: number;
    feedback: string;
}

interface ConfirmationProps {
    data: FormData;
}

const ConfirmationMessage = ({ data }: ConfirmationProps) => {
    return (
        <div>
            <h3>Thank you for your feedback!</h3>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Rating:</strong> {data.rating}</p>
            <p><strong>Feedback:</strong> {data.feedback}</p>
        </div>
    );
};

const FeedbackForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        rating: 0,
        feedback: "",
    });

    const [submittedData, setSubmittedData] = useState<FormData | null>(null);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "rating" ? +value : value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.name || !formData.email || !formData.rating || !formData.feedback) {
            alert("All fields are required!");
            return;
        }

        setSubmittedData(formData);
        setFormData({ name: "", email: "", rating: 0, feedback: "" });
    };

    return (
        <div>
            {!submittedData ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Rating (1–5):</label>
                        <input
                            type="number"
                            name="rating"
                            min="1"
                            max="5"
                            value={formData.rating || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Feedback:</label>
                        <textarea
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            ) : (
                <ConfirmationMessage data={submittedData} />
            )}
        </div>
    );
};

export default FeedbackForm;