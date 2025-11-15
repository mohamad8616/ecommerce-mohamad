import { ScrollArea } from "@/app/components/ui/scroll-area";
import { Separator } from "@/app/components/ui/Separator";

import type { Metadata } from "next";
import { Suspense } from "react";
import CartFooter from "../components/Cart/CartFooter";
import CartHeader from "../components/Cart/cartHeader";
import CartItems from "../components/Cart/cartItems";
import Loading from "../components/Loading";

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "صفحه سبد خرید و صورت‌حساب",
};

const CartPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <CartHeader />
      {/* Cart items */}
      <ScrollArea className="flex-1 px-4 py-2">
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <CartItems />
        </Suspense>
      </ScrollArea>
      <Separator className="my-2" />

      {/* Sticky Bottom Bar */}
      <CartFooter />
    </main>
  );
};

export default CartPage;
