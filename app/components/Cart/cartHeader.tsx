"use client";
import useCart from "@/app/stores/CartStore";
import React from "react";

const CartHeader = () => {
  const { cartItems } = useCart();

  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-base font-semibold text-primary">سبد خرید</h1>
        <span className="text-sm text-muted-foreground">
          {cartItems.length} مورد
        </span>
      </div>
    </header>
  );
};

export default CartHeader;
