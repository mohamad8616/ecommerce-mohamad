import React from "react";
import ProductList from "../components/products/ProductList";

const page = async () => {
  return (
    <main className=' w-full h-full mt-10'>
      <h1 className='text-4xl'>محصولات</h1>

      <ProductList />
    </main>
  );
};

export default page;
