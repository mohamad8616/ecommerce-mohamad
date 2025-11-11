"use client";
import useCart from "@/app/stores/CartStore";
import { cn, price } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import CartItem from "./CartItem";

const CartBtn = () => {
  const pathname = usePathname();
  const isProductPage = pathname.startsWith("/products");
  const { cartItems, totalPrice, recalculateTotalPrice } = useCart();
  const [showCartBtn, setShowCartBtn] = useState(false);
  const [mount, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      recalculateTotalPrice();
    }
  }, [cartItems]);

  // Prevent scroll propagation
  const handleCartScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  // For hide cart items section after purge it
  useEffect(() => {
    if (cartItems.length === 0 && showCartBtn === true) {
      setTimeout(() => {
        setShowCartBtn(false);
      }, 2500);
    }
  }, [showCartBtn]);

  return (
    <>
      {/* small screen btn cart */}
      <Link
        href="/cart"
        className={cn(`relative cursor-pointer text-primary lg:hidden`)}
      >
        {mount && (
          <span className="absolute top-[-5px] right-[-10px] rounded-sm border-2 border-white bg-red-500 px-0.5 text-xs text-white">
            {cartItems.length}
          </span>
        )}
        <IoCartOutline size={24} className="dark:text-white" />
      </Link>

      {/* large screen btn cart */}
      <div className="relative hidden lg:block">
        <button
          onMouseEnter={() => setShowCartBtn(true)}
          onMouseLeave={() => setShowCartBtn(false)}
          className={cn(`relative text-primary`)}
        >
          {mount && (
            <span className="absolute top-[-5px] right-[-10px] rounded-sm border-2 border-white bg-red-500 px-0.5 text-xs text-white">
              {cartItems.length}
            </span>
          )}

          <IoCartOutline size={24} className="text-white" />
        </button>

        {showCartBtn && (
          <div
            className="absolute top-4 left-0 mt-2 w-[550px] rounded-md bg-secondary p-2 text-primary shadow-lg transition-all duration-300 "
            onMouseEnter={() => setShowCartBtn(true)}
            onMouseLeave={() => setShowCartBtn(false)}
          >
            <div className="flex max-h-[500px] flex-col">
              {/* Header - fixed height */}
              <div className="flex-shrink-0 border-b-2 border-amber-500 pb-3">
                <h1 className="text-lg font-semibold text-primary">
                  لیست سبد خرید ({cartItems.length})
                </h1>
              </div>

              {/* Items - scrollable area */}
              <div
                className="flex-1 overflow-y-auto"
                onWheel={handleCartScroll}
              >
                <div className="space-y-2 p-4">
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <CartItem key={index} {...item} />
                    ))
                  ) : (
                    <div className="py-8 text-center">
                      سبد خرید شما خالی است
                    </div>
                  )}
                </div>
              </div>

              {/* Footer - fixed height */}
              {cartItems.length > 0 && (
                <div className="mt-2 flex flex-shrink-0 items-center justify-between gap-2  border-t-2 border-amber-500 pt-3">
                  <span className="font-medium">
                    مجموع قیمت: {price(totalPrice)}
                  </span>
                  <Link
                    href="/checkout"
                    className="flex h-10 flex-1 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setShowCartBtn(false)}
                  >
                    رفتن به صفحه پرداخت
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartBtn;
