import { Suspense } from "react";
import ProductList from "../components/products/ProductList";
import { Spinner } from "../components/ui/Spinner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات",
  description: "صفحه محصولات برای مشاهده و خرید کالاها",
};
const page = () => {
  return (
    <main className=" mt-10 h-auto min-h-screen w-full">
      <div className="flex h-full w-full items-center justify-center">
        <Suspense
          fallback={
            <Spinner className="absolute top-1/2 left-1/2 size-20 -translate-x-1/2 -translate-y-1/2 transform text-stone-900 dark:text-stone-100" />
          }
        >
          <ProductList />
        </Suspense>
      </div>
    </main>
  );
};

export default page;
