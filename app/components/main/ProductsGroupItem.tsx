import React from "react";

interface Props {
  category: string;
  image: string; // will be provided later
}

function ProductsGroupItem({ category, image }: Props) {
  return (
    <div className="group flex w-28 cursor-pointer flex-col items-center sm:w-32">
      <div
        className="h-28 w-28 rounded-full border-4 border-rose-800 bg-blue-500 bg-cover bg-center shadow-md transition-all duration-200 group-hover:border-rose-400 sm:h-32 sm:w-32"
        style={{
          backgroundImage: image ? `url(${image})` : "",
        }}
      />

      <p className="mt-2 text-center text-sm font-bold text-gray-700">
        {category}
      </p>
    </div>
  );
}

export default ProductsGroupItem;
