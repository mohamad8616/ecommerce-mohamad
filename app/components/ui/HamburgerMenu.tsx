import { Menu } from "lucide-react";
import React from "react";

type HamburgerMenuProps = {
  onOpen: () => void;
  top?: number;
};

const HamburgerMenu = ({ onOpen, top }: HamburgerMenuProps) => {
  return (
    <button
      onClick={onOpen}
      className={`fixed right-4 z-50 rounded-lg bg-primary p-1  shadow-lg lg:hidden ${
        top ? `top-${top}` : "top-4"
      }`}
    >
      <Menu size={24} />
    </button>
  );
};

export default HamburgerMenu;
