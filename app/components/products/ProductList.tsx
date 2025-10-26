import { DummyProduct, FakeProduct } from "@prisma/client";
import ProductItem from "./ProductItem";

import { fetchProducts } from "@/lib/queries";

const ProductList = async () => {
  const data = await fetchProducts();

  return (
    <div className="mt-10 grid w-full grid-cols-1 gap-6 px-8 md:grid-cols-2 lg:grid-cols-3">
      {data?.map((product: DummyProduct | FakeProduct, i) => (
        <ProductItem key={i} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
