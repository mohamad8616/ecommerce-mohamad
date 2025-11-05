import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  categoryTitle: string;
  image: StaticImageData;
  link: string;
}

function ProductsGroupItem({ categoryTitle, image, link }: Props) {
  return (
    <div className="group flex cursor-pointer flex-col items-center">
      <div className="relative h-24 w-24 rounded-full border-4 border-rose-800 bg-cover bg-center shadow-md transition-all duration-200 group-hover:border-rose-400 sm:h-32 sm:w-32">
        <Link href={`/products/category/${link}`}>
          <Image
            src={image}
            alt={categoryTitle}
            className="h-full w-full rounded-full object-cover"
            fill
          />
        </Link>
      </div>

      <p className="mt-2 text-center text-sm font-bold text-gray-700">
        {categoryTitle}
      </p>
    </div>
  );
}

export default ProductsGroupItem;
