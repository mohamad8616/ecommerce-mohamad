import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { categories as defaultCategories } from "../navbar/NavLinks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Category = { title: string; link: string };

function CategoryLinksSelect({
  categories = defaultCategories,
  label = "همه دسته‌بندی‌ها",
  className,
  allHref = "/products",
}: {
  categories?: Category[];
  label?: string;
  className?: string;
  allHref?: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={
            "flex cursor-pointer items-center gap-1 rounded-xl border bg-white/80 px-2 py-1 text-sm md:px-4 md:py-2 md:text-base dark:border-gray-600 dark:bg-gray-800/80 " +
            (className || "")
          }
        >
          {label}
          <ChevronDown />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuItem asChild>
          <Link
            href={allHref}
            className="cursor-pointer rounded-sm px-2 py-1.5"
          >
            <span className="ml-auto">همه دسته‌بندی‌ها</span>
          </Link>
        </DropdownMenuItem>
        {categories.map((cat, i) => (
          <DropdownMenuItem key={i} asChild>
            <Link
              href={cat.link}
              className="my-2 flex cursor-pointer justify-start rounded-sm px-2 py-1.5"
            >
              <span className="ml-auto">{cat.title}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CategoryLinksSelect;
