import React, { Suspense } from "react";
import ProductList from "../components/products/ProductList";
import { Spinner } from "../components/ui/Spinner";

const page = async () => {
  return (
    <main className=" mt-10 h-auto min-h-screen w-full">
      <h1 className=" p-8 text-4xl text-slate-800 dark:text-slate-200">
        محصولات
      </h1>
      <div className="flex h-full w-full items-center justify-center">
        <Suspense
          fallback={
            <Spinner className="size-10 text-stone-900 dark:text-stone-100" />
          }
        >
          <ProductList />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
