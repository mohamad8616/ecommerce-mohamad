"use client";

import { Input } from "@/app/components/ui/Input";
import { Label } from "@/app/components/ui/Label";
import { Separator } from "@/app/components/ui/Separator";
import { Textarea } from "@/app/components/ui/textarea";
import initiatePayment from "@/lib/actions";
import { price } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { CreditCard, Package } from "lucide-react";
import { redirect } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import useCart from "../../stores/CartStore";
import { Card, CardContent } from "../ui/card";

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
      className="relative space-y-6"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <div className="space-y-6">
            {/* Personal Info Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
                <h3 className="font-semibold text-foreground">اطلاعات شخصی</h3>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* First Name */}
                <div className="group relative">
                  <Label
                    htmlFor="firstName"
                    className="bg-opacity-95 absolute -top-2 left-3 z-10 bg-background px-2 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all group-focus-within:text-primary"
                  >
                    نام
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="نام خود را وارد کنید"
                    autoComplete="given-name"
                    aria-invalid={!!errors.firstName}
                    aria-describedby="firstName-error"
                    disabled={true}
                    defaultValue={name}
                    className={`
              h-14 rounded-xl border-2 transition-all duration-300
              ${
                errors.firstName
                  ? "border-destructive/30 bg-destructive/5 focus:border-destructive"
                  : "border-border/30 bg-background/80 hover:border-primary/30 focus:border-primary"
              }
              focus:bg-background focus:shadow-lg focus:shadow-primary/10
              disabled:cursor-not-allowed disabled:border-border/20 disabled:bg-muted/50
            `}
                    {...register("firstName")}
                  />
                  <ErrorText
                    id="firstName-error"
                    message={errors.firstName?.message}
                  />
                </div>

                {/* Last Name */}
                <div className="group relative">
                  <Label
                    htmlFor="lastName"
                    className="bg-opacity-95 absolute -top-2 left-3 z-10 bg-background px-2 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all group-focus-within:text-primary"
                  >
                    نام خانوادگی
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="نام خانوادگی خود را وارد کنید"
                    autoComplete="family-name"
                    aria-invalid={!!errors.lastName}
                    aria-describedby="lastName-error"
                    disabled={isSubmitting}
                    className={`
              h-14 rounded-xl border-2 transition-all duration-300
              ${
                errors.lastName
                  ? "border-destructive/30 bg-destructive/5 focus:border-destructive"
                  : "border-border/30 bg-background/80 hover:border-primary/30 focus:border-primary"
              }
              focus:bg-background focus:shadow-lg focus:shadow-primary/10
              disabled:cursor-not-allowed disabled:border-border/20 disabled:bg-muted/50
            `}
                    {...register("lastName")}
                  />
                  <ErrorText
                    id="lastName-error"
                    message={errors.lastName?.message}
                  />
                </div>
              </div>

              {/* Email - Full Width */}
              <div className="group relative">
                <Label
                  htmlFor="email"
                  className="bg-opacity-95 absolute -top-2 left-3 z-10 bg-background px-2 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all group-focus-within:text-primary"
                >
                  ایمیل
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  disabled={true}
                  defaultValue={email}
                  className={`
            h-14 rounded-xl border-2 transition-all duration-300
            ${
              errors.email
                ? "border-destructive/30 bg-destructive/5 focus:border-destructive"
                : "border-border/30 bg-background/80 hover:border-primary/30 focus:border-primary"
            }
            focus:bg-background focus:shadow-lg focus:shadow-primary/10
            disabled:cursor-not-allowed disabled:border-border/20 disabled:bg-muted/50
          `}
                  {...register("email")}
                />
                <ErrorText id="email-error" message={errors.email?.message} />
              </div>
            </div>

            {/* Contact & Address Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 rounded-xl border border-secondary/10 bg-gradient-to-r from-secondary/5 to-secondary/10 px-4 py-3">
                <div className="h-2 w-2 rounded-full bg-secondary"></div>
                <h3 className="font-semibold text-foreground">
                  اطلاعات تماس و آدرس
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Mobile */}
                <div className="group relative">
                  <Label
                    htmlFor="mobile"
                    className="bg-opacity-95 absolute -top-2 left-3 z-10 bg-background px-2 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all group-focus-within:text-primary"
                  >
                    شماره موبایل
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    pattern="^\d{11}$"
                    placeholder="0912XXXXXXX"
                    aria-invalid={!!errors.mobile}
                    aria-describedby="mobile-error"
                    disabled={isSubmitting}
                    className={`
              h-14 rounded-xl border-2 transition-all duration-300
              ${
                errors.mobile
                  ? "border-destructive/30 bg-destructive/5 focus:border-destructive"
                  : "border-border/30 bg-background/80 hover:border-primary/30 focus:border-primary"
              }
              focus:bg-background focus:shadow-lg focus:shadow-primary/10
              disabled:cursor-not-allowed disabled:border-border/20 disabled:bg-muted/50
            `}
                    {...register("mobile")}
                  />
                  <ErrorText
                    id="mobile-error"
                    message={errors.mobile?.message}
                  />
                </div>

                {/* Address */}
                <div className="group relative lg:col-span-2">
                  <Label
                    htmlFor="address"
                    className="bg-opacity-95 absolute -top-2 left-3 z-10 bg-background px-2 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-all group-focus-within:text-primary"
                  >
                    آدرس دقیق
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="آدرس دقیق محل تحویل را وارد کنید (کد پستی، پلاک، خیابان، محله...)"
                    rows={4}
                    autoComplete="street-address"
                    aria-invalid={!!errors.address}
                    aria-describedby="address-error"
                    disabled={isSubmitting}
                    className={`
              min-h-[120px] resize-none rounded-xl border-2 pr-4 transition-all duration-300
              ${
                errors.address
                  ? "border-destructive/30 bg-destructive/5 focus:border-destructive"
                  : "border-border/30 bg-background/80 hover:border-primary/30 focus:border-primary"
              }
              focus:bg-background focus:shadow-lg focus:shadow-primary/10
              disabled:cursor-not-allowed disabled:border-border/20 disabled:bg-muted/50
            `}
                    {...register("address")}
                  />
                  <ErrorText
                    id="address-error"
                    message={errors.address?.message}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* Order Summary & CTA Section */}
      <div className="mt-8 lg:mt-12">
        <Card className="overflow-hidden border-0 shadow-xl">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-primary/10 to-primary/20">
              <div className="px-6 py-6 sm:px-8 sm:py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        خلاصه سفارش
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {digitsEnToFa(cartItems.length)} کالا • ارسال رایگان
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-bold text-primary sm:text-3xl lg:text-xl xl:text-2xl">
                      {formattedTotalPrice}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Items */}
            <div className="divide-y divide-border/50">
              <div className="px-6 py-4 sm:px-8">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">جمع کل</span>
                  <span className="font-medium">{formattedTotalPrice}</span>
                </div>
              </div>
              <div className="bg-muted/20 px-6 py-4 sm:px-8">
                {/* <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">تخفیف</span>
                    <span className="text-sm font-medium text-destructive">
                      -۳۰۰٬۰۰۰ تومان
                    </span>
                  </div> */}
              </div>
              <div className="px-6 py-4 sm:px-8">
                <div className="flex justify-between border-t border-border/50 pt-4 font-semibold text-foreground">
                  <span className="text-lg">مبلغ نهایی</span>
                  <span className="text-xl text-primary">
                    {" "}
                    {formattedTotalPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}

            <div className="px-6 pt-6 pb-6 sm:px-8 sm:pb-8">
              <button
                type="submit"
                className="w-full transform rounded-xl bg-blue-700  px-6 py-4 text-base font-semibold text-blue-50 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:from-primary/90 hover:to-primary/80 hover:shadow-xl active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  پرداخت نهایی
                  <CreditCard className="h-5 w-5" />
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default InvoiceForm;
