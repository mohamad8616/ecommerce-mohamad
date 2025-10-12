import { getCategories } from "@/lib/queries";
import React from "react";
import ProductsGroupItem from "./ProductsGroupItem";

const ProductGroups = async () => {
  const categories = await getCategories();

  const destructuredCategories = categories.map((c) => c.category);
  console.log(destructuredCategories);
  return (
    <div className="mt-8 flex w-full items-center justify-between  bg-yellow-200 px-10 py-4 text-stone-900">
      {destructuredCategories.map((category, index) => (
        <div key={index} className="w-[200px] flex-none">
          <ProductsGroupItem category={category} />
        </div>
      ))}
    </div>
  );
};

export default ProductGroups;
