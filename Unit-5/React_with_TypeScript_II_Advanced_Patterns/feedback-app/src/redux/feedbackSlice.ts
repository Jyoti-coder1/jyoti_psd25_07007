import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Feedback, FeedbackState } from '../types/feedback';

const initialState: FeedbackState = {
    feedbackList: []
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        addFeedback(state, action: PayloadAction<Feedback>) {
            state.feedbackList.push(action.payload);
        },
        removeFeedback(state, action: PayloadAction<number>) {
            state.feedbackList = state.feedbackList.filter(f => f.id !== action.payload);
        }
    }
});

export const { addFeedback, removeFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;