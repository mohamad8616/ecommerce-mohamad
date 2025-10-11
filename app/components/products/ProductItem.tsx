import { DummyProduct, FakeProduct } from "@/lib/definitions";
import Image from "next/image";
import React from "react";

const ProductItem = (props: DummyProduct | FakeProduct) => {
  if ("images" in props) {
    const { id, title, price, rating, category, description, images } = props;

    return (
      <div className='flex flex-col justify-between border p-4 rounded-md'>
        <p>{category}</p>
        <h1>{title}</h1>

        <Image
          src={images[0]}
          alt={title}
          width={200}
          height={200}
          blurDataURL='white'
        />
      </div>
    );
  }
  const { id, title, price, rating, category, description, image } = props;
  return (
    <div className='flex flex-col justify-between border p-4 rounded-md'>
      <p>{category}</p>
      <h1>{title}</h1>

      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        blurDataURL='white'
      />
    </div>
  );
};

export default ProductItem;
