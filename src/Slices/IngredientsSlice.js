import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    pizzaIngredients : [],
    pizzaIngredientsInital : [],
    suppIngredients: [],
    addedIngredients: [],
    deletedIngredients: [],
}


export const IngredientsSlice = createSlice({
    name: "ingredients",
    initialState,
    reducers: {
        setIngredientsInital: (state, action) => {
            state.pizzaIngredientsInital = action.payload
        },
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
                const existe = state.addedIngredients.find(ing => ing.name === action.payload.name)
                state.suppIngredients = state.suppIngredients.filter(element => element.name !== action.payload.name)
                
                if (existe) {
                    existe.quantity += 1
                }
                else {
                    state.addedIngredients.push({ ...action.payload, quantity: 1 });
                    state.pizzaIngredients.push({...action.payload, quantity: 1})
                }
            }
        },
        sansIngredients: (state, action) => {
            const index = state.pizzaIngredients.findIndex(el => el.name === action.payload.name);
            const isInitial = state.pizzaIngredientsInital.find(el => el.name === action.payload.name);

            if (index !== -1) {
                const current = state.pizzaIngredients[index];
            
                // Si ce n'était pas un ingrédient initial
                if (!isInitial) {
                    // Supprimer de la pizza
                    state.pizzaIngredients = state.pizzaIngredients.filter(el => el.name !== action.payload.name);
                
                    // Supprimer des ajouts
                    state.addedIngredients = state.addedIngredients.filter(el => el.name !== action.payload.name);
                
                    // Remettre dans les ingrédients supp si pas déjà présent
                    if (!state.suppIngredients.find(el => el.name === action.payload.name)) {
                        state.suppIngredients.push({ ...action.payload });
                    }
                
                    return; // On sort ici, rien à décrémenter
                }
            
                // Si ingrédient initial
                if (current.quantity > 0) {
                    current.quantity -= 1;
                
                    // Supprimer des ajouts s'il y était
                    state.addedIngredients = state.addedIngredients.filter(el => el.name !== action.payload.name);
                
                    // Si quantité est maintenant à 0, on ajoute dans les "sans"
                    if (current.quantity === 0) {
                        const alreadyInDeleted = state.deletedIngredients.find(el => el.name === current.name);
                        if (!alreadyInDeleted) {
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

export const {setIngredientsInital , setPizzaIngredients, ajouterIngredients, supprimerIngredients, resetIngredients, sansIngredients , setSuppIngredients} = IngredientsSlice.actions
export default IngredientsSlice.reducer