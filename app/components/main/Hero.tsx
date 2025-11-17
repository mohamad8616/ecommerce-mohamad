"use client";

import HeroSlider from "./HeroSlider";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative mt-8 h-[500px] w-full lg:mt-16 xl:mt-20"
    >
      <HeroSlider />
      <div className="absolute inset-0 flex flex-col items-start justify-center bg-black/30 p-6 text-white lg:items-center">
        <h1 className="mb-4 text-3xl font-semibold md:text-5xl">
          به فروشگاه برند خوش آمدید
        </h1>
        <h2 className="text-lg">
          جدیدترین محصولات را با بهترین قیمت‌ها خریداری کنید.
        </h2>
      </div>
    </section>
  );
};

export default Hero;
