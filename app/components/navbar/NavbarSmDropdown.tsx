import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import { Checkbox } from "@/app/components/ui/CheckBox";
import { categories } from "./NavLinks";
import Link from "next/link";

export default function ProductCategories() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <section className="relative w-full rounded-xl border border-border bg-card p-4 shadow-sm">
      <Button
        onClick={handleToggle}
        variant="ghost"
        className="flex w-full justify-between text-lg"
      >
        محصولات
        {open ? (
          <ChevronUp className="transition-all" />
        ) : (
          <ChevronDown className="transition-all" />
        )}
      </Button>

      {/* Accordion Body */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <form className="space-y-3 pt-4">
          {categories.map((category, i) => (
            <div key={i} className="flex items-center gap-3">
              <Checkbox id={`category-${category}`} />
              <label
                className="text-sm text-foreground"
                htmlFor={`category-${category}`}
              >
                {category}
              </label>
            </div>
          ))}

          <div className="flex items-center gap-3 border-t border-border pt-2">
            <Link
              href="/products"
              className="flex items-center text-sm text-primary"
            >
              مشاهده همه محصولات <ChevronLeft size={14} />
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
