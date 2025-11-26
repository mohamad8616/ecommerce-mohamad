"use client";
import "@/app/style/slider.css";
import { price, renderStars } from "@/lib/utils";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { FakeProduct } from "@prisma/client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "../ui/Skeleton";
import { Arrow } from "../ui/SliderArrow";

type ProductWithDiscount = FakeProduct & {
  discount: number;
};

export default function Slider({ products }: { products: FakeProduct[] }) {
  const [productsWithDiscounts, setProductsWithDiscounts] = useState<
    ProductWithDiscount[]
  >([]);
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  //keen slider hook
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 25,
        },
      },
      "(min-width: 769px)": {
        slides: {
          perView: 3,
          spacing: 25,
        },
      },
      "(min-width: 850px)": {
        slides: {
          perView: 4,
          spacing: 25,
        },
      },
      "(min-width: 1000px)": {
        slides: {
          perView: 5,
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

  // Don't render slider until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="flex space-x-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="h-80 w-64 animate-pulse rounded-2xl bg-gray-200 dark:bg-stone-700"
          >
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={sliderRef} className="keen-slider ">
        {productsWithDiscounts.map((product) => {
          const discountedPrice = calculateDiscountedPrice(
            product.price,
            product.discount,
          );

          return (
            <div key={product.id} className="keen-slider__slide p-1 sm:p-2">
              <Link
                href={`/products/${product.id}`}
                className="group block overflow-hidden rounded-2xl border bg-secondary shadow-sm transition-all duration-300 hover:shadow-xl dark:border-stone-700 dark:bg-stone-900"
              >
                {/* Discount Badge - Show for ALL items */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-lg`}
                  >
                    {product.discount > 0
                      ? `${digitsEnToFa(product.discount)}%`
                      : ""}
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
                </div>

                {/* Product Info */}
                <div className="p-3 md:p-5">
                  {/* Title */}
                  <h3 className="mb-3 line-clamp-1 text-sm leading-tight text-primary transition-colors duration-200 group-hover:text-blue-600 md:text-lg lg:text-base dark:group-hover:text-blue-400">
                    {product.title.substring(0, 20) + "..."}
                  </h3>

                  <div className="flex w-full items-center justify-between">
                    {/* Rating */}
                    {(product.rating || product.rate) && (
                      <div className="flex items-center space-x-1">
                        {renderStars(product.rating! || product.rate!)}
                      </div>
                    )}
                    {/* Price */}
                    <div className="flex flex-col items-center justify-between md:flex-row">
                      <div className="flex items-center space-x-2">
                        {product.discount > 0 ? (
                          <>
                            <span className="text-start text-sm text-primary md:text-base ">
                              {price(discountedPrice)}
                            </span>
                          </>
                        ) : (
                          <span className="text-start text-sm font-bold text-primary md:text-base">
                            {price(product.price)}
                          </span>
                        )}
                      </div>
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
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
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
