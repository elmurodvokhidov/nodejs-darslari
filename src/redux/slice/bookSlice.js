import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    books: [],
    book: null,
    isError: null,
};

const BookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        bookStart: (state) => {
            state.isLoading = true;
        },
        bookSuccess: (state, action) => {
            state.isLoading = false;
            if (action.payload.type === "a") {
                state.book = action.payload.data;
            }
            else if (action.payload.type === "b") {
                state.books = action.payload.data;
            }
        },
        bookFailure: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },
    },
});

export const { bookStart, bookSuccess, bookFailure } = BookSlice.actions;
export default BookSlice.reducer;