import React from "react";
import ThemeToggle from "../theme/ThemeToggle";
import { Button } from "../ui/Button";
import { IoCartOutline } from "react-icons/io5";
import NavLinks from "./NavLinks";
import Image from "next/image";
import Link from "next/link";
import { User } from "@prisma/client";

const NavbarLg = ({ user }: { user: User | null }) => {
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
        {!user && (
          <Button variant="link" size="default">
            ورود | ثبت نام
          </Button>
        )}
        {user && <Link href={`/profile/${user.id}`}>{user.name}</Link>}
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
