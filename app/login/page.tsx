"use client";
import React from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, signinByGoogle } from "@/lib/actions";
import { FcGoogle } from "react-icons/fc";

type Inputs = {
  email: string;
  password: string;
};

const page = () => {
  const {
    handleSubmit,

    register,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formdata = new FormData();
    formdata.append("email", data.email);
    formdata.append("password", data.password);

    try {
      await login(formdata);
      reset();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="flex min-h-screen items-start justify-center p-10">
      <div className="border-input bg-card mt-16 w-full max-w-sm rounded-md p-6 text-stone-900 shadow-md dark:text-stone-200">
        <h1 className="mb-6 text-2xl font-semibold">ورود به حساب کاربری</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-8">
            <div>
              <Input
                id="email"
                label="ایمیل"
                type="email"
                placeholder="example@example.com"
                {...register("email", {
                  required: "لطفا ایمیل خود را وارد کنید",
                })}
              />
              {errors.email && (
                <p className="mt-0.5 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Input
                id="password"
                label="رمز عبور"
                type="password"
                placeholder="رمز عبور خود را وارد کنید"
                {...register("password", {
                  required: "لطفا رمز عبور خود را وارد کنید",
                })}
              />
              {errors.password && (
                <p className="mt-0.5 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="outline"
            className="bg-transparent text-stone-900 dark:text-stone-200"
            type="submit"
          >
            ورود
          </Button>
        </form>
        <p className="mt-2 space-x-2 text-sm">
          حساب کاربری ندارید؟{" "}
          <Link
            className="text-muted-foreground cursor-pointer text-sm text-blue-400"
            href="/signup"
          >
            ثبت نام کنید
          </Link>
        </p>

        <Link
          className="text-muted-foreground cursor-pointer text-sm text-blue-400"
          href="/register"
        >
          رمز عبور را فراموش کرده‌اید؟
        </Link>
        <p className="my-7 w-full text-center">یا </p>
        <form action={signinByGoogle}>
          <Button
            type="submit"
            variant={"outline"}
            className="w-full text-stone-200"
          >
            ورود با گوگل
            <FcGoogle />
          </Button>
        </form>
      </div>
    </main>
  );
};

export default page;
