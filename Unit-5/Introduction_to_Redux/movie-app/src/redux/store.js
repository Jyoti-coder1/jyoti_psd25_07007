import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import moviesReducer from "./moviesSlice";
import watchlistReducer from "./watchlistSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        movies: moviesReducer,
        watchlist: watchlistReducer,
    },
});
export default store;