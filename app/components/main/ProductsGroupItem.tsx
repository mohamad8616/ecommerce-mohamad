import Image, { StaticImageData } from "next/image";
import React from "react";

interface Props {
  category: string;
  image: StaticImageData; // will be provided later
}

function ProductsGroupItem({ category, image }: Props) {
  return (
    <div className="group flex w-28 cursor-pointer flex-col items-center sm:w-32">
      <div className="relative  rounded-full border-4 border-rose-800 bg-cover bg-center shadow-md transition-all duration-200 group-hover:border-rose-400 sm:h-32 sm:w-32">
        <Image
          src={image}
          alt={category}
          className="h-full w-full rounded-full object-cover"
        />
      </div>

      <p className="mt-2 text-center text-sm font-bold text-gray-700">
        {category}
      </p>
    </div>
  );
}

export default ProductsGroupItem;
