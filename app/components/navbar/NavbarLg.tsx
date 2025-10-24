"use client";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/Button";
import NavLinks from "./NavLinks";

import { usePathname } from "next/navigation";
import { ModeToggle } from "../DarkmodeToggle";
import CartSheet from "./CartSheet";

const NavbarLg = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  if (pathname !== "/profile") {
    return (
      <nav className="relavtive mx-auto hidden w-11/12 grid-cols-6  items-center justify-between rounded-full bg-stone-900/50 px-4 py-2 text-stone-900 lg:grid dark:bg-stone-900 dark:text-slate-100">
        <div className="flex items-center justify-start space-x-6 px-3 lg:col-span-2">
          <Link href="/" className="flex items-center space-x-4 ">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <h1 className="hidden text-lg font-semibold xl:block">
              فروشگاه محمد
            </h1>
          </Link>
          <Button
            variant="default"
            size="lg"
            className="col-span-2 flex w-auto justify-between border-2 border-slate-500 p-1 xl:w-56 "
          >
            <span className="hidden xl:inline"> جستجو</span>
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
        <div className=" flex items-center justify-center lg:col-span-2">
          <NavLinks />
        </div>

        {/* DARKMODE--LOGIN|USERdaTA---CART BUTTON */}
        <div className="flex items-center justify-end space-x-6 lg:col-span-2">
          {!user && (
            <Link
              href="/login"
              className=" py-2 text-center text-sm underline-offset-2 hover:underline xl:text-lg"
            >
              ورود | ثبت نام
            </Link>
          )}
          {user && (
            <Link href={`/profile`}>
              {user.image && (
                <Avatar>
                  <AvatarImage
                    src={user.image}
                    className="h-10 w-10 rounded-full"
                  />
                  <AvatarFallback>{user.name}</AvatarFallback>
                </Avatar>
              )}
              {!user.image && <span>{user.name}</span>}
            </Link>
          )}
          <ModeToggle />
          <CartSheet />
        </div>
      </nav>
    );
  }
};

export default NavbarLg;
