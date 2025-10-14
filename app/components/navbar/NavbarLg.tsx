import React from "react";
import ThemeToggle from "../theme/ThemeToggle";
import { Button } from "../ui/Button";
import { IoCartOutline } from "react-icons/io5";
import NavLinks from "./NavLinks";
import Image from "next/image";
import Link from "next/link";

const NavbarLg = () => {
  return (
    <nav className="mx-auto hidden w-11/12 items-center justify-between rounded-full bg-stone-900/50  px-4 py-2 text-stone-900 lg:flex dark:bg-stone-900 dark:text-slate-100">
      <div className="flex items-center justify-between space-x-14">
        <Link href="/" className="flex items-center space-x-4">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <h1 className="text-lg font-semibold">فروشگاه محمد</h1>
        </Link>
        <Button
          variant="default"
          size="lg"
          className="flex w-56 justify-between border-2 border-slate-500 p-1"
        >
          <span> جستجو</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-search"
            width={16}
            height={16}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx={10} cy={10} r={7} />
            <line x1={21} y1={21} x2={15} y2={15} />
          </svg>
        </Button>
      </div>
      <NavLinks />
      <div className="ml-4  flex w-1/8 items-center justify-between">
        <ThemeToggle />
        <Button variant="link" size="default">
          ورود | ثبت نام
        </Button>
        <button className="relative flex h-10 w-10 cursor-pointer  items-center text-2xl text-slate-200">
          <span className="absolute top-0 -right-1 rounded-full bg-red-600 px-1 py-0.5 text-xs text-white ">
            0
          </span>
          <IoCartOutline className="text-stone-900 dark:text-slate-200" />
        </button>
      </div>
    </nav>
  );
};

export default NavbarLg;
// "use client";
// import React, { useState, useEffect } from "react";
// import ThemeToggle from "../theme/ThemeToggle";
// import { Button } from "../ui/Button";
// import { IoCartOutline } from "react-icons/io5";
// import NavLinks from "./NavLinks";

// const NavbarLg = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`hidden lg:flex  top-0 left-0 w-full z-50 justify-between items-center p-4 transition-all duration-300 ${
//         isScrolled
//           ? "bg-white/80 fixed dark:bg-stone-900/80 backdrop-blur-md text-slate-900 dark:text-slate-100 shadow-md"
//           : "bg-transparent text-white absolute"
//       }`}
//     >
//       <div className='flex justify-between items-center space-x-14'>
//         <div className='flex space-x-4 items-center'>
//           <h1 className='text-lg font-semibold'>logo</h1>
//           <h1 className='text-lg font-semibold'>فروشگاه محمد</h1>
//         </div>

//         <Button
//           variant='default'
//           size='sm'
//           className='bg-slate-100/40 dark:bg-stone-900/60 dark:border-2 border-slate-500 w-56 flex justify-between backdrop-blur-sm'
//         >
//           <span>جستجو</span>
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             width={16}
//             height={16}
//             viewBox='0 0 24 24'
//             strokeWidth='2'
//             stroke='currentColor'
//             fill='none'
//             strokeLinecap='round'
//             strokeLinejoin='round'
//           >
//             <path stroke='none' d='M0 0h24v24H0z' fill='none' />
//             <circle cx={10} cy={10} r={7} />
//             <line x1={21} y1={21} x2={15} y2={15} />
//           </svg>
//         </Button>
//       </div>

//       <NavLinks />

//       <div className='flex w-1/8 justify-between items-center ml-4'>
//         <ThemeToggle />
//         <Button variant='link' size='default'>
//           ورود | ثبت نام
//         </Button>
//         <button className='text-2xl flex items-center w-10 h-10'>
//           <IoCartOutline />
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default NavbarLg;
