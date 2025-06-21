import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    pizzaIngredients : [],
    suppIngredients: [],
    addedIngredients: [],
    deletedIngredients: [],
}


export const IngredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        setPizzaIngredients: (state, action) => {
            state.pizzaIngredients = action.payload
        },
        setSuppIngredients: (state, action) => {
            state.suppIngredients = action.payload
        },
        ajouterIngredients: (state, action) => {
            // const ingredientPresent = state.pizzaIngredients.find(element => element.name === action.payload.name)
            // ingredientPresent ? state.pizzaIngredients = state.pizzaIngredients.map(element => element.name === action.payload.name ? {...element, quantity: element.quantity += 1}: element) : state.addedIngredients.push(action.payload)
            const index = state.pizzaIngredients.findIndex(element => element.name === action.payload.name);

            
            if (index !== -1) {
                const currentQuantity = state.pizzaIngredients[index].quantity;
                if (currentQuantity == 1) {
                    state.addedIngredients.push(action.payload)
                }
            
                // N'autorise pas plus de 2
                if (currentQuantity < 2) {
                    state.pizzaIngredients[index].quantity += 1;
                
                    // Retire l’ingrédient de la liste "sans" s'il y est
                    state.deletedIngredients = state.deletedIngredients.filter(
                        el => el.name !== action.payload.name
                    );
                }
                
            } else {
                // Ajout d’un ingrédient supplémentaire sans limite
                state.addedIngredients.push({ ...action.payload, quantity: 1 });
            }
        },
        sansIngredients: (state, action) => {
            const index = state.pizzaIngredients.findIndex(el => el.name === action.payload.name);

            if (index !== -1) {
                const current = state.pizzaIngredients[index];
                
                if (current == 1) {
                    state.addedIngredients.filter (element => element.name !== action.payload.name)
                }
                // Si quantité > 0, décrémente
                if (current.quantity > 0) {
                    current.quantity -= 1;
                
                    // S'il est maintenant à 0, alors on le met dans la liste "sans"
                    if (current.quantity === 0) {
                        // Ajoute que s’il n'est pas déjà dans la liste
                        if (!state.deletedIngredients.find(el => el.name === current.name)) {
                            state.deletedIngredients.push({ ...current });
                        }
                    }
                }
            }
        },
        supprimerIngredients: (state, action) => {
            state.addedIngredients = state.addedIngredients.filter(
                item => item.name !== action.payload.name
            )
        },
        resetIngredients: (state,) => {
            state.pizzaIngredients = []
            state.addedIngredients = []
            state.suppIngredients = []
        }
    },
})

export const {setPizzaIngredients, ajouterIngredients, supprimerIngredients, resetIngredients, sansIngredients , setSuppIngredients} = IngredientsSlice.actions
export default IngredientsSlice.reducer