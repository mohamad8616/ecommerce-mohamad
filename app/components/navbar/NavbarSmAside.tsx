import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { Button } from "../ui/Button";
import NavbarSmDropdown from "./NavbarSmDropdown";
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
        <ul className="p y-8 flex w-full flex-col items-start space-y-2    px-3 text-lg text-primary md:px-10 md:text-xl">
          <li> صفحه اصلی</li>
          <NavbarSmDropdown />
        </ul>
      </div>
    </aside>
  );
};

export default NavbarSmAside;
