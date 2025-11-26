"use client";
import React, { useRef } from "react";
import ClothesSlider from "./ClothesSlider";
import localFont from "next/font/local";
import { useInView, motion } from "framer-motion";

const myoFont = localFont({
  src: "../../../fonts/AGhasem.ttf",
  display: "swap",
});

const Clothes = () => {
  //framer motion
  const slider = useRef(null);
  const inView = useInView(slider);

  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      ref={slider}
      className="mt-30 flex w-full flex-col lg:flex-row"
    >
      {/* Text Section */}
      <div className="flex w-full flex-col items-center justify-center space-y-4 bg-secondary p-4 text-primary lg:w-1/2 lg:space-y-6">
        <div className="w-full space-y-4 border-4 border-secondary/50 p-4 lg:space-y-6 lg:p-8">
          <p
            className={`${myoFont.className} text-3xl font-bold text-orange-500 lg:text-4xl`}
          >
            خرید لوکس، قیمت مناسب
          </p>
          <p className="text-base leading-7 tracking-wide lg:text-xl lg:leading-9">
            در اینجا می‌توانید بهترین برندهای لباس را با
            <span className="font-bold text-orange-400">
              {" "}
              تخفیف‌های فوق‌العاده{" "}
            </span>
            پیدا کنید. ما با ارائه محصولات اورجینال و باکیفیت، خرید لوکس را برای
            همه قابل دسترس کرده‌ایم.
          </p>
          <ul className="mr-2 list-inside list-disc space-y-1 text-justify text-sm lg:mr-4 lg:space-y-2 lg:text-lg">
            <li>تخفیف‌های همیشگی تا 70%</li>
            <li>محصولات اورجینال با گارانتی اصالت</li>
            <li>جدیدترین ترندهای فصل</li>
            <li>تحویل سریع در سراسر کشور</li>
          </ul>
        </div>

        <div className="w-full space-y-3 p-4 lg:space-y-4 lg:p-8">
          <p className="text-xl font-bold text-orange-400 lg:text-2xl">
            چرا ما را انتخاب کنید؟
          </p>
          <p className="text-base leading-7 lg:text-lg lg:leading-8">
            زیرا معتقدیم همه حق دارند بهترین باشند! ما پل ارتباطی بین شما و
            برندهای لوکس جهانی هستیم، بدون اینکه نیاز باشد هزینه گزافی بپردازید.
            کیفیت عالی، قیمت مناسب و خدمات ممتاز،
            <span className="font-semibold"> تعهد همیشگی ما به شماست.</span>
          </p>
          <p className="mt-2 text-center text-lg font-semibold text-orange-600 lg:mt-4 lg:text-xl dark:text-orange-300">
            همین حالا به خانواده ما بپیوندید!
          </p>
        </div>
      </div>

      {/* Slider Section */}
      <div className="w-full bg-secondary p-8 text-primary lg:w-1/2">
        <div className="mx-auto h-[600px] lg:h-full">
          <ClothesSlider />
        </div>
      </div>
    </motion.section>
  );
};

export default Clothes;
