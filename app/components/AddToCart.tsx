import React from "react";
import { ShoppingBagIcon } from "lucide-react";
import { Button } from "./ui/Button";

const AddToCart = () => {
  return (
    <Button
      variant="outline"
      className="flex w-full items-center gap-1 rounded-sm border-0 bg-green-500 px-1 py-0.5 text-stone-50 transition-all duration-150 md:w-auto"
      // onClick={(e) => e.stopPropagation()}
    >
      افزودن به سبد
      <ShoppingBagIcon />
    </Button>
  );
};

export default AddToCart;
