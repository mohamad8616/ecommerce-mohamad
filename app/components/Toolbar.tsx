"use client";
import { Button } from "@/app/components/ui/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/Sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { LayoutGrid, LucideHome, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import useCart from "../stores/CartStore";
import { categories } from "./navbar/NavLinks";
import Search from "./navbar/Search";

export default function MobileToolbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex h-12 items-center justify-around border-t border-border bg-secondary p-2 text-primary shadow-lg md:justify-evenly lg:hidden">
      {/* Main page */}
      <Link href="/" className="flex flex-col items-center text-xs md:text-sm">
        <LucideHome className="h-6 w-6" />
        صفحه اصلی
      </Link>

      {/* Search */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-primary"
          >
            <SearchIcon className="h-6 w-6" />
            <span className="text-xs md:text-sm">جستجو</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>جستجو</DialogTitle>
          </DialogHeader>
          {/* Replace with your search component or redirect logic */}
          <div className="mt-4 flex items-center gap-2">
            <Search className="text-sm md:text-sm" />
          </div>
        </DialogContent>
      </Dialog>

      {/* Cart */}
      <div className="flex w-auto cursor-pointer flex-col items-center justify-center text-center text-primary lg:hidden">
        <Link href="/cart" className="flex flex-col items-center ">
          {/* Icon wrapper */}
          <div className="relative">
            {/* Badge */}
            <span className="absolute -top-1 -right-2 rounded-sm border-2 border-white bg-red-500 px-1 text-xs text-white">
              {cartItems.length}
            </span>

            {/* Icon */}
            <IoCartOutline size={24} className="dark:text-white" />
          </div>

          {/* Label */}
          <span className="text-xs md:text-sm">سبد خرید</span>
        </Link>
      </div>

      {/* Categories */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="flex flex-col items-center text-primary"
          >
            <LayoutGrid className="h-6 w-6" />
            <span className="text-xs md:text-sm">دسته بندی ها</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="h-1/2 overflow-y-auto rounded-t-2xl"
        >
          <SheetHeader>
            <SheetTitle className="mt-3.5">دسته بندی محصولات</SheetTitle>
          </SheetHeader>
          <div className="mt-1 grid grid-cols-2 gap-4 px-3">
            {categories?.map((cat) => (
              <Link
                key={cat.link}
                href={cat.link}
                className="rounded-xl border border-border p-3 text-center hover:bg-accent"
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
