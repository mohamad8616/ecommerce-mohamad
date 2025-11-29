import { create } from "zustand";

type InvoiceItem = {
  productId: number;
  quantity: number;
  price: number;
};

type InvoiceState = {
  invoiceItems: InvoiceItem[];
  totalPrice: number;

  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  address?: string;

  // Actions
  addItem: (item: InvoiceItem) => void;
  removeItem: (productId: number) => void;
  clearInvoice: () => void;

  setUserData: (
    data: Partial<
      Omit<
        InvoiceState,
        | "invoiceItems"
        | "totalPrice"
        | "addItem"
        | "removeItem"
        | "clearInvoice"
        | "setUserData"
      >
    >,
  ) => void;
};

export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  // Initialize from localStorage safely (SSR compatible)
  invoiceItems:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("invoiceItems") || "[]")
      : [],

  totalPrice:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("totalPrice") || "0")
      : 0,

  // ACTIONS ------------------------------------------------

  addItem: (item) => {
    const { invoiceItems } = get();

    // check if exists
    const existing = invoiceItems.find((i) => i.productId === item.productId);

    let updatedItems;

    if (existing) {
      updatedItems = invoiceItems.map((i) =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i,
      );
    } else {
      updatedItems = [...invoiceItems, item];
    }

    const total = updatedItems.reduce(
      (sum, i) => sum + i.quantity * i.price,
      0,
    );

    set({ invoiceItems: updatedItems, totalPrice: total });

    if (typeof window !== "undefined") {
      localStorage.setItem("invoiceItems", JSON.stringify(updatedItems));
      localStorage.setItem("totalPrice", JSON.stringify(total));
    }
  },

  removeItem: (productId) => {
    const updated = get().invoiceItems.filter((i) => i.productId !== productId);
    const total = updated.reduce((sum, i) => sum + i.quantity * i.price, 0);

    set({ invoiceItems: updated, totalPrice: total });

    if (typeof window !== "undefined") {
      localStorage.setItem("invoiceItems", JSON.stringify(updated));
      localStorage.setItem("totalPrice", JSON.stringify(total));
    }
  },

  clearInvoice: () => {
    set({ invoiceItems: [], totalPrice: 0 });

    if (typeof window !== "undefined") {
      localStorage.removeItem("invoiceItems");
      localStorage.removeItem("totalPrice");
    }
  },

  // USER DATA -------------------------------------------------

  setUserData: (data) => {
    set(data);

    if (typeof window !== "undefined") {
      Object.entries(data).forEach(([key, value]) => {
        localStorage.setItem(key, JSON.stringify(value));
      });
    }
  },
}));
