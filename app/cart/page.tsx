"use client";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent } from "@/app/components/ui/card";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/Separator";
import useCart from "../stores/CartStore";
import CartItem from "../components/Cart/CartItem";

const CartPage = () => {
  const { cartItems, totalPrice } = useCart();

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-base font-semibold text-primary">سبد خرید</h1>
          <span className="text-sm text-muted-foreground">
            {cartItems.length} مورد
          </span>
        </div>
      </header>

      {/* Cart items */}
      <ScrollArea className="flex-1 px-4 py-2">
        {cartItems.length === 0 ? (
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
        )}
      </ScrollArea>

      <Separator className="my-2" />

      {/* Sticky Bottom Bar */}
      <footer className="sticky bottom-0 z-20 border-t bg-background px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">مجموع:</span>
          <span className="text-base font-semibold text-foreground">
            {totalPrice.toLocaleString()} تومان
          </span>
        </div>
        <Button
          className="w-full text-sm font-medium"
          size="lg"
          disabled={cartItems.length === 0}
        >
          تکمیل خرید
        </Button>
      </footer>
    </main>
  );
};

export default CartPage;
