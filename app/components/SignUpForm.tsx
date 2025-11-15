"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/CustomInput";
import { signup } from "@/lib/actions";

type Inputs = {
  name: string;
  email: string;
  password: string;
};
const SignUpForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);

    try {
      await signup(formdata);
      reset();
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-8">
        <div>
          <Input
            id="name"
            label="نام و نام خانوادگی"
            type="text"
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            {...register("name", {
              required: "لطفا نام و نام خانوادگی خود را وارد کنید",
            })}
          />
          {errors.name && (
            <p className="mt-0.5 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>{" "}
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
        ثبت نام
      </Button>
    </form>
  );
};

export default SignUpForm;
