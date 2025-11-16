import { getSession } from "../_customhooks/hooks";
import SignUpForm from "../components/SignUpForm";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ثبت نام",
  description: "صفحه ثبت نام کاربران جدید در سایت",
};

const Page = async () => {
  //Authentication
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return (
    <main className="p- flex min-h-screen items-start justify-center md:p-10">
      <div className="mt-16 w-full max-w-sm rounded-md border-input bg-card p-6 text-stone-900 shadow-md dark:text-stone-200">
        <h1 className="mb-6 text-2xl font-semibold">ورود به حساب کاربری</h1>
        <SignUpForm />
      </div>
    </main>
  );
};

export default Page;
