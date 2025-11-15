import { price, renderStars } from "@/lib/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { DummyProduct, FakeProduct } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const ProductItem = (props: DummyProduct | FakeProduct) => {
  const isDummyProduct = "images" in props;

  const { title, id } = props;

  const image = isDummyProduct ? props.images[0] : props.image;
  const rating = isDummyProduct ? props.rating : props.rating;

  const discount = isDummyProduct ? props.discountPercentage : 0;
  const stock = isDummyProduct ? props.stock : undefined;

  // Calculate discounted price
  const discountedPrice =
    discount && discount > 0 ? props.price * (1 - discount / 100) : null;

  return (
    <div className=" group product-item relative mx-auto flex h-full max-w-[350px] flex-col items-center justify-between overflow-hidden border transition-all duration-300 hover:border-stone-700">
      {/* Discount Badge */}

      {isDummyProduct && (
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-gradient-to-r from-green-500 to-green-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
            {digitsEnToFa(Math.round(Number(discount))) + "% تخفیف"}
          </span>
        </div>
      )}

      {/* Stock Status */}
      {stock !== undefined && stock && stock < 10 && stock > 0 && (
        <div className="absolute top-3 right-3 z-10 hidden md:block">
          <span className="rounded-full bg-red-500 px-1 py-0.5 text-xs font-bold text-white">
            فقط {digitsEnToFa(stock)} عدد باقی مانده
          </span>
        </div>
      )}

      {/* Image Container */}
      <Link href={`/products/${id}`}>
        <div className="relative flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-stone-800">
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className={`w-2/3 object-contain  pt-4 transition-transform duration-500 group-hover:scale-105`}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
          />
          {/* Quick Actions Overlay */}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-1 xl:p-3">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 leading-tight font-bold text-gray-900 transition-colors duration-200 group-hover:text-blue-600 dark:font-normal dark:text-stone-200">
          {title}
        </h3>

        {/* Rating */}
        <div className="mb-3 flex items-center">
          <div className="flex items-center space-x-1">
            {rating && renderStars(rating)}
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {discountedPrice ? (
              <>
                <span className="text-base text-stone-900 dark:text-gray-200">
                  {price(discountedPrice)}
                </span>
                <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                  {price(props.price)}
                </span>
              </>
            ) : (
              <span className="text-lg text-gray-900">
                {price(props.price)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300  dark:group-hover:border-stone-500"></div>
    </div>
  );
};

export default ProductItem;
