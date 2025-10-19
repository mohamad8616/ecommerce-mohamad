import React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../ui/NavigationMenu";
import Link from "next/link";
import { AllCategories } from "@/lib/definitions";

const categories: AllCategories = [
  "الکترونیک",
  "جواهرات",
  "خواربار",
  "زیبایی",
  "عطر ها",
  "لباس زنانه",
  "لباس مردانه",
  "مبلمان",
];

const NavLinks = () => {
  return (
    <NavigationMenu className="lg:col-span-2">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className=" cursor-pointer bg-transparent font-semibold text-stone-900 dark:text-slate-200">
            محصولات
          </NavigationMenuTrigger>
          <NavigationMenuContent className="grid h-auto w-auto min-w-96 grid-cols-2 border-0 text-end ">
            <NavigationMenuLink className=" ">
              <Link className="w-full p-3" href="/products">
                مشاهده تمامی محصولات
              </Link>
            </NavigationMenuLink>{" "}
            <NavigationMenuLink className="">
              <h1 className="w-full p-3 text-lg">دسته بندی ها</h1>
              {categories.map((category) => (
                <Link
                  key={category}
                  className="block w-full p-3 text-end underline-offset-1 hover:underline"
                  href={`/products/${category}`}
                >
                  {category}
                </Link>
              ))}
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;
