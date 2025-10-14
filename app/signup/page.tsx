"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { signup } from "@/lib/actions";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const page = () => {
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
    <main className="flex min-h-screen items-start justify-center p-10">
      <div className="border-input bg-card mt-16 w-full max-w-sm rounded-md p-6 text-stone-900 shadow-md dark:text-stone-200">
        <h1 className="mb-6 text-2xl font-semibold">ورود به حساب کاربری</h1>
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
                <p className="mt-0.5 text-sm text-red-500">
                  {errors.name.message}
                </p>
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
      </div>
    </main>
  );
};

export default page;
