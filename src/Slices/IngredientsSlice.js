import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPizza: null,
  baseIngredients: [],
  addedIngredients: [],
  removedIngredients: [],
  customIngredients: [],
  allSuppIngredients: [],
  totalPrice: 0,
  basePrice: 0,
  cart: [],
  editingPizzaIndex: null,
};

export const IngredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    selectPizza: (state, action) => {
      const pizza = action.payload;

      state.selectedPizza = pizza;
      state.baseIngredients = pizza.ingredients.map((i) => ({...i, quantity: 1}));
      state.addedIngredients = [];
      state.removedIngredients = [];
      state.customIngredients = [];
      state.totalPrice = pizza.price;
      state.basePrice = pizza.price;
    },

    setSuppIngredients: (state, action) => {
      state.allSuppIngredients = action.payload;
    },

    addIngredient: (state, action) => {
      const ing = action.payload;
      const isBase = state.selectedPizza.ingredients.some((i) => i.name === ing.name);
      const existing = state.baseIngredients.find((i) => i.name === ing.name);

      if (ing.quantity >= 2) {
        return
      }

      if (existing) {
        // Ingrédient déjà dans baseIngredients
        if (existing.quantity === 0 && isBase) {
          // Cas : remise d'un ingrédient de base retiré → sans supplément
          existing.quantity = 1;
          state.removedIngredients = state.removedIngredients.filter((i) => i.name !== ing.name);
          return;
        }

        existing.quantity += 1;

        if (isBase) {
          if (existing.quantity === 2) {
            // Premier supplément
            state.totalPrice += Number(ing.price);
            state.basePrice += Number(ing.price);
            state.addedIngredients.push({ ...existing, quantity: 1 });
          } else {
            state.totalPrice += Number(ing.price);
            state.basePrice += Number(ing.price);
            const added = state.addedIngredients.find(
              (i) => i.name === ing.name
            );
            if (added) added.quantity += 1;
          }
        } else {
          // Custom existant
          state.totalPrice += Number(ing.price);
          state.basePrice += Number(ing.price);

          const custom = state.customIngredients.find(
            (i) => i.name === ing.name
          );
          if (custom) custom.quantity = existing.quantity;

          const added = state.addedIngredients.find(
            (i) => i.name === ing.name
          );
          if (added) {
            added.quantity = existing.quantity;
          } else {
            state.addedIngredients.push({ ...existing });
          }
        }
      } else {
        // Nouvel ingrédient custom
        const newIng = { ...ing, quantity: 1 };
        state.baseIngredients.push(newIng);
        state.customIngredients.push({ ...newIng });
        state.addedIngredients.push({ ...newIng });
        state.totalPrice += Number(ing.price);
        state.basePrice += Number(ing.price);
      }
    },

    removeIngredient: (state, action) => {
      const ing = action.payload;
      const isBase = state.selectedPizza.ingredients.some(
        (i) => i.name === ing.name
      );
      const existing = state.baseIngredients.find((i) => i.name === ing.name);

      if (!existing) return;

      if (existing.quantity > 1) {
        existing.quantity -= 1;

        if (isBase) {
          // Supplément d’un ingrédient de base
          state.totalPrice -= Number(ing.price);
          state.basePrice -= Number(ing.price);

          const added = state.addedIngredients.find(
            (i) => i.name === ing.name
          );
          if (added) {
            if (existing.quantity === 1) {
              // Revenu à quantité normale
              state.addedIngredients = state.addedIngredients.filter(
                (i) => i.name !== ing.name
              );
            } else {
              added.quantity -= 1;
            }
          }
        } else {
          // Custom → décrémenter normalement
          state.totalPrice -= Number(ing.price);
          state.basePrice -= Number(ing.price);

          const custom = state.customIngredients.find(
            (i) => i.name === ing.name
          );
          if (custom) custom.quantity = existing.quantity;

          const added = state.addedIngredients.find(
            (i) => i.name === ing.name
          );
          if (added) added.quantity = existing.quantity;
        }
      } else {
        // Quantité va passer à 0
        if (isBase) {
          existing.quantity = 0;

          if (
            !state.removedIngredients.find((i) => i.name === ing.name)
          ) {
            state.removedIngredients.push({ ...ing });
          }

          state.addedIngredients = state.addedIngredients.filter(
            (i) => i.name !== ing.name
          );
        } else {
          // Custom → on retire totalement
          state.totalPrice -= Number(ing.price);
          state.basePrice -= Number(ing.price);
          state.baseIngredients = state.baseIngredients.filter(
            (i) => i.name !== ing.name
          );
          state.customIngredients = state.customIngredients.filter(
            (i) => i.name !== ing.name
          );
          state.addedIngredients = state.addedIngredients.filter(
            (i) => i.name !== ing.name
          );
        }
      }
    },

    confirmPizza: (state) => {
      const newPizza = {
        id: Date.now(),
        ...state.selectedPizza,
        ingredients: [...state.baseIngredients],
        added: [...state.addedIngredients],
        removed: [...state.removedIngredients],
        custom: [...state.customIngredients],
        basePrice : state.basePrice,
        totalPrice: state.totalPrice,
        quantity: 1,
      };

      if (state.editingPizzaIndex !== null) {
        state.cart[state.editingPizzaIndex] = newPizza;
      } else {
        state.cart.push(newPizza);
      }

      // Reset
      state.selectedPizza = null;
      state.baseIngredients = [];
      state.addedIngredients = [];
      state.removedIngredients = [];
      state.customIngredients = [];
      state.totalPrice = 0;
      state.editingPizzaIndex = null;
    },

    loadPizzaForEdit: (state, action) => {
      const { pizza, index } = action.payload;

      state.selectedPizza = pizza;
      state.editingPizzaIndex = index;
      state.baseIngredients = pizza.ingredients.map((i) => ({ ...i }));
      state.addedIngredients = pizza.added ?? [];
      state.removedIngredients = pizza.removed ?? [];
      state.customIngredients = pizza.custom ?? [];
      state.totalPrice = pizza.totalPrice;
    },

    cancelEdit: (state) => {
      state.selectedPizza = null;
      state.baseIngredients = [];
      state.addedIngredients = [];
      state.removedIngredients = [];
      state.customIngredients = [];
      state.totalPrice = 0;
      state.editingPizzaIndex = null;
    },

    clearCart: (state) => {
      state.cart = [];
    },
    deletePizza: (state, action) => {
        state.cart = state.cart.filter(pizza => pizza.id !== action.payload)
    },
    incrementer: (state, action) => {
        const item = state.cart.find(p => p.id === action.payload)

        if (item) {
            item.quantity += 1
            item.totalPrice = item.totalPrice + item.basePrice
        }
    },
    decrementer: (state, action) => {
        const item = state.cart.find(p => p.id === action.payload)

        if ( item && item.quantity == 1) {
            state.cart = state.cart.filter(pizza => pizza.id !== action.payload)
        }
        else {
            item.quantity -= 1
            item.totalPrice = item.totalPrice - item.basePrice
        }
    }
  },
});

export const {
  selectPizza,
  setSuppIngredients,
  addIngredient,
  removeIngredient,
  confirmPizza,
  loadPizzaForEdit,
  cancelEdit,
  clearCart,
  deletePizza,
  incrementer,
  decrementer
} = IngredientsSlice.actions;

export default IngredientsSlice.reducer;
