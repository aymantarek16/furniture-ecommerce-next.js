import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../utils/localStorage";

// =============================
// Initial State
// Load cart state from localStorage (if available)
// =============================
const initialState = { ...loadState(), toast: null };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ==========================================
    // addToCart
    // - If the item already exists in cart → increase quantity
    // - If it's a new item → push it with quantity = 1
    // ==========================================
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      saveState(state);
    },

    // ==========================================
    // removeFromCart
    // - Removes item completely from cart by its ID
    // ==========================================
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      saveState(state);
    },

    // ==========================================
    // updateQuantity
    // - Increases or decreases item quantity by "delta"
    // - If quantity goes <= 0 → remove item from cart
    // ==========================================
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        if (item.quantity === 1 && delta === -1) {
          state.toast = "Quantity cannot be less than 1";
        } else {
          item.quantity = Math.max(1, item.quantity + delta);
          state.toast = null;
        }
      }

      saveState(state);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
