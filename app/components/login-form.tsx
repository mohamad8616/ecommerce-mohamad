"use client";
import { Button } from "@/app/components/ui/Button";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/CustomInput";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/app/components/ui/field";
import { login, signinByGithub } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoLogoGithub } from "react-icons/io5";
import { toast } from "sonner";
import z from "zod";
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
  const [state, formAction] = useActionState(login, {
    error: null,
    success: false,
    redirect: "/",
  });

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

  useEffect(() => {
    if (state?.success) window.location.replace("/");
    if (state?.error) {
      toast(state.error, {
        description: state.error,
        position: "top-center",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      });
    }
  }, [state]);

  const onSubmit: SubmitHandler<z.infer<typeof Inputs>> = async (data) => {
    const parsedData = Inputs.safeParse(data);

    if (!parsedData.success) {
      toast("نام کاربری یا رمز عبور اشتباه است", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            {errors.password && <p>{errors.password?.message}</p>}
            {errors.email && <p>{errors.email?.message}</p>}
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
    }
    const formData = new FormData();
    if (parsedData.success) {
      formData.append("email", parsedData.data.email);
      formData.append("password", parsedData.data.password);
    }
    await formAction(formData);
    reset();
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
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
                    {isSubmitting ? "در حال ورود..." : "ورود"}
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  یا
                </FieldSeparator>
              </FieldGroup>
            </form>
            <div className="p-4">
              <form action={signinByGithub}>
                <Button variant="outline" type="submit" className="w-full">
                  <IoLogoGithub />
                  <span className="sr-only">
                    ورود به حساب کاربری با گیت‌هاب
                  </span>
                </Button>
              </form>
            </div>
            <span className="text-center text-sm">
              آیا حساب کاربری ندارید؟{" "}
              <Link href="/signup" className="text-blue-500">
                {" "}
                ثبت نام کنید
              </Link>
            </span>
          </div>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/coloredShirts.webp"
              alt="Image"
              fill
              className="object-fit absolute inset-0 dark:brightness-[0.8] dark:grayscale"
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
