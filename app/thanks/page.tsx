"use client";

import { createInvoiceAction } from "@/lib/actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/Button";
import { toast } from "sonner";
import useCart from "../stores/CartStore";

export default function ThanksPage() {
  const clearCartAndStorage = useCart((s) => s.clearCartAndStorage);
  const searchParams = useSearchParams();
  const status = searchParams.get("Status");
  const authority = searchParams.get("Authority");

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "OK" || !authority) {
      setIsProcessing(false);
      return;
    }

    // Read directly from localStorage — 100% reliable
    const raw = localStorage.getItem("cart-storage");
    if (!raw) {
      setError("سبد خرید یافت نشد");
      setIsProcessing(false);
      return;
    }

    let cartData;
    try {
      cartData = JSON.parse(raw);
    } catch {
      setError("داده سبد خرید خراب است");
      setIsProcessing(false);
      return;
    }

    const { cartItems, totalPrice, lastName, mobile, address } = cartData.state;
    console.log(cartData.state);

    if (
      !cartItems ||
      cartItems.length === 0 ||
      !lastName ||
      !mobile ||
      !address
    ) {
      setError("اطلاعات سفارش ناقص است");
      setIsProcessing(false);
      return;
    }

    // Now safely create invoice
    async function saveOrder() {
      try {
        const result = await createInvoiceAction({
          items: cartItems,
          totalPrice: totalPrice.toString(),
          lastName,
          mobile,
          address,
          authority,
        });

        if (result.success) {
          // Only NOW clear localStorage + show success
          clearCartAndStorage?.();
          localStorage.removeItem("cart-storage");
          sessionStorage.setItem(`order_${authority}`, "completed");
          toast.success("سفارش با موفقیت ثبت شد");
        } else {
          toast.error(result.error || "خطا در ثبت سفارش");
          setError(result.error || "خطا در ثبت سفارش");
        }
      } catch (err) {
        toast.error("خطا در ارتباط با سرور");
        setError("خطا در ثبت سفارش");
        console.error(err);
      } finally {
        setIsProcessing(false);
      }
    }

    saveOrder();
  }, [authority, status, clearCartAndStorage]);

  // Failed payment
  if (status !== "OK") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl text-red-600">پرداخت ناموفق</h1>
          <Link href="/cart">
            <Button>بازگشت به سبد خرید</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p>در حال ثبت سفارش...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl text-red-600">خطا</h1>
          <p>{error}</p>
          <Link href="/support">
            <Button>تماس با پشتیبانی</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold text-green-600">پرداخت موفق!</h1>
        <p className="text-lg">سفارش شما با موفقیت ثبت شد</p>
        <p>شماره تراکنش: {authority}</p>
        <Link href="/">
          <Button size="lg">بازگشت به خانه</Button>
        </Link>
      </div>
    </div>
  );
}
