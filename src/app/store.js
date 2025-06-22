import { configureStore } from "@reduxjs/toolkit";
import IngredientsReducer from "../Slices/IngredientsSlice";



export const store = configureStore({
    reducer:{
        ingredients: IngredientsReducer,
    }
})