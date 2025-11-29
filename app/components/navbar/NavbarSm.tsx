import React from "react";
import { User } from "@/lib/auth";
import { ModeToggle } from "../DarkmodeToggle";
import Profile from "./profile";

import Link from "next/link";
import { IoPerson } from "react-icons/io5";
import Search from "./Search";

// const myoFont = localFont({
//   src: "../../../fonts/AGhasem.ttf",
//   display: "swap",
// });

const NavbarSm = ({ user }: { user: User | null }) => {
  return (
    <nav className=" min-h-12 w-full bg-sidebar text-secondary lg:hidden">
      <div className="flex w-full items-center px-3  py-1 md:justify-between md:py-2 ">
        <Search className="hidden md:block" />

        <div className="mr-auto flex items-center gap-5">
          <ModeToggle />
          {user && <Profile user={user} />}
          {!user && (
            <Link
              href="/login"
              className="flex items-center gap-1 text-sm text-primary"
            >
              <IoPerson size={14} />

              <span>ورود</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarSm;
