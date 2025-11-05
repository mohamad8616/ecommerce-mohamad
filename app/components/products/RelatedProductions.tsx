import { Card, CardContent } from "@/app/components/ui/card";
import { price } from "@/lib/utils";
import { DummyProduct, FakeProduct } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

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
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">محصولات مرتبط</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="h-full transition-all hover:translate-y-[-2px]">
              <CardContent className="p-4">
                <div className="mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
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
                <h3 className="mb-2 line-clamp-2 font-medium text-gray-900">
                  {product.title}
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
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
      </div>
    </section>
  );
}
