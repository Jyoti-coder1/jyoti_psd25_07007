import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "books",
    initialState: [],
    reducers: {
        addBook: (state, action) => {
            state.push({ ...action.payload, id: Date.now(), read: false });
        },
        toggleRead: (state, action) => {
            const book = state.find(b => b.id === action.payload);
            if (book) book.read = !book.read;
        },
        editBook: (state, action) => {
            const { id, updatedBook } = action.payload;
            const index = state.findIndex(b => b.id === id);
            if (index !== -1) state[index] = { ...state[index], ...updatedBook };
        },
        deleteBook: (state, action) => {
            return state.filter(b => b.id !== action.payload);
        },
    },
});

export const { addBook, toggleRead, editBook, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;