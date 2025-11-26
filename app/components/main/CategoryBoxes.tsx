"use client";
import perfume from "@/public/categoryBox/perfume2.jpg";
import sofa from "@/public/categoryBox/sofaBox.jpg";
import grocery from "@/public/categoryBox/groceryBox.jpg";
import beauty from "@/public/categoryBox/beauty2.jpg";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView, motion } from "framer-motion";

const CategoryBoxes = () => {
  //framer motion
  const slider = useRef(null);
  const inView = useInView(slider);
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      ref={slider}
      className="mt-30 flex h-auto w-full items-center justify-center p-4"
    >
      <div className="grid w-full max-w-6xl grid-cols-1 justify-between gap-4 md:grid-cols-2 md:gap-10">
        {/* Sofa */}
        <div className="flex justify-center">
          <div className="relative h-52 w-full overflow-hidden rounded-md">
            <Link href="products/category/sofa">
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
            </Link>
          </div>
        </div>
        {/* Grocery */}
        <div className="flex justify-center">
          <div className="relative h-52 w-full overflow-hidden rounded-md ">
            <Link href="products/category/grocery">
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
            </Link>
          </div>
        </div>
        {/* Beauty */}
        <div className="flex justify-center">
          <div className="relative h-52 w-full overflow-hidden rounded-md ">
            <Link href="products/category/beauty">
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
            </Link>
          </div>
        </div>
        {/* Perfume */}
        <div className="flex justify-center">
          <div className="relative h-52 w-full overflow-hidden rounded-md">
            <Link href="products/category/perfume">
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
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CategoryBoxes;
