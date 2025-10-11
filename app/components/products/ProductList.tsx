"use client";
import { fetchProducts } from "@/app/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProductItem from "./ProductItem";

import { fakestoreData, products } from "@/app/lib/translatedData";
import { DummyProduct, FakeProduct } from "@/app/lib/definitions";

const ProductList = () => {
  const query = useQuery({ queryKey: ["products"], queryFn: fetchProducts });
  console.log(query.data);
  return (
    <div className='grid grid-cols-4 w-full'>
      {[...products, ...fakestoreData].map(
        (product: DummyProduct | FakeProduct, i) => (
          <ProductItem key={i} {...product} />
        )
      )}
    </div>
  );
};

export default ProductList;
