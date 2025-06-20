import { configureStore } from "@reduxjs/toolkit";
import IngredientsReducer from "../Slices/IngredientsSlice";
import PanierReducer from "../Slices/PanierSlice";



export const store = configureStore({
    reducer:{
        ingredients: IngredientsReducer,
        panier: PanierReducer,
    }
})