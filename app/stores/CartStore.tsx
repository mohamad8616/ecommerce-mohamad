import { create } from "zustand";

interface CartState {
  cartItems: { productId: number; quantity: number }[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

const useCart = create<CartState>((set, get) => ({
  // Initialize from localStorage
  cartItems:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems") || "[]")
      : [],

  getTotalPrice: async () => {
    return get().cartItems.reduce((acc, item) => {
      const price = await getProductPrice(item.productId);
      return acc + item.quantity * price;
    }, 0);
  },

  addToCart: (productId: number) => {
    const newCartItems = [...get().cartItems, { productId, quantity: 1 }];

    // Update localStorage first
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }

    // Then update state
    set({ cartItems: newCartItems });
  },

  removeFromCart: (productId: number) => {
    const newCartItems = get().cartItems.filter(
      (item) => item.productId !== productId,
    );

    // Update localStorage first
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }

    // Then update state
    set({ cartItems: newCartItems });
  },

  incrementQuantity: (productId: number) => {
    const newCartItems = get().cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );

    // Update localStorage first
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }

    // Then update state
    set({ cartItems: newCartItems });
  },
  decreaseQuantity: (productId: number) => {
    if (get().cartItems.find((item) => item.productId === productId)) {
      if (get().cartItems.find((item) => item.quantity === 1)) {
        return get().removeFromCart(productId);
      }
    }
    const newCartItems = get().cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );

    // Update localStorage first
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }

    // Then update state
    set({ cartItems: newCartItems });
  },
}));

export default useCart;
