import { ChevronUp } from "lucide-react";
import localFont from "next/font/local";
import Image from "next/image";
import {
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io5";
import { categories } from "../navbar/NavLinks";
import Link from "next/link";

const myoFont = localFont({
  src: "../../../fonts/AGhasem.ttf",
  display: "swap",
});

const Footer = () => {
  return (
    <footer className="mt-30 min-h-[500px] bg-blue-100 px-8 py-10 dark:bg-transparent">
      <div className="flex items-center justify-between gap-x-2">
        <div className=" flex items-center space-x-1 md:space-x-2">
          <div className="relative h-16 w-16 lg:h-24 lg:w-24">
            <Image src="/logo.png" alt="Logo" fill className="rounded-full" />
          </div>
          <span
            className={`${myoFont.className} text-base font-bold tracking-wider md:text-lg lg:text-2xl`}
          >
            فروشگاه برند
          </span>
        </div>
        <a
          href="#hero"
          className="flex items-center gap-x-1 rounded-sm bg-blue-100 px-1 py-1 text-sm text-primary md:gap-x-2 md:px-2 md:text-xl lg:text-2xl dark:bg-secondary"
        >
          بازگشت به بالا
          <ChevronUp />
        </a>
      </div>

      <div className="my-16 w-full ">
        {/* Main container  */}
        <div className="flex flex-col gap-8 lg:gap-12 xl:flex-row xl:items-start xl:justify-between">
          {/* Contact Information */}
          <div className="flex-1 space-y-4 md:space-y-6 lg:space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 md:text-xl lg:text-2xl dark:text-white">
              اطلاعات تماس
            </h3>
            <div className="flex items-center justify-between space-y-3 md:space-y-4">
              <p className="flex flex-col gap-1 text-base md:text-lg lg:text-xl">
                <span className="text-gray-600 dark:text-gray-300">
                  شماره تماس:
                </span>
                <a
                  href="tel:123-456-7890"
                  className="hover:text-primary-dark font-medium text-primary transition-colors duration-200"
                >
                  123-456-7890
                </a>
              </p>
              <p className="flex flex-col gap-1 text-base md:text-lg lg:text-xl">
                <span className="text-gray-600 dark:text-gray-300">آدرس:</span>
                <span className="text-gray-800 dark:text-gray-200">
                  تهران، خیابان 123
                </span>
              </p>
            </div>
          </div>

          {/* Categories  */}
          <div className="flex-1">
            <h3 className="mb-4 text-lg font-semibold text-gray-800 md:text-xl lg:text-2xl dark:text-white">
              دسته‌بندی‌ها
            </h3>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {categories.map((category, index) => (
                <li
                  className="hover:bg-secondary-dark cursor-pointer rounded-lg bg-secondary px-3 py-2 text-center text-sm text-primary transition-all duration-200 hover:shadow-md md:px-4 md:py-3 md:text-base lg:text-lg"
                  key={index}
                >
                  <Link
                    href={`${category.link}`}
                    className="flex items-center justify-center gap-x-2"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media  */}
          <div className="flex-1 place-self-center md:place-self-start">
            <h3 className="mb-4 text-center text-lg font-semibold text-gray-800 md:text-start md:text-xl lg:text-2xl dark:text-white">
              شبکه‌های اجتماعی
            </h3>
            <ul className="flex w-full justify-center gap-6 md:gap-8 lg:justify-start xl:flex-col ">
              <li>
                <a
                  href="#"
                  className="block cursor-pointer text-red-500 transition-all duration-200 hover:scale-110 hover:text-red-400"
                  aria-label="Instagram"
                >
                  <IoLogoInstagram className="size-8 md:size-10" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block cursor-pointer text-blue-400 transition-all duration-200 hover:scale-110 hover:text-blue-300"
                  aria-label="Twitter"
                >
                  <IoLogoTwitter className="size-8 md:size-10" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block cursor-pointer text-blue-500 transition-all duration-200 hover:scale-110 hover:text-blue-400"
                  aria-label="LinkedIn"
                >
                  <IoLogoLinkedin className="size-8 md:size-10" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary-dark block cursor-pointer text-primary transition-all duration-200 hover:scale-110"
                  aria-label="GitHub"
                >
                  <IoLogoGithub className="size-8 md:size-10" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright role */}
      <div className="border-t-4 border-gray-400">
        <div className="py-6 text-sm/loose tracking-wider text-gray-600 dark:text-gray-300">
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
