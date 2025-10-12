import { DummyProduct, FakeProduct } from "@prisma/client";
import ProductItem from "./ProductItem";

import { fetchProducts } from "@/lib/queries";

const ProductList = async () => {
  const data = await fetchProducts();
  console.log(data);
  return (
    <div className='grid grid-cols-4 w-full gap-6'>
      {data?.map((product: DummyProduct | FakeProduct, i) => (
        <ProductItem key={i} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
