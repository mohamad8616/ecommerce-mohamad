import React from "react";
import Image from "next/image";
import promotionImage from "@/public/image1.jpg";
const Hero = () => {
  return (
    <div className='relative w-full h-screen'>
      <Image
        src={promotionImage}
        alt='Description'
        fill
        priority
        className='object-cover'
      />
      <div className='absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-white'>
        <h1 className='text-5xl font-bold mb-4'>به فروشگاه محمد خوش آمدید</h1>
        <p className='text-lg'>
          جدیدترین محصولات را با بهترین قیمت‌ها خریداری کنید.
        </p>
      </div>
    </div>
  );
};

export default Hero;
