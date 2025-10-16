import Link from "next/link";
import React from "react";
import { ModeToggle } from "../DarkmodeToggle";

const NavbarProfile = ({ classname }: { classname: string }) => {
  return (
    <nav
      className={`mb-3 flex w-full justify-end border-b-2 border-stone-600 p-2 ${classname}`}
    >
      {/* LOGO */}

      {/* <Link href="/" className="flex items-center space-x-2 ">
        <img src="/Logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-lg font-bold"> صفحه اصلی</span>
      </Link> */}
      <ModeToggle />
    </nav>
  );
};

export default NavbarProfile;
