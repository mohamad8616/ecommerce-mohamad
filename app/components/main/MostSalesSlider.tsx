"use client";
import "@/app/style/slider.css";
import { DummyProduct } from "@prisma/client";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/Skeleton";
import { Arrow } from "../ui/SliderArrow";
import AddToCart from "../AddToCart";

const MostSalesSlider = ({ products }: { products: DummyProduct[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    rtl: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 500px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
      "(min-width: 501px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },

      "( min-width: 769px)": {
        slides: {
          perView: 3,
          spacing: 25,
        },
      },
      "( min-width: 1200px)": {
        slides: {
          perView: 5,
          spacing: 13,
        },
      },
    },
    created() {
      setLoaded(true);
    },
  });
  useEffect(() => {
    setMounted(true);
  }, [products]);
  if (!mounted) {
    return (
      <div className="flex w-full space-x-4 overflow-x-hidden">
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
    <>
      <div className="navigation-wrapper h-auto p-2 md:p-4">
        <div ref={sliderRef} className="keen-slider">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="keen-slider__slide group relative flex flex-col rounded-sm border-2 border-gray-400 bg-secondary pt-5 transition-all  duration-150 hover:border-slate-500/70"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden ">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={280}
                  height={280}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-grow flex-col p-2">
                <h3 className="mb-2 line-clamp-1 text-sm leading-tight font-light text-primary md:text-base">
                  {product.title}
                </h3>

                <div className="mt-auto flex flex-col items-center justify-between gap-x-1 border-t border-slate-700/50 pt-4 md:flex-row">
                  <p className="text-sm font-semibold text-amber-600 md:text-base lg:text-lg">
                    {product.price + "$"}
                  </p>

                  <AddToCart />
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            </Link>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default MostSalesSlider;
