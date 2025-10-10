import React from "react";
import ThemeToggle from "../theme/ThemeToggle";
import { Button } from "../ui/Button";
import { IoCartOutline } from "react-icons/io5";
import NavLinks from "./NavLinks";

const NavbarLg = () => {
  return (
    <nav className='hidden lg:flex justify-between items-center p-2 bg-slate-100/95 dark:bg-stone-900 text-slate-900 dark:text-slate-200 border-b-2 border-stone-600 '>
      <div className='flex justify-between items-center space-x-14'>
        <div className='flex space-x-4 items-center'>
          <h1 className='text-lg font-semibold'>logo</h1>
          <h1 className='text-lg font-semibold'>فروشگاه محمد</h1>
        </div>
        <Button
          variant='default'
          size='sm'
          className='bg-slate-100 dark:bg-stone-900 dark:border-2 border-slate-500 w-56 flex justify-between'
        >
          <span> جستجو</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-search'
            width={16}
            height={16}
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <circle cx={10} cy={10} r={7} />
            <line x1={21} y1={21} x2={15} y2={15} />
          </svg>
        </Button>
      </div>
      <NavLinks />
      <div className='flex  w-1/8 justify-between items-center ml-4'>
        <ThemeToggle />
        <Button variant='link' size='default'>
          ورود | ثبت نام
        </Button>
        <button className='text-2xl flex items-center w-10 h-10 text-slate-200'>
          <IoCartOutline className='text-slate-200' />
        </button>
      </div>
    </nav>
  );
};

export default NavbarLg;
