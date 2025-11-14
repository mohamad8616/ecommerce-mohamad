import Link from "next/link";
import React from "react";
import { Button } from "../components/ui/Button";

const page = () => {
  return (
    <main className="flex h-auto min-h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-between space-y-5 p-10 tracking-wide md:p-4">
        از اعتماد شما ممنونیم، جهت رفتن به صفحه اصلی روی لینک زیر کلیک کنید{" "}
        <Link href="/">
          <Button className="mt-4" variant="default">
            {" "}
            صفحه اصلی
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default page;
