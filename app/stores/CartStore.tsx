import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: number;
  price: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  lastName?: string;
  mobile?: string;
  address?: string;

  addToCart: (productId: number, price: number, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCartAndStorage: () => void;
  setUserData: (lastName: string, mobile: string, address: string) => void;
  getItemQuantity: (productId: number) => number;
}

const round = (n: number) => Math.round(n * 100) / 100;

const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      totalPrice: 0,
      lastName: undefined,
      mobile: undefined,
      address: undefined,

      //CLEAR CART
      clearCartAndStorage: () => {
        set({
          cartItems: [],
          totalPrice: 0,
          lastName: undefined,
          mobile: undefined,
          address: undefined,
        });
        localStorage.removeItem("cart-storage"); // ← This is key!
      },

      //ADD TO CART
      addToCart: (productId, price, quantity = 1) =>
        set((state) => {
          const existing = state.cartItems.find(
            (i) => i.productId === productId,
          );
          const cartItems = existing
            ? state.cartItems.map((i) =>
                i.productId === productId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              )
            : [...state.cartItems, { productId, price, quantity }];

          return {
            cartItems,
            totalPrice: round(
              cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
            ),
          };
        }),

      //REMOVE FROM CART
      removeFromCart: (productId) =>
        set((state) => {
          const cartItems = state.cartItems.filter(
            (i) => i.productId !== productId,
          );
          return {
            cartItems,
            totalPrice: round(
              cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
            ),
          };
        }),

      //UPDATE QUANTITY
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => {
          const cartItems = state.cartItems.map((i) =>
            i.productId === productId ? { ...i, quantity } : i,
          );
          return {
            cartItems,
            totalPrice: round(
              cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
            ),
          };
        });
      },

      //SET USER DATA
      setUserData: (lastName, mobile, address) =>
        set({ lastName, mobile, address }),

      getItemQuantity: (productId) =>
        get().cartItems.find((i) => i.productId === productId)?.quantity ?? 0,
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
        lastName: state.lastName,
        mobile: state.mobile,
        address: state.address,
      }),
    },
  ),
);

// Safe hydration listener (FIXED!)
if (typeof window !== "undefined") {
  setTimeout(() => {
    useCart.persist.onFinishHydration?.((state) => {
      console.log("Zustand cart hydrated:", state);
    });
  }, 0);
}

// Hydration hook
export const useCartHydrated = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(useCart.persist.hasHydrated());

    const unsub = useCart.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    return unsub;
  }, []);

  return hydrated;
};

export default useCart;
