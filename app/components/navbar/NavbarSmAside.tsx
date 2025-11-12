import clsx from "clsx";
import Link from "next/link";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { Button } from "../ui/Button";
import { categories } from "./NavLinks";

type NavbarSmAsideProps = {
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};
const NavbarSmAside = ({ onClose, isOpen }: NavbarSmAsideProps) => {
  return (
    <aside>
      {/* BLACK BACKGOUND */}
      <div
        onClick={onClose}
        className={clsx(
          `inset-0 top-0 left-0 z-20 flex h-screen w-screen items-center bg-primary/60 duration-100`,
          isOpen ? "absolute" : "hidden",
        )}
      ></div>

      {/* NAVBAR */}
      <div
        className={clsx(
          `absolute top-0 z-50 flex h-screen w-10/12 flex-col bg-secondary backdrop-blur-lg duration-200 ease-in-out`,
          {
            "right-0": isOpen,
            "-right-full": !isOpen,
          },
        )}
      >
        <Button
          variant="destructive"
          className="absolute top-4 left-4 h-8 w-8 p-0"
          onClick={onClose}
        >
          <IoClose />
        </Button>
        <div className="h-20 w-full border-b-2"></div>
        <nav
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.closest("a")) {
              setTimeout(() => {
                onClose();
              }, 1700);
            }
          }}
          className="mt-8 flex h-full flex-1 flex-col justify-between overflow-y-auto px-4 pb-4"
        >
          <ul className="space-y-2">
            <li>
              <Link
                href="/"
                className="group flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary/10 to-transparent px-4 py-3 text-base font-medium text-primary transition-all duration-300 hover:from-primary/20 hover:shadow-md active:scale-[0.98]"
              >
                <span className="h-2 w-2 rounded-full bg-primary/40 transition-all group-hover:bg-primary" />
                صفحه اصلی
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-base  text-primary transition-all duration-300 hover:from-primary/20 hover:shadow-md active:scale-[0.98]"
              >
                <span className="h-2 w-2 rounded-full bg-secondary-foreground/20 transition-all group-hover:bg-primary" />
                همه محصولات
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.title}>
                <Link
                  href={cat.link}
                  className="group flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-secondary-foreground/80 transition-all duration-300 hover:bg-secondary-foreground/5 hover:text-secondary-foreground active:scale-[0.98]"
                >
                  <span className="h-2 w-2 rounded-full bg-secondary-foreground/20 transition-all group-hover:bg-secondary-foreground/60" />
                  {cat.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/cart" className="block w-full">
            <Button
              className="w-full border-2 border-destructive-foreground text-secondary-foreground dark:border-muted-foreground"
              variant="outline"
            >
              سبد خرید
              <IoCartOutline className="inline-block size-6 text-red-500 dark:text-muted-foreground" />
            </Button>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default NavbarSmAside;
