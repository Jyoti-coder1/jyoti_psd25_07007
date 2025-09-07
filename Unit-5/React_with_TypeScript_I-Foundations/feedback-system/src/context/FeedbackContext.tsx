import { createContext, useState, useEffect } from "react";
import { Feedback } from "../types";

interface FeedbackContextType {
    feedbacks: Feedback[];
    addFeedback: (fb: Feedback) => void;
}

export const FeedbackContext = createContext<FeedbackContextType>({
    feedbacks: [],
    addFeedback: () => { },
});

export const FeedbackProvider = ({ children }: any) => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>(() => {
        const saved = localStorage.getItem("feedbacks");
        return saved ? JSON.parse(saved) : [];
    });

    const addFeedback = (fb: Feedback) => {
        setFeedbacks([...feedbacks, fb]);
    };

    useEffect(() => {
        localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    }, [feedbacks]);

    return (
        <FeedbackContext.Provider value={{ feedbacks, addFeedback }}>
            {children}
        </FeedbackContext.Provider>
    );
};