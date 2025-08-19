// ==============================================
//  Local Storage For CartItems
//  ==============================================
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return { items: [] };
    return JSON.parse(serializedState);
  } catch (e) {
    return { items: [] };
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.error("Error saving state", e);
  }
};

// ==============================================
//  Local Storage For WishListItems
//  ==============================================

export const loadWishlist = () => {
  try {
    const serializedState = localStorage.getItem("wishlist");
    if (serializedState === null) return { items: [] };
    return JSON.parse(serializedState);
  } catch (e) {
    return { items: [] };
  }
};

export const saveWishlist = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("wishlist", serializedState);
  } catch (e) {
    console.error("Error saving wishlist", e);
  }
};
