import Link from "next/link";
import React from "react";
import { ModeToggle } from "../DarkmodeToggle";
import Image from "next/image";

const NavbarProfile = ({ classname }: { classname: string }) => {
  return (
    <nav
      className={`mb-3 flex w-full justify-end border-b-2 border-stone-600 p-2 ${classname} space-x-5`}
    >
      {/* LOGO */}

      <Link href="/" className="flex items-center  space-x-2 ">
        <Image
          src="/Logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="hidden rounded-full md:block"
        />
        <span className="text-sm font-bold md:text-lg "> صفحه اصلی</span>
      </Link>
      <ModeToggle />
    </nav>
  );
};

export default NavbarProfile;
