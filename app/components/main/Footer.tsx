import { ChevronUp, Instagram, X } from "lucide-react";
import localFont from "next/font/local";
import Image from "next/image";
import React from "react";
import { categories } from "../navbar/NavLinks";
import {
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
  IoLogoXbox,
} from "react-icons/io5";

const myoFont = localFont({
  src: "../../../fonts/AGhasem.ttf",
  display: "swap",
});

const Footer = () => {
  return (
    <footer className="mt-30 min-h-[500px] px-8 py-10">
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
          <span
            className={`${myoFont.className} text-2xl font-bold tracking-wider`}
          >
            فروشگاه برند
          </span>
        </div>
        <a
          href="#hero"
          className="flex items-center gap-x-2 rounded-sm bg-blue-100 px-2 py-1 text-2xl text-primary dark:bg-secondary"
        >
          بازگشت به بالا
          <ChevronUp />
        </a>
      </div>
      <div className="mt-16 flex items-center justify-between">
        <div className="space-y-7">
          <p className="text-xl">
            شماره تماس:
            <a href="tel:123-456-7890" className="text-sm">
              {" "}
              123-456-7890{" "}
            </a>
          </p>
          <p className="text-xl">آدرس: تهران، خیابان 123</p>
        </div>
        <div>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-3">
            {categories.map((category, index) => (
              <li
                className="my-3 cursor-pointer bg-secondary text-start text-xl"
                key={index}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="grid grid-cols-2 gap-10">
            <li className="cursor-pointer text-red-500 duration-100 hover:text-red-400">
              <IoLogoInstagram size={40} />
            </li>
            <li className="cursor-pointer text-blue-400 duration-100 hover:text-blue-300">
              <IoLogoTwitter size={40} />
            </li>
            <li className="cursor-pointer text-blue-500 duration-100 hover:text-blue-400">
              <IoLogoLinkedin size={40} />
            </li>
            <li className="hover:text-primary-dark cursor-pointer text-primary duration-100">
              <IoLogoGithub size={40} />
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t-4 border-gray-400">
        <div className="py-6 text-sm text-gray-600 dark:text-gray-300">
          <p className="mb-2">
            تمامی حقوق مادی و معنوی این وب‌سایت متعلق به «فروشگاه برند» است.
            هرگونه استفاده، بازنشر یا تکثیر محتوا بدون اجازه‌ی کتبی پیگرد قانونی
            دارد.
          </p>
          <p>
            © {new Date().getFullYear()} فروشگاه برند. کلیه حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
