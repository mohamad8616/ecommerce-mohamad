import { LoginForm } from "@/app/components/login-form";
import type { Metadata } from "next";
import { getSession } from "../_customhooks/hooks";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "ورود به حساب کاربری",
  description: "صفحه ورود به حساب کاربری برای دسترسی به امکانات سایت",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/profile");

  return (
    <div className="flex h-auto flex-col items-center justify-center overflow-hidden bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm />
      </div>
    </div>
  );
}
