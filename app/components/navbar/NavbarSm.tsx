"use client";
import { User } from "@/lib/auth";
import { useEffect, useState } from "react";
import { ModeToggle } from "../DarkmodeToggle";
import HamburgerMenu from "../ui/HamburgerMenu";
import Profile from "./profile";

import Link from "next/link";
import { IoPerson } from "react-icons/io5";
import CartBtn from "../Cart/CartBtn";
import NavbarSmAside from "./NavbarSmAside";
import Search from "./Search";
import { SidebarSeparator } from "../ui/Sidebar";
import localFont from "next/font/local";

const myoFont = localFont({
  src: "../../../fonts/AGhasem.ttf",
  display: "swap",
});

const NavbarSm = ({ user }: { user: User | null }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Lock body scroll
  useEffect(() => {
    const body = document.body;
    if (isMobileOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, [isMobileOpen]);

  return (
    <nav className=" min-h-12 w-full bg-sidebar text-secondary lg:hidden">
      <div className="flex w-full items-center justify-between  px-3 py-1 md:py-2 ">
        <NavbarSmAside
          onToggle={() => setIsMobileOpen((prev) => !prev)}
          onOpen={() => setIsMobileOpen(true)}
          onClose={() => setIsMobileOpen(false)}
          isOpen={isMobileOpen}
        />
        <Search className="hidden md:block" />
        <HamburgerMenu
          onOpen={() => setIsMobileOpen((prev) => !prev)}
          top={1}
        />
        <div className="flex items-center gap-5">
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
          <CartBtn />
        </div>
      </div>
      <SidebarSeparator />
      <div className="flex w-full justify-evenly p-1 md:hidden">
        <Search className="" input="p-1 text-sm h-7" />
        <span className={`${myoFont.className} text-primary`}>
          فروشگاه برند
        </span>
      </div>
    </nav>
  );
};

export default NavbarSm;
