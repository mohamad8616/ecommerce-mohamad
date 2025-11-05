"use client";
import { fetchProducts } from "@/lib/queries";
import { DummyProduct, FakeProduct } from "@prisma/client";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { categories } from "../navbar/NavLinks";
import ProductItem from "./ProductItem";
import Pagination from "../ui/pagination";

const ProductList = () => {
  const [page, setPages] = useState(1);
  const queryClient = useQueryClient();

  const { status, data, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60 * 12,
  });

  // Prefetch the next page!
  useEffect(() => {
    if (!isPlaceholderData && data?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ["products", page],
        queryFn: () => fetchProducts(page),
      });
    }
  }, [data, isPlaceholderData, page, queryClient]);
  if (isFetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading classname="w-20 h-20" />;
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-center text-lg">
          در حال حاضر امکان دسترسی به محصولات وجود ندارد.
        </p>
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-center text-lg">در حال بارگذاری محصولات</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-secondary">
        <div className="mx-auto w-full max-w-7xl px-4 py-8">
          {/* Header with Filters */}
          <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                محصولات ما
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300"></p>
            </div>

            <div className="flex gap-3">
              <select className="cursor-pointer rounded-xl border border-gray-200 bg-white/80 px-4 py-2 dark:border-gray-600 dark:bg-gray-800/80">
                <option value="latest">جدیدترین</option>
                <option value="cheapest">ارزان ترین</option>
                <option value="expensive">گران ترین</option>
              </select>

              <select className="cursor-pointer rounded-xl border bg-white/80 px-4 py-2  dark:border-gray-600 dark:bg-gray-800/80">
                <option value="all">همه دسته‌بندی‌ها</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat.link}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.products.products.map(
              (product: DummyProduct | FakeProduct) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-lg backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/70"
                >
                  <ProductItem {...product} />
                </div>
              ),
            )}
          </div>
          <Pagination
            page={page}
            setPages={setPages}
            data={data}
            isPlaceholderData={isPlaceholderData}
          />
        </div>
      </div>
    );
  }
};

export default ProductList;
