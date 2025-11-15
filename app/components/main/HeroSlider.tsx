import promotionImage from "@/public/image1.jpg";
import { Spinner } from "../ui/Spinner";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import hero2 from "@/public/hero2.webp";
import hero3 from "@/public/hero3.jpg";
import hero4 from "@/public/hero4.jpg";
import hero5 from "@/public/whiteCart.jpg";
import { Suspense } from "react";
import Image from "next/image";

const HeroSlider = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ],
  );
  return (
    <>
      <div ref={sliderRef} className="keen-slider h-full w-full">
        <div className="keen-slider__slide number-slide1">
          <Suspense fallback={<Spinner />}>
            <Image
              src={hero5}
              alt="Description"
              fill
              priority
              className="object-cover"
            />
          </Suspense>
        </div>
        <div className="keen-slider__slide number-slide2">
          <Suspense fallback={<Spinner />}>
            <Image
              src={promotionImage}
              alt="Description"
              fill
              priority
              className="object-cover"
            />
          </Suspense>
        </div>
        <div className="keen-slider__slide number-slide3">
          <Suspense fallback={<Spinner />}>
            <Image
              src={hero2}
              alt="Description"
              fill
              priority
              className="object-cover"
            />
          </Suspense>
        </div>

        <div className="keen-slider__slide number-slide5">
          <Suspense fallback={<Spinner />}>
            <Image
              src={hero3}
              alt="Description"
              fill
              priority
              className="object-cover"
            />
          </Suspense>
        </div>
        <div className="keen-slider__slide number-slide6">
          <Suspense fallback={<Spinner />}>
            <Image
              src={hero4}
              alt="Description"
              fill
              priority
              className="object-cover"
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};
export default HeroSlider;
