"use client";

import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ModeToggle } from "../DarkmodeToggle";
import CartSheet from "./CartSheet";
import NavLinks from "./NavLinks";
import Search from "../search/Search";

const NavbarLg = ({ user }: { user: User | null }) => {
  const pathname = usePathname();

  // Hide navbar on profile page
  if (pathname === "/profile") return null;

  return (
    <nav
      className="
        mx-auto hidden w-11/12 grid-cols-6 items-center justify-between
        rounded-full border border-stone-700/40 bg-stone-900/60
        px-6 py-2 text-slate-100 shadow-xl shadow-black/10
        backdrop-blur-md lg:grid
      "
    >
      {/* LOGO / SEARCH */}
      <div className="flex items-center justify-start space-x-6 px-3 lg:col-span-2">
        <Link href="/" className="flex items-center space-x-4">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={55}
            height={55}
            className="rounded-full"
          />
        </Link>

        {/* SEARCH BUTTON */}
        <Search />
      </div>

      {/* NAVLINKS */}
      <div className="flex items-center justify-center lg:col-span-2">
        <NavLinks />
      </div>

      {/* RIGHT CONTROL SECTION */}
      <div className="flex items-center justify-end space-x-6 lg:col-span-2">
        {!user ? (
          <Link
            href="/login"
            className="
              py-2 text-sm underline-offset-4 transition hover:underline
              xl:text-lg
            "
          >
            ورود | ثبت نام
          </Link>
        ) : (
          <Link href="/profile">
            <div className="flex items-center gap-2 transition hover:opacity-80">
              <Avatar>
                <AvatarImage
                  src={user.image ?? ""}
                  className="h-10 w-10 rounded-full"
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <span className="hidden font-medium xl:inline">{user.name}</span>
            </div>
          </Link>
        )}

        <ModeToggle />
        <CartSheet />
      </div>
    </nav>
  );
};

export default NavbarLg;
