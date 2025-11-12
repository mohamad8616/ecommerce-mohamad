import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/NavigationMenu";

export const categories = [
  { title: "الکترونیک", link: "/products/category/electronic" },
  { title: "جواهرات", link: "/products/category/jewelry" },
  { title: "خواربار", link: "/products/category/grocery" },
  { title: "زیبایی", link: "/products/category/beauty" },
  { title: "عطر ها", link: "/products/category/perfume" },
  { title: "لباس زنانه", link: "/products/category/womenClothes" },
  { title: "لباس مردانه", link: "/products/category/menClothes" },
  { title: "مبلمان", link: "/products/category/sofa" },
];

const NavLinks = () => {
  return (
    <NavigationMenu className="items-cente flex w-full">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className=" w-full cursor-pointer bg-transparent font-semibold">
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
                  key={category.title}
                  className="block w-full p-3 text-end underline-offset-1 hover:underline"
                  href={`${category.link}`}
                >
                  {category.title}
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
