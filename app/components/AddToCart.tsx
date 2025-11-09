import React from "react";
import { ShoppingBagIcon } from "lucide-react";
import { Button } from "./ui/Button";
import useCart from "@/app/stores/CartStore";

const AddToCart = ({
  productId,
  classname,
}: {
  productId: number;
  classname?: string;
}) => {
  const { addToCart } = useCart();

  return (
    <Button
      variant="outline"
      className={`flex w-full items-center gap-1 rounded-sm border-0 bg-green-500 p-0.5  text-stone-50 transition-all duration-150 md:w-auto ${classname}`}
      onClick={() => addToCart(productId)}
    >
      افزودن به سبد
      <ShoppingBagIcon />
    </Button>
  );
};

export default AddToCart;
