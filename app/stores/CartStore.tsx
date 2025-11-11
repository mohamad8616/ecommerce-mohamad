// import { create } from "zustand";

// interface CartState {
//   cartItems: { productId: number; quantity: number }[];
//   totalPrice: number;
//   addToCart: (productId: number, quantity?: number) => void;
//   removeFromCart: (productId: number) => void;
//   incrementQuantity: (productId: number, quantity?: number) => void;
//   decreaseQuantity: (productId: number) => void;
//   addToPrice: (price: number) => void;
//   removeFromPrice: (price: number) => void;
//   setTotalPrice: (price: number) => void;
// }

// const useCart = create<CartState>((set, get) => ({
//   // Initialize from localStorage
//   cartItems:
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("cartItems") || "[]")
//       : [],

//   totalPrice:
//     typeof window !== "undefined"
//       ? JSON.parse(localStorage.getItem("totalPrice") || "0")
//       : 0,

//   setTotalPrice: (price: number) => {
//     set({ totalPrice: price });
//     if (typeof window !== "undefined") {
//       localStorage.setItem("totalPrice", JSON.stringify(price));
//     }
//   },

//   addToPrice: (price: number) => {
//     set({ totalPrice: get().totalPrice + price });
//   },
//   removeFromPrice: (price: number) => {
//     set({ totalPrice: get().totalPrice - price });
//   },

//   addToCart: (productId: number, quantity?: number) => {
//     if (get().cartItems.find((item) => item.productId === productId)) {
//       return get().incrementQuantity(productId, quantity);
//     }
//     const newCartItems = [
//       ...get().cartItems,
//       { productId, quantity: quantity || 1 },
//     ];

//     // Update localStorage first
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cartItems", JSON.stringify(newCartItems));
//     }

//     // Then update state
//     set({ cartItems: newCartItems });
//   },

//   removeFromCart: (productId: number) => {
//     const newCartItems = get().cartItems.filter(
//       (item) => item.productId !== productId,
//     );

//     // Update localStorage first
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cartItems", JSON.stringify(newCartItems));
//     }

//     // Then update state
//     set({ cartItems: newCartItems });
//   },

//   incrementQuantity: (productId: number, quantity?: number) => {
//     const newCartItems = get().cartItems.map((item) =>
//       item.productId === productId
//         ? { ...item, quantity: item.quantity + (quantity || 1) }
//         : item,
//     );

//     // Update localStorage first
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cartItems", JSON.stringify(newCartItems));
//     }

//     // Then update state
//     set({ cartItems: newCartItems });
//   },
//   decreaseQuantity: (productId: number, quantity?: number) => {
//     if (get().cartItems.find((item) => item.productId === productId)) {
//       if (get().cartItems.find((item) => item.quantity === 1)) {
//         return get().removeFromCart(productId);
//       }
//     }
//     const newCartItems = get().cartItems.map((item) =>
//       item.productId === productId
//         ? { ...item, quantity: item.quantity - 1 }
//         : item,
//     );

//     // Update localStorage first
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cartItems", JSON.stringify(newCartItems));
//     }

//     // Then update state
//     set({ cartItems: newCartItems });
//   },
// }));

// export default useCart;
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface CartItem {
//   productId: number;
//   quantity: number;
// }

// interface CartState {
//   cartItems: CartItem[];
//   totalPrice: number;
//   addToCart: (productId: number, price: number, quantity?: number) => void;
//   removeFromCart: (productId: number, price: number) => void;
//   incrementQuantity: (
//     productId: number,
//     price: number,
//     quantity?: number,
//   ) => void;
//   decreaseQuantity: (productId: number, price: number) => void;
//   addToPrice: (price: number) => void;
//   removeFromPrice: (price: number) => void;
//   setTotalPrice: (price: number) => void;
//   // Helper method to recalculate total price from cart items
//   recalculateTotalPrice: (
//     getProductPrice: (productId: number) => number,
//   ) => void;
// }

// const useCart = create<CartState>()(
//   persist(
//     (set, get) => ({
//       cartItems: [],
//       totalPrice: 0,

//       addToCart: (productId: number, price: number, quantity?: number) => {
//         if (quantity && quantity <= 0) return;

//         const { cartItems } = get();
//         const existingItem = cartItems.find(
//           (item) => item.productId === productId,
//         );

//         if (existingItem) {
//           get().incrementQuantity(productId, price, quantity || 1);
//           // get().recalculateTotalPrice((id) => (id === productId ? price : 0));
//         } else {
//           const newCartItems = [
//             ...cartItems,
//             { productId, quantity: quantity || 1 },
//           ];
//           set({
//             cartItems: newCartItems,
//             totalPrice: get().totalPrice + price * (quantity || 1),
//           });
//         }
//       },

//       removeFromCart: (productId: number, price: number) => {
//         const { cartItems } = get();
//         const itemToRemove = cartItems.find(
//           (item) => item.productId === productId,
//         );

//         if (!itemToRemove) return;

//         const priceToRemove = price * itemToRemove.quantity;
//         const newCartItems = cartItems.filter(
//           (item) => item.productId !== productId,
//         );

//         set({
//           cartItems: newCartItems,
//           totalPrice: Math.max(0, get().totalPrice - priceToRemove),
//         });
//       },

//       incrementQuantity: (
//         productId: number,
//         price: number,
//         quantity: number = 1,
//       ) => {
//         const { cartItems } = get();
//         const newCartItems = cartItems.map((item) =>
//           item.productId === productId
//             ? { ...item, quantity: item.quantity + quantity }
//             : item,
//         );

//         set({
//           cartItems: newCartItems,
//           totalPrice: get().totalPrice + price * quantity,
//         });
//       },

//       decreaseQuantity: (productId: number, price: number) => {
//         const { cartItems } = get();
//         const existingItem = cartItems.find(
//           (item) => item.productId === productId,
//         );

//         if (!existingItem) return;

//         if (existingItem.quantity === 1) {
//           get().removeFromCart(productId, price);
//         } else {
//           const newCartItems = cartItems.map((item) =>
//             item.productId === productId
//               ? { ...item, quantity: item.quantity - 1 }
//               : item,
//           );
//           set({
//             cartItems: newCartItems,
//             totalPrice: Math.max(0, get().totalPrice - price),
//           });
//         }
//       },

//       addToPrice: (price: number) => {
//         set({ totalPrice: get().totalPrice + price });
//       },

//       removeFromPrice: (price: number) => {
//         set({ totalPrice: Math.max(0, get().totalPrice - price) });
//       },

//       setTotalPrice: (price: number) => {
//         set({ totalPrice: price });
//       },

//       recalculateTotalPrice: (
//         getProductPrice: (productId: number) => number,
//       ) => {
//         const { cartItems } = get();
//         const newTotalPrice = cartItems.reduce((total, item) => {
//           return total + getProductPrice(item.productId) * item.quantity;
//         }, 0);

//         set({ totalPrice: newTotalPrice });
//       },
//     }),
//     {
//       name: "cart-storage",
//       partialize: (state) => ({
//         cartItems: state.cartItems,
//         totalPrice: state.totalPrice,
//       }),
//     },
//   ),
// );
// export default useCart;
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
