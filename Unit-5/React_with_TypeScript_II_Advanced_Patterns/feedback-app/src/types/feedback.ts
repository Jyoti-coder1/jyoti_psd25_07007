export interface Feedback {
    id: number;
    name: string;
    email: string;
    rating: number;
    comments: string;
    date: string;
}

export interface FeedbackState {
    feedbackList: Feedback[];
}