"use client";
import useCart from "@/app/stores/CartStore";
import React from "react";
import CartItem from "./CartItem";

const CartItems = () => {
  const { cartItems } = useCart();

  {
    return cartItems.length === 0 ? (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <p className="mb-2 text-sm text-muted-foreground">
          سبد خرید شما خالی است
        </p>
        <p className="text-xs text-muted-foreground">
          برای شروع، محصولی را به سبد اضافه کنید.
        </p>
      </div>
    ) : (
      <div className="space-y-3">
        {cartItems.map((item, index) => (
          <CartItem key={index} {...item} />
        ))}
      </div>
    );
  }
};

export default CartItems;
