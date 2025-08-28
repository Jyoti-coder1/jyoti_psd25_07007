import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filters",
    initialState: { status: "all", genre: "all", author: "" },
    reducers: {
        setStatus: (state, action) => { state.status = action.payload; },
        setGenre: (state, action) => { state.genre = action.payload; },
        setAuthor: (state, action) => { state.author = action.payload; },
    },
});

export const { setStatus, setGenre, setAuthor } = filterSlice.actions;
export default filterSlice.reducer;