import { create } from "zustand";

interface CartState {
  cartItems: string[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}

const useCart = create<CartState>((set, get) => ({
  // Initialize from localStorage
  cartItems:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems") || "[]")
      : [],

  addToCart: (productId: string) => {
    const newCartItems = [...get().cartItems, productId];

    // Update localStorage first
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }

    // Then update state
    set({ cartItems: newCartItems });
  },

  removeFromCart: (productId: string) => {
    const newCartItems = get().cartItems.filter((id) => id !== productId);

    // Update localStorage first
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }

    // Then update state
    set({ cartItems: newCartItems });
  },
}));
