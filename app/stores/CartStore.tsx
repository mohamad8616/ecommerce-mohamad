import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  productId: number;
  price: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  incrementQuantity: (productId: number, quantity?: number) => void;
  decreaseQuantity: (productId: number) => void;
  recalculateTotalPrice: () => void;
}

const round = (n: number) => Math.round(n * 100) / 100;

const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      totalPrice: 0,

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

      removeFromCart: (productId) => {
        const { cartItems } = get();
        const updated = cartItems.filter((i) => i.productId !== productId);
        const totalPrice = round(
          updated.reduce((sum, i) => sum + i.price * i.quantity, 0),
        );
        set({ cartItems: updated, totalPrice });
      },

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

      recalculateTotalPrice: () => {
        const { cartItems } = get();
        const totalPrice = round(
          cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        );
        set({ totalPrice });
      },
    }),
    {
      name: "cart-storage",
      partialize: (s) => ({
        cartItems: s.cartItems,
        totalPrice: s.totalPrice,
      }),
    },
  ),
);

export default useCart;
