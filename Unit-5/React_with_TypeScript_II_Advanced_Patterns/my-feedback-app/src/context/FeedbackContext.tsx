import { createContext, useState, type ReactNode } from "react";

interface Feedback {
    name: string;
    email: string;
    rating: number;
    comments: string;
}

interface FeedbackContextType {
    feedbacks: Feedback[];
    formData: Feedback;
    updateFormData: (field: keyof Feedback, value: string | number) => void;
    addFeedback: (feedback: Feedback) => void;
}

export const FeedbackContext = createContext<FeedbackContextType | null>(null);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [formData, setFormData] = useState<Feedback>({
        name: "",
        email: "",
        rating: 0,
        comments: "",
    });

    const addFeedback = (feedback: Feedback) => {
        setFeedbacks([...feedbacks, feedback]);
        setFormData({ name: "", email: "", rating: 0, comments: "" });
    };

    const updateFormData = (field: keyof Feedback, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <FeedbackContext.Provider value={{ feedbacks, formData, updateFormData, addFeedback }}>
            {children}
        </FeedbackContext.Provider>
    );
};