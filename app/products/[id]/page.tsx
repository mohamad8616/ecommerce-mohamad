import ProductImageGallery from "@/app/components/products/ProductImageGallery";
import ProductInfo from "@/app/components/products/ProductInfo";
import ProductsReviews from "@/app/components/products/ProductsReviews";
import RelatedProducts from "@/app/components/products/RelatedProductions";
import {
  getDummyProductReviews,
  getProductById,
  getProductsByCategoryInAll,
} from "@/lib/queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Loading from "./Loading";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const id = (await params).id;
  const product = await getProductById(id);

  return {
    title: product?.title ?? "محصول",
    description: product?.description ?? "جزئیات محصول",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getProductsByCategoryInAll(product.category);
  const reviews = await getDummyProductReviews(id);
  return (
    <div className="min-h-screen space-y-16 bg-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div>
            <Suspense fallback={<Loading />}>
              <ProductImageGallery product={product} />
            </Suspense>
          </div>

          {/* Product Info */}
          <div>
            <Suspense fallback={<Loading />}>
              <ProductInfo product={product} />
            </Suspense>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts && (
          <Suspense fallback={<Loading />}>
            <RelatedProducts products={relatedProducts} currentProductId={id} />
          </Suspense>
        )}

        {/* Product Reviews */}
        <Suspense
          fallback={
            <div className="animate-pulse">
              <div className="mb-6 h-8 w-1/4 rounded bg-gray-200"></div>
              <div className="mb-4 h-32 rounded bg-gray-200"></div>
              <div className="mb-4 h-24 rounded bg-gray-200"></div>
            </div>
          }
        >
          <ProductsReviews reviews={reviews} />
        </Suspense>
      </div>
    </div>
  );
}

// export async function generateStaticParams({ params }: ProductPageProps) {
//   const { id } = await params;
//   const products = await getProductById(id.toString());

//   return products?.title;
// }
