import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "../slice/bookSlice";
import categorySlice from "../slice/categorySlice";
import authSlice from "../slice/authSlice";

export const store = configureStore({
    reducer: {
        book: bookSlice,
        category: categorySlice,
        auth: authSlice,
    }
});