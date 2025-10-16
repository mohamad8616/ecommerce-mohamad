"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent } from "@/app/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/app/components/ui/field";
import { Input } from "@/app/components/ui/Input";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import z from "zod";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
const Inputs = z.object({
  email: z
    .string()
    .email("ایمیل نامعتبر است")
    .min(2, "ایمیل خیلی کوتاه است")
    .max(100, "ایمیل خیلی طولانی است"),
  password: z
    .string()
    .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
    .max(100, "رمز عبور خیلی طولانی است"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    formState: { errors, isSubmitting, isValid },
    reset,
    handleSubmit,
  } = useForm<z.infer<typeof Inputs>>({
    resolver: zodResolver(Inputs),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof Inputs>> = (data) => {
    const parsedData = Inputs.parse(data);

    console.log(parsedData);
    toast("نام کاربری یا رمز عبور اشتباه است", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <p>{errors.password?.message}</p>
        </pre>
      ),
      position: "top-center",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col items-start gap-2 text-center">
                <h1 className="text-2xl font-bold">خوش آمدید</h1>
                <p className="text-balance text-muted-foreground">
                  وارد حساب کاربری خود شوید
                </p>
              </div>
              <Field>
                <Input
                  label="ایمیل"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email", { required: "ایمیل را وارد کنید" })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </Field>
              <Field>
                <Input
                  id="password"
                  type="password"
                  label="رمز عبور"
                  placeholder="رمز عبور"
                  {...register("password", {
                    required: "رمز عبور را وارد کنید",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  فراموشی رمز عبور؟
                </a>
              </Field>

              <Field>
                <Button type="submit" disabled={isSubmitting || !isValid}>
                  ورود
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                یا
              </FieldSeparator>
              <Field className="grid grid-cols-3 gap-4">
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">ورود به حساب کاربری با گوگل</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                <span>
                  آیا حساب کاربری ندارید؟{" "}
                  <Link href="/signup" className="text-blue-500">
                    {" "}
                    ثبت نام کنید
                  </Link>
                </span>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/coloredShirts.jpg"
              alt="Image"
              fill
              className="object-fit absolute  inset-0 dark:brightness-[0.8] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        با ادامه دادن، شما با شرایط استفاده و حریم خصوصی ما موافقت می‌کنید.
      </FieldDescription>
    </div>
  );
}
