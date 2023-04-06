import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../reducer/authSlice";
import cartSlice from "../reducer/cartSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice
    }
})