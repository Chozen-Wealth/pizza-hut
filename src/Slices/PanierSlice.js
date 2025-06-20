import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";


const initialState = []


export const PanierSlice = createSlice({
    name: "panier",
    initialState,
    reducers: {
        ajouterPanier: (state, action) => {
            state.push(action.payload)
        },
        resetPanier: (state) => {
            return []
        },
    }
})

export const {ajouterPanier, resetPanier} = PanierSlice.actions
export default PanierSlice.reducer