"use client";

import { useState } from "react";
import { Product, isDummyProduct } from "@/lib/definitions";
import { Button } from "@/app/components/ui/Button";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import { cn, formatToRial } from "@/lib/utils";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const finalPrice =
    isDummyProduct(product) && product.discountPercentage
      ? product.price * (1 - product.discountPercentage / 100)
      : product.price;

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log("Added to cart:", { product, quantity });
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* Title */}
        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          {product.title}
        </h1>

        {/* Rating */}
        {(product.rating || (product as any).rate) && (
          <div className="mb-4 flex items-center">
            <div className="flex items-center">
              <span className="ml-1 text-yellow-400">★</span>
              <span className="text-gray-700">
                {product.rating || (product as any).rate}
              </span>
            </div>
            {(product as any).count && (
              <span className="mr-2 text-sm text-gray-500">
                ({(product as any).count.toLocaleString("fa-IR")} نظر)
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">
            {formatToRial(finalPrice)}
          </span>
          {isDummyProduct(product) && product.discountPercentage && (
            <>
              <span className="text-lg text-gray-500 line-through">
                {formatToRial(product.price)}
              </span>
              <Badge variant="destructive" className="text-sm">
                {product.discountPercentage}% تخفیف
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

        {/* Quantity Selector */}
        <div className="mb-6 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">تعداد:</span>
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
            >
              +
            </Button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full py-3 text-lg"
          disabled={isDummyProduct(product) && product.stock === 0}
        >
          {isDummyProduct(product) && product.stock === 0
            ? "ناموجود"
            : "افزودن به سبد خرید"}
        </Button>

        {/* Additional Info */}
        <div className="mt-6 space-y-2 text-sm text-gray-600">
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
      </CardContent>
    </Card>
  );
}
