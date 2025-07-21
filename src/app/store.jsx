// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/formSlice";
import authSlice from "../features/authSlice";
export const store = configureStore({
  reducer: {
    form: formReducer,
    auth: authSlice,
  
  },
});
