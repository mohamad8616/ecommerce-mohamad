import React from "react";
import Image from "next/image";
import promotionImage from "@/public/image1.jpg";
const Hero = () => {
  return (
    <div className="relative mt-20 h-[500px] w-full">
      <Image
        src={promotionImage}
        alt="Description"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white">
        <h1 className="mb-4 text-5xl font-bold">به فروشگاه محمد خوش آمدید</h1>
        <p className="text-lg">
          جدیدترین محصولات را با بهترین قیمت‌ها خریداری کنید.
        </p>
      </div>
    </div>
  );
};

export default Hero;
