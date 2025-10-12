import React from "react";

function ProductsGroupItem({ category }: { category: string }) {
  return (
    <div className="flex h-28 w-28 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white outline-4 outline-offset-4 outline-rose-800 hover:outline-rose-400">
      <p>{category}</p>
    </div>
  );
}

export default ProductsGroupItem;
