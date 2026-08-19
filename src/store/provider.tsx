"use client";

import { Provider } from "react-redux";
import { store } from "./index";

import { useEffect } from "react";
import { initializeCart } from "./slices/cartSlice";
import { initializeWishlist } from "./slices/wishlistSlice";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initializeCart());
    store.dispatch(initializeWishlist());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
