import perfume from "@/public/categoryBox/perfume2.jpg";
import sofa from "@/public/categoryBox/sofaBox.jpg";
import grocery from "@/public/categoryBox/groceryBox.jpg";
import beauty from "@/public/categoryBox/beauty2.jpg";
import React from "react";
import Image from "next/image";

const CategoryBoxes = () => {
  return (
    <section className="mt-30 flex h-auto w-full items-center justify-center p-4">
      <div className="grid w-full max-w-6xl grid-cols-1 justify-between gap-4 md:grid-cols-2 md:gap-10">
        {/* Sofa */}
        <div className="flex justify-center">
          <div className="relative h-52 w-full overflow-hidden rounded-md">
            <Image
              src={sofa}
              alt="sofa"
              fill
              className="rounded-md object-cover brightness-50"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority
            />
            <span className="absolute top-6 left-2 z-10 text-lg font-semibold tracking-widest text-stone-300">
              آرامش و راحتی بی نظیر ...
            </span>
          </div>
        </div>
        {/* Grocery */}
        <div className="flex justify-center">
          <div className="relative h-52 w-full overflow-hidden rounded-md ">
            <Image
              src={grocery}
              alt="grocery"
              fill
              className="rounded-md object-cover brightness-50"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <span className="absolute top-6 left-2 z-10 text-lg font-bold tracking-wider text-stone-300">
              با چند کلیک در وقت خود صرفه جویی کنید
            </span>
          </div>
        </div>
        {/* Beauty */}
        <div className="flex justify-center">
          <div className="relative h-52 w-full overflow-hidden rounded-md ">
            <Image
              src={beauty}
              alt="beauty"
              fill
              className="ba rounded-md object-cover brightness-50"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <span className="absolute top-6 left-2 z-10 text-lg font-semibold tracking-widest text-stone-300">
              مواد آرایشی اورجینال و اصلی را از ما بگیرید
            </span>
          </div>
        </div>
        {/* Perfume */}
        <div className="flex justify-center">
          <div className="relative h-52 w-full overflow-hidden rounded-md">
            <Image
              src={perfume}
              alt="perfume"
              fill
              className="rounded-md object-cover brightness-50"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <span className="absolute top-6 left-2 z-10 text-lg font-semibold tracking-widest text-stone-300">
              پرفروش ترین عطر های بازار
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBoxes;
