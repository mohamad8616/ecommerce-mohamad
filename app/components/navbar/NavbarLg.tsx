"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import localFont from "next/font/local";
import CartBtn from "../Cart/CartBtn";
import { ModeToggle } from "../DarkmodeToggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tootltip";
import NavLinks from "./NavLinks";
import Search from "./Search";
import { User } from "better-auth";

const myoFont = localFont({
  src: "../../../fonts/AGhasem.ttf",
  display: "swap",
});

const NavbarLg = ({ user }: { user: User | null }) => {
  const pathname = usePathname();

  // Hide navbar on profile page
  if (pathname === "/profile") return null;

  return (
    <nav
      className="
        mx-auto hidden w-11/12 grid-cols-5 items-center justify-between
        rounded-full border border-stone-700/40 bg-stone-900/60
        px-6 py-2 text-slate-100 shadow-xl shadow-black/10
        backdrop-blur-md lg:grid
      "
    >
      {/* LOGO / SEARCH */}
      <div className="flex items-center justify-start space-x-6 px-3 lg:col-span-1">
        <Link href="/" className="flex items-center space-x-4">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={55}
            height={55}
            className="rounded-full"
          />
          <span className={myoFont.className}>فروشگاه برند</span>
        </Link>
      </div>
      <div className="lg:col-span-2">
        {/* SEARCH BUTTON */}
        <Search />
      </div>

      {/* RIGHT CONTROL SECTION */}
      <div className="flex items-center justify-between space-x-6 lg:col-span-2">
        {/* NAVLINKS */}
        <NavLinks />

        {/* Navbar profile */}
        {!user ? (
          <Link
            href="/login"
            className="
              py-2 text-sm underline-offset-4 transition hover:underline
            "
          >
            ورود | ثبت نام
          </Link>
        ) : (
          <Link href="/profile">
            <Tooltip>
              <TooltipTrigger className="flex cursor-pointer items-center gap-2  transition-all">
                {" "}
                <Avatar>
                  <AvatarImage
                    src={user.image ?? ""}
                    className="h-10 w-10 rounded-full"
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
                <span className="hidden font-medium xl:inline">
                  {user.name}
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-stone-100 text-stone-800">
                <p>نمایش کل پروفایل</p>
              </TooltipContent>
            </Tooltip>
          </Link>
        )}
        {/* Darkmode toggle */}
        <ModeToggle />

        {/* Cart button */}
        <CartBtn />
      </div>
    </nav>
  );
};

export default NavbarLg;
