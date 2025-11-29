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

  setUserData: (lastName: string, mobile: string, address: string) => void;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number, quantity?: number) => void;
  decreaseQuantity: (productId: number) => void;
  recalculateTotalPrice: () => void;
  clearCartAndStorage: () => void;
}

const round = (n: number) => Math.round(n * 100) / 100;

const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      totalPrice: 0,
      lastName: "",
      mobile: "",
      address: "",

      //SET USER DATA
      setUserData: (lastName, mobile, address) =>
        set({ lastName, mobile, address }),

      //ADD TO CART
      addToCart: ({ productId, price, quantity = 1 }) => {
        const { cartItems } = get();
        const existing = cartItems.find((i) => i.productId === productId);

        let updated;
        if (existing) {
          updated = cartItems.map((i) =>
            i.productId === productId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        } else {
          updated = [...cartItems, { productId, price, quantity }];
        }

        const totalPrice = round(
          updated.reduce((sum, i) => sum + i.price * i.quantity, 0),
        );

        set({ cartItems: updated, totalPrice });
      },

      //REMOVE FROM CART
      removeFromCart: (productId) => {
        const { cartItems } = get();
        const updated = cartItems.filter((i) => i.productId !== productId);
        const totalPrice = round(
          updated.reduce((sum, i) => sum + i.price * i.quantity, 0),
        );
        set({ cartItems: updated, totalPrice });
      },

      //INCREMENT QUANTITY
      incrementQuantity: (productId, quantity = 1) => {
        const { cartItems } = get();

        const updated = cartItems.map((i) =>
          i.productId === productId
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
        const totalPrice = round(
          updated.reduce((sum, i) => sum + i.price * i.quantity, 0),
        );
        set({ cartItems: updated, totalPrice });
      },

      //DECREASE QUANTITY
      decreaseQuantity: (productId) => {
        const { cartItems } = get();

        const updated = cartItems
          .map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i,
          )
          .filter((i) => i.quantity > 0);

        const totalPrice = round(
          updated.reduce((sum, i) => sum + i.price * i.quantity, 0),
        );
        set({ cartItems: updated, totalPrice });
      },

      //RECALCULATE TOTAL PRICE
      recalculateTotalPrice: () => {
        const { cartItems } = get();
        const totalPrice = round(
          cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        );
        set({ totalPrice });
      },

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
    }),

    // persist options(local storage)
    {
      name: "cart-storage",
      partialize: (s) => ({
        cartItems: s.cartItems,
        totalPrice: s.totalPrice,
        lastName: s.lastName,
        mobile: s.mobile,
        address: s.address,
      }),
    },
  ),
);

export default useCart;

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
