import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "../slice/bookSlice";
import categorySlice from "../slice/categorySlice";

export const store = configureStore({
    reducer: {
        book: bookSlice,
        category: categorySlice,
    }
});