import { configureStore, combineReducers } from "@reduxjs/toolkit";
import bookReducer from "./bookSlice";
import filterReducer from "./filterSlice";

const rootReducer = combineReducers({
    books: bookReducer,
    filters: filterReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});