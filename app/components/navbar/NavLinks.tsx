import { AllCategories } from "@/lib/definitions";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/NavigationMenu";

export const categories: AllCategories = [
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
    <NavigationMenu className="items-cente flex w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className=" w-full cursor-pointer bg-transparent font-semibold text-stone-900 dark:text-slate-200">
            محصولات
          </NavigationMenuTrigger>
          <NavigationMenuContent className="grid h-auto w-auto min-w-96 grid-cols-2 border-0 text-end ">
            <NavigationMenuLink className=" " asChild>
              <Link className="w-full p-3" href="/products">
                مشاهده تمامی محصولات
              </Link>
            </NavigationMenuLink>{" "}
            <div>
              {categories.map((category) => (
                <NavigationMenuLink
                  key={category}
                  className="block w-full p-3 text-end underline-offset-1 hover:underline"
                  href={`/products/${category}`}
                >
                  {category}
                </NavigationMenuLink>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinks;
