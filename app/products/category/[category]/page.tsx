import { getProductsByCategoryInAll } from "@/lib/queries";
import ProductItem from "@/app/components/products/ProductItem";
import { DummyProduct, FakeProduct } from "@prisma/client";
import { digitsEnToFa } from "@persian-tools/persian-tools";

const categoryNames = {
  sofa: "مبلمان",
  grocery: "خواربار",
  beauty: "زیبایی",
  perfume: "عطرها",
  electronic: "الکترونیک",
  menClothes: "لباس مردانه",
  womenClothes: "لباس زنانه",
  jewelry: "جواهرات",
};

const page = async ({ params }: { params: { category: string } }) => {
  const { category } = await params;
  const persianCategory = Object.entries(categoryNames).find(
    ([key]) => key === category,
  )?.[1];

  const products = await getProductsByCategoryInAll(persianCategory!);
  const categoryName =
    categoryNames[category as keyof typeof categoryNames] || category;
  const totalProducts = products.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto w-full max-w-7xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            {categoryName}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {digitsEnToFa(totalProducts)} محصول در این دسته‌بندی
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: DummyProduct | FakeProduct) => (
              <div
                key={product.id}
                className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/80"
              >
                <ProductItem {...product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="mb-6 text-6xl text-gray-400">📦</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-600 dark:text-gray-300">
              محصولی یافت نشد
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              در حال حاضر محصولی در دسته‌بندی {categoryName} موجود نیست.
            </p>
          </div>
        )}

        {/* Bottom Stats */}
        {products.length > 0 && (
          <div className="mt-16 rounded-2xl bg-white/60 p-6 backdrop-blur-lg dark:bg-gray-800/60">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="text-center md:text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  نمایش {digitsEnToFa(products.length)} محصول
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  دسته‌بندی:
                </span>
                <span className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-sm text-white">
                  {categoryName}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
