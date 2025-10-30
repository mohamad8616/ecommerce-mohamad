"use client";
import "@/app/style/slider.css";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Eye, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Arrow } from "../ui/SliderArrow";

type Product = {
  id: number;
  externalId: number | null;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number | null;
  rate: number | null;
  count: number | null;
  createdAt: Date;
  updatedAt: Date;
};

type ProductWithDiscount = Product & {
  discount: number;
};

type Props = Product[];

export default function Slider({ products }: { products: Props }) {
  const [productsWithDiscounts, setProductsWithDiscounts] = useState<
    ProductWithDiscount[]
  >([]);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 2,
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 25,
        },
      },
    },
    rtl: true,
    created() {
      setLoaded(true);
    },
  });

  // Generate random discounts and set mounted state
  useEffect(() => {
    setMounted(true);

    // Create random discounts for ALL products (0-40%)
    const productsWithRandomDiscounts = products.map((product) => ({
      ...product,
      discount: Math.floor(Math.random() * 41), // 0 to 40% discount
    }));
    setProductsWithDiscounts(productsWithRandomDiscounts);
  }, [products]);

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Don't render slider until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="flex space-x-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="h-80 w-64 animate-pulse rounded-2xl bg-gray-200 dark:bg-stone-700"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider bg-stone-200">
        {productsWithDiscounts.map((product) => {
          const discountedPrice = calculateDiscountedPrice(
            product.price,
            product.discount,
          );

          return (
            <div key={product.id} className="keen-slider__slide p-1 sm:p-2">
              <Link
                href={`/product/${product.id}`}
                className="group block overflow-hidden rounded-2xl border bg-secondary shadow-sm transition-all duration-300 hover:shadow-xl dark:border-stone-700 dark:bg-stone-900"
              >
                {/* Discount Badge - Show for ALL items */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg`}
                  >
                    {product.discount > 0 ? `${product.discount}%` : ""}
                  </span>
                </div>

                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-50 p-1 sm:p-2 dark:bg-stone-800">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={400}
                    className="mx-auto h-64 w-5/6 object-contain transition-transform duration-700 group-hover:scale-110"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                  />

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                    <div className="flex translate-y-4 transform space-x-2 transition-transform duration-500 group-hover:translate-y-0">
                      <button
                        className="rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Eye size={20} className="text-gray-700" />
                      </button>
                      <button
                        className="rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
                        onClick={(e) => e.preventDefault()}
                      >
                        <ShoppingBag size={20} className="text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 md:p-5">
                  {/* Title */}
                  <h3 className="mb-3 line-clamp-2 text-sm leading-tight font-semibold text-primary transition-colors duration-200 group-hover:text-blue-600 md:text-lg dark:group-hover:text-blue-400">
                    {product.title}
                  </h3>

                  {/* Rating */}
                  {(product.rating || product.rate) && (
                    <div className="mb-3 flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i <
                              Math.floor(product.rating || product.rate || 0)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-300 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({product.count || 0})
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {product.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold text-primary lg:text-xl xl:text-2xl">
                            {formatPrice(discountedPrice)}
                          </span>
                          {/* <span className="text-lg text-gray-500 line-through dark:text-gray-400">
                          {formatPrice(product.price)}
                        </span> */}
                        </>
                      ) : (
                        <span className="text-lg font-bold text-primary lg:text-xl xl:text-2xl">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Indicator */}
                    <div className="rounded-full bg-gray-100 p-2 transition-all duration-200 group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-stone-700 dark:group-hover:bg-blue-900/30">
                      <ShoppingBag size={18} />
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-blue-500/20 dark:group-hover:border-blue-400/20"></div>
              </Link>
            </div>
          );
        })}
      </div>
      {loaded && instanceRef.current && (
        <div>
          <Arrow
            left
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          />
        </div>
      )}
    </div>
  );
}
