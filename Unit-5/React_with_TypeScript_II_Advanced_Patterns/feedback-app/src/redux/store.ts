import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from '../redux/feedbackSlice';

const store = configureStore({
    reducer: {
        feedback: feedbackReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;