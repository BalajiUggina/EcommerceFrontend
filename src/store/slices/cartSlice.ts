import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/src/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface CartState {
  items: CartItem[];
}

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] } as CartState,
  reducers: {
    initializeCart: (state) => {
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("cart");
          if (stored) {
            state.items = JSON.parse(stored);
          }
        } catch (e) {
          console.error("Failed to load cart from localStorage", e);
        }
      }
    },
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
        size?: string;
        color?: string;
      }>
    ) => {
      const { product, quantity, size = "M", color } = action.payload;
      const finalColor = color || (product.colors && product.colors[0]) || "";
      const finalSize = size || (product.sizes && product.sizes[0]) || "M";

      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === finalSize &&
          item.selectedColor === finalColor
      );

      if (existingIndex > -1) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          selectedSize: finalSize,
          selectedColor: finalColor,
        });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ id: number; size: string; color: string }>
    ) => {
      const { id, size, color } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.product.id === id &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      );
      saveCartToStorage(state.items);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; size: string; color: string; quantity: number }>
    ) => {
      const { id, size, color, quantity } = action.payload;
      const existing = state.items.find(
        (item) =>
          item.product.id === id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );
      if (existing && quantity > 0) {
        existing.quantity = quantity;
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage([]);
    },
  },
});

export const { initializeCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
