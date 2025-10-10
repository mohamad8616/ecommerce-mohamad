import React from "react";
import ProductList from "../components/products/ProductList";

const page = async () => {
  return (
    <main className='grid grid-cols-4 w-full h-full'>
      <h1 className='text-4xl '>محصولات</h1>
      <section>
        <ProductList />
      </section>
    </main>
  );
};

export default page;
