import ProductDescription from "@/app/components/products/ProductDescription";
import ProductImageGallery from "@/app/components/products/ProductImageGallery";
import ProductInfo from "@/app/components/products/ProductInfo";
import RelatedProducts from "@/app/components/products/RelatedProductions";
import { getProductById, getProductsByCategoryInAll } from "@/lib/queries";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getProductsByCategoryInAll(product.category);
  console.log(product.category, relatedProducts);
  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto px-4 py-8">
        {/* Main Product Section */}
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div>
            <ProductImageGallery product={product} />
          </div>

          {/* Product Info */}
          <div>
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-12">
          <ProductDescription product={product} />
        </div>

        {/* Related Products */}
        {relatedProducts && (
          <RelatedProducts products={relatedProducts} currentProductId={id} />
        )}
      </div>
    </div>
  );
}

// export async function generateStaticParams({ params }: ProductPageProps) {
//   const { id } = await params;
//   const products = await getProductById(id);

//   return products?.title;
// }
