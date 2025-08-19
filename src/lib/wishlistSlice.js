import { createSlice } from "@reduxjs/toolkit";
import { loadWishlist, saveWishlist } from "@/utils/localStorage";

const initialState = loadWishlist();

// create wishlist slice to manage wishlist state and actions
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // add item to wishlist if it's not already there
    addToWishlist: (state, { payload }) => {
      if (!state.items.find((i) => i.id === payload.id)) {
        state.items.push(payload);
        saveWishlist(state);
      }
    },

    // remove item from wishlist by id
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlist(state);
    },
  },
});

// export actions and reducer for use in redux store
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
