import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/src/types/product";

export interface WishlistState {
  items: Product[];
}

const saveWishlistToStorage = (items: Product[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("wishlist", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [] } as WishlistState,
  reducers: {
    initializeWishlist: (state) => {
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("wishlist");
          if (stored) {
            state.items = JSON.parse(stored);
          }
        } catch (e) {
          console.error("Failed to load wishlist from localStorage", e);
        }
      }
    },
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existsIndex = state.items.findIndex((item) => item.id === product.id);
      if (existsIndex > -1) {
        state.items.splice(existsIndex, 1);
      } else {
        state.items.push(product);
      }
      saveWishlistToStorage(state.items);
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage([]);
    },
  },
});

export const { initializeWishlist, toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
