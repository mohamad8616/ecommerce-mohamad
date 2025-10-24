import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/Sheet";
import { IoCartOutline } from "react-icons/io5";
import React from "react";

const CartSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative flex h-10 w-10 cursor-pointer  items-center text-2xl text-slate-200">
          <span className="absolute top-0 -right-1 rounded-full bg-red-600 px-1 py-0.5 text-xs text-white ">
            0
          </span>
          <IoCartOutline className="text-stone-900 dark:text-slate-200" />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mt-10">
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
