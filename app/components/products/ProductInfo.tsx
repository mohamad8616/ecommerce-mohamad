"use client";

import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import useCart from "@/app/stores/CartStore";
import { Product, isDummyProduct, isFakeProduct } from "@/lib/definitions";
import { cn, price } from "@/lib/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useState } from "react";

export default function ProductInfo({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const finalPrice =
    isDummyProduct(product) && product.discountPercentage
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price;

  const handleAddToCart = (
    productId: number,
    price: number,
    quantity: number,
  ) => {
    addToCart({ productId, price, quantity });
  };
  return (
    <Card className="bg-transparent">
      <CardContent className="space-y-12 p-6 text-primary md:space-y-12 lg:space-y-16">
        {/* Title */}
        <h1 className="mb-4 text-base font-bold lg:text-xl xl:text-2xl">
          {product.title}
        </h1>

        {/* Rating */}
        {product.rating && (
          <div className="mb-4 flex items-center">
            <div className="flex items-center">
              <span className="ml-1 text-yellow-400">★</span>
              <span>{digitsEnToFa(product.rating!)}</span>
            </div>
            {isFakeProduct(product) && product.count && (
              <span className="mr-2 text-sm text-gray-500">
                ({product.count.toLocaleString("fa-IR")} نظر)
              </span>
            )}
          </div>
        )}
        {/* description */}
        <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
          {product.description}
        </p>
        {/* Price */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl font-bold ">{price(finalPrice)} </span>
          {isDummyProduct(product) && product.discountPercentage && (
            <>
              <span className=" text-gray-500 line-through">
                {price(product.price)}
              </span>
              <Badge variant="destructive" className="text-sm">
                {price(product.discountPercentage, true)} تخفیف
              </Badge>
            </>
          )}
        </div>

        {/* Stock & Availability */}
        {isDummyProduct(product) && product.stock !== null && (
          <div className="mb-4">
            <span
              className={cn(
                "text-sm font-medium",
                product.stock > 0 ? "text-green-600" : "text-red-600",
              )}
            >
              {product.stock > 0
                ? `موجود در انبار (${product.stock.toLocaleString("fa-IR")} عدد)`
                : "ناموجود"}
            </span>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-6 space-y-2 text-sm">
          {isDummyProduct(product) && product.brand && (
            <div className="flex justify-between">
              <span>برند:</span>
              <span>{product.brand}</span>
            </div>
          )}
          {isDummyProduct(product) && product.sku && (
            <div className="flex justify-between">
              <span>کد محصول:</span>
              <span>{product.sku}</span>
            </div>
          )}
          {isDummyProduct(product) && product.category && (
            <div className="flex justify-between">
              <span>دسته‌بندی:</span>
              <span>{product.category}</span>
            </div>
          )}
        </div>

        {/* Quantity and Price */}
        <div className="flex flex-col items-start justify-start py-6">
          {/* Quantity Selector */}
          <div className="gap- mb-6 flex w-full items-center justify-between">
            <span className="text-sm font-medium ">تعداد:</span>
            <div className="flex items-center rounded-lg border border-gray-300">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3"
              >
                -
              </Button>
              <span className="px-4 py-2 text-sm font-medium">
                {quantity.toLocaleString("fa-IR")}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3"
                disabled={isDummyProduct(product) && quantity >= product.stock!}
              >
                +
              </Button>
            </div>
          </div>

          {/* Price and add to cart*/}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center justify-between gap-x-1.5">
              <span className="text-sm font-medium ">:قیمت نهایی</span>
              <span className=" text-lg font-bold">
                {price(finalPrice * quantity)}
              </span>
            </div>
            {/* Add to Cart Button */}
            <Button
              onClick={() => handleAddToCart(product.id, finalPrice, quantity)}
              className=" bg-blue-600 py-3 text-sm text-stone-100 lg:text-lg"
              disabled={isDummyProduct(product) && product.stock === 0}
            >
              {isDummyProduct(product) && product.stock === 0
                ? "ناموجود"
                : "افزودن به سبد خرید"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
