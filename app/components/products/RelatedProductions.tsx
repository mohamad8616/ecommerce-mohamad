"use client";
import { Card, CardContent } from "@/app/components/ui/card";
import { price } from "@/lib/utils";
import { DummyProduct, FakeProduct } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { categories } from "../navbar/NavLinks";

interface RelatedProductsProps {
  products: DummyProduct[] | FakeProduct[];
  currentProductId: string;
}

export default function RelatedProducts({
  products,
  currentProductId,
}: RelatedProductsProps) {
  const relatedProducts = products
    .filter((product) => product.id !== +currentProductId)
    .slice(0, 3);

  const categoryURL = categories.find(
    (category) => category.title === relatedProducts[0].category,
  )?.link as string;

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-6 text-2xl font-bold">محصولات مرتبط</h2>
      {/* For large and above screens */}
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="h-full transition-all hover:translate-y-[-2px]">
              <CardContent className="p-4">
                <div className="mb-4 aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={
                      "images" in product && product.images.length > 0
                        ? product.images[0]
                        : "image" in product
                          ? product.image
                          : "/placeholder.jpg"
                    }
                    alt={product.title}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mb-2 line-clamp-2 font-medium">
                  {product.title}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold">
                    {price(product.price)}
                  </span>
                  {"rating" in product && product.rating && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="ml-1 text-yellow-400">★</span>
                      {product.rating || (product as any).rate}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
        <div className="flex items-center">
          <Link className="underline underline-offset-4" href={categoryURL}>
            {" "}
            مشاهده همه محصولات مرتبط &larr;
          </Link>
        </div>
      </div>
    </section>
  );
}
