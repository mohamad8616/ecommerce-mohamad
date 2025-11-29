"use client";

import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { Separator } from "@/app/components/ui/Separator";
import { Textarea } from "@/app/components/ui/textarea";
import { price } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import useCart from "../../stores/CartStore";
import { Button } from "../ui/Button";
import { redirect } from "next/navigation";
import initiatePayment from "@/lib/actions";

const formSchema = z.object({
  firstName: z.string().min(3, "نام باید حداقل 3 کاراکتر باشد"),
  lastName: z.string().min(3, "نام خانوادگی باید حداقل 3 کاراکتر باشد"),
  email: z.string().email({ message: "ایمیل معتبر نیست" }),
  mobile: z.string().regex(/^\d{11}$/, "شماره موبایل باید 11 رقم باشد"),
  address: z.string().min(10, "آدرس باید حداقل 10 کاراکتر باشد"),
});

type FormValues = z.infer<typeof formSchema>;

const ErrorText = ({ message, id }: { message?: string; id: string }) =>
  message ? (
    <p id={id} className="text-sm text-red-500">
      {message}
    </p>
  ) : null;

const InvoiceForm = ({ email, name }: { email: string; name: string }) => {
  // Get cart data from store
  const { totalPrice, cartItems, setUserData } = useCart();

  //React hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const formattedTotalPrice = useMemo(() => price(totalPrice), [totalPrice]);

  async function onSubmit(data: FormValues) {
    //Create form data and fill
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("items", JSON.stringify(cartItems));
    formData.append("totalPrice", totalPrice.toString());

    // Save user data to store and local storage
    setUserData(data.lastName, data.mobile, data.address);

    // Initiate payment
    const response = await initiatePayment(formData);
    const authority = response.data.authority;
    if (authority)
      redirect(`https://sandbox.zarinpal.com/pg/StartPay/${authority}`);
  }

  return (
    <form
      className="relative space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* First Name */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="firstName">نام</Label>
          <Input
            id="firstName"
            placeholder="نام خود را وارد کنید"
            autoComplete="given-name"
            aria-invalid={!!errors.firstName}
            aria-describedby="firstName-error"
            disabled={true}
            defaultValue={name}
            {...register("firstName")}
          />
          <ErrorText id="firstName-error" message={errors.firstName?.message} />
        </div>

        {/* Last Name */}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="lastName">نام خانوادگی</Label>
          <Input
            id="lastName"
            placeholder="نام خانوادگی خود را وارد کنید"
            autoComplete="family-name"
            aria-invalid={!!errors.lastName}
            aria-describedby="lastName-error"
            disabled={isSubmitting}
            {...register("lastName")}
          />
          <ErrorText id="lastName-error" message={errors.lastName?.message} />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="email">ایمیل</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
          disabled={true}
          defaultValue={email}
          {...register("email")}
        />
        <ErrorText id="email-error" message={errors.email?.message} />
      </div>

      {/* Mobile */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="mobile">شماره موبایل</Label>
        <Input
          id="mobile"
          type="tel"
          inputMode="numeric"
          pattern="^\d{11}$"
          placeholder="0912XXXXXXX"
          aria-invalid={!!errors.mobile}
          aria-describedby="mobile-error"
          disabled={isSubmitting}
          {...register("mobile")}
        />
        <ErrorText id="mobile-error" message={errors.mobile?.message} />
      </div>

      {/* Address */}
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="address">آدرس</Label>
        <Textarea
          id="address"
          placeholder="آدرس دقیق محل تحویل را وارد کنید"
          rows={3}
          autoComplete="street-address"
          aria-invalid={!!errors.address}
          aria-describedby="address-error"
          disabled={isSubmitting}
          {...register("address")}
        />
        <ErrorText id="address-error" message={errors.address?.message} />
      </div>

      <Separator className="my-4" />

      <div className="hidden items-center justify-between md:flex">
        <span className="text-sm text-muted-foreground">مجموع کل:</span>
        <span className="text-base font-semibold text-primary">
          {formattedTotalPrice}
        </span>
      </div>

      <div className="hidden md:block">
        <Button
          type="submit"
          className="w-full bg-blue-700 text-sm font-semibold tracking-wide text-blue-50"
          size="lg"
          disabled={totalPrice === 0 || isSubmitting}
        >
          تکمیل خرید و رفتن به درگاه پرداخت
        </Button>
      </div>

      {/* <InvoicePageFooter /> */}
      <footer className="sticky bottom-12 z-20 w-full border-t bg-background px-4 py-3 md:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">مجموع:</span>
          <span className="text-base font-semibold text-foreground">
            {formattedTotalPrice}
          </span>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-blue-700 text-sm font-semibold tracking-wide text-blue-50"
          size="lg"
          disabled={totalPrice === 0 || isSubmitting}
        >
          تکمیل خرید و رفتن به درگاه پرداخت
        </Button>
      </footer>
    </form>
  );
};

export default InvoiceForm;
