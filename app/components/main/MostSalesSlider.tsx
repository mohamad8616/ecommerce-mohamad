"use client";
import { useState } from "react";
import "@/app/style/slider.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Arrow } from "../ui/SliderArrow";
import { DummyProduct } from "@prisma/client";
import Image from "next/image";
import { Button } from "../ui/Button";
import { ShoppingBag } from "lucide-react";

const MostSalesSlider = ({ products }: { products: DummyProduct[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    rtl: true,
    // loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 550px)": {
        slides: {
          perView: 2,
          spacing: 25,
        },
      },
      "( min-width: 555px)": {
        slides: {
          perView: 3,
          spacing: 25,
        },
      },
      "( min-width: 769px)": {
        slides: {
          perView: 4,
          spacing: 25,
        },
      },
      "( min-width: 1200px)": {
        slides: {
          perView: 5,
          spacing: 25,
        },
      },
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="navigation-wrapper h-auto p-4">
        <div ref={sliderRef} className="keen-slider">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`keen-slider__slide flex flex-col items-center justify-between border-4 border-stone-700/50 p-2`}
            >
              <Image
                src={product.images[0]}
                alt={product.title}
                width={200}
                height={200}
              />
              <p>{product.title}</p>
              <div className="mt-10 flex w-full items-center justify-between">
                <p className="text-sm font-semibold">{product.price + "$"}</p>
                <Button variant="outline" className="bg-green-600">
                  افزودن به سبد خرید <ShoppingBag size={18} />
                </Button>
              </div>
            </div>
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
