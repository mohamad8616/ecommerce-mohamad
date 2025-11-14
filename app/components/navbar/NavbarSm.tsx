"use client";
import { User } from "@/lib/auth";
import { useEffect, useState } from "react";
import { ModeToggle } from "../DarkmodeToggle";
import Profile from "./profile";
import HamburgerMenu from "../ui/HamburgerMenu";

import NavbarSmAside from "./NavbarSmAside";
import Link from "next/link";
import { IoPerson } from "react-icons/io5";
import CartBtn from "../Cart/CartBtn";

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
    <nav className="relative flex min-h-12 w-full items-center justify-between bg-sidebar px-3 py-2 text-secondary lg:hidden">
      <NavbarSmAside
        onToggle={() => setIsMobileOpen((prev) => !prev)}
        onOpen={() => setIsMobileOpen(true)}
        onClose={() => setIsMobileOpen(false)}
        isOpen={isMobileOpen}
      />

      <HamburgerMenu onOpen={() => setIsMobileOpen((prev) => !prev)} top={1} />
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
    </nav>
  );
};

export default NavbarSm;
