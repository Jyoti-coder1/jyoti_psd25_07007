import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "38bd14df";

export const fetchMovies = createAsyncThunk("movies/fetch", async (page = 1) => {
    const res = await axios.get(
       ` http://www.omdbapi.com/?i=tt3896198&apikey=38bd14df`
    );
    return res.data;
});

const moviesSlice = createSlice({
    name: "movies",
    initialState: { data: [], loading: false, error: null, page: 1 },
    reducers: {
        setPage: (state, action) => { state.page = action.payload; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => { state.loading = true; })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.results;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setPage } = moviesSlice.actions;
export default moviesSlice.reducer;