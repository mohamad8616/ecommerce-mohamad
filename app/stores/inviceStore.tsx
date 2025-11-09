import { set } from "zod";
import { create } from "zustand";

type InvoiceItem = {
  productId: number;
  quantity: number;
  price: number;
};

type InvoiceState = {
  invoiceItems: InvoiceItem[];
  totalPrice: number;
};
export const useInvoiceStore = create<InvoiceState>((set, get) => ({
  // Initialize from localStorage
  totalPrice: 0,
  invoiceItems:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("invoiceItems") || "[]")
      : [],
  addToTotalPrice: (price: number) => {
    set({ totalPrice: get().totalPrice + price });
  },
  minusFromTotalPrice: (price: number) => {
    set({ totalPrice: get().totalPrice - price });
  },
}));
