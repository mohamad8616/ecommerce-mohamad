"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FakeProduct, DummyProduct } from "@prisma/client";

type Product = FakeProduct | DummyProduct;

interface ProductImageGalleryProps {
  product: Product;
}

export default function ProductImageGallery({
  product,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if ("images" in product) {
    const images =
      product.images.length > 0
        ? product.images
        : product.thumbnail
          ? [product.thumbnail]
          : ["/placeholder.jpg"];

    return (
      <div className="flex flex-col space-y-4">
        {/* Main Image */}
        <div className="aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={images[selectedImage]}
            alt={product.title}
            width={600}
            height={600}
            className="h-full w-full object-contain object-center"
            priority
          />
        </div>

        {/* Thumbnail Gallery */}
        {images.length > 1 && (
          <div className="flex space-x-2  overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "aspect-square h-20 flex-shrink-0 overflow-hidden rounded-md border-2 bg-gray-100",
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent",
                )}
              >
                <Image
                  src={image}
                  alt={`${product.title} - تصویر ${index + 1}`}
                  width={80}
                  height={80}
                  className={`h-full w-full cursor-pointer object-contain object-center`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if ("image" in product) {
    return (
      <div className="flex aspect-square h-auto w-full items-center justify-center overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={100}
          className={`${product.category !== "جواهرات" ? "h-full w-full" : "mx-auto w-2/4"} object-contain object-center`}
          priority
        />
      </div>
    );
  }

  return null;
}
