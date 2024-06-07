import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    categories: [],
    isError: null,
};

const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        categoryStart: (state) => {
            state.isLoading = true;
        },
        categorySuccess: (state, action) => {
            state.isLoading = false;
            state.categories = action.payload;
        },
        categoryFailure: (state, action) => {
            state.isLoading = false;
            state.isError = action.payload;
        },
    },
});

export const {
    categoryStart,
    categorySuccess,
    categoryFailure
} = CategorySlice.actions;
export default CategorySlice.reducer;