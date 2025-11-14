import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 text-primary">
      <h1>
        خطای 404. صفحه مورد نظر شما یافت نشد. برای رفتن به صفحه اصلی روی لینک
        زیر کلیک کنید:
      </h1>

      <Link href="/" className="text-blue-600 underline">
        صفحه اصلی
      </Link>
    </main>
  );
}
