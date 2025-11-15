"use client";
import useCart from "@/app/stores/CartStore";
import { price } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/Button";
const CartFooter = () => {
  const { cartItems, totalPrice } = useCart();

  return (
    <footer className="sticky bottom-0 z-20 border-t bg-background px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">مجموع:</span>
        <span className="text-base font-semibold text-foreground">
          {price(totalPrice)}
        </span>
      </div>
      <Link href="/invoice">
        <Button
          className="w-full text-sm font-medium"
          size="lg"
          disabled={cartItems.length === 0}
        >
          تکمیل خرید
        </Button>
      </Link>
    </footer>
  );
};

export default CartFooter;
