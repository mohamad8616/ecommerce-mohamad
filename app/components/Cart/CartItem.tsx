import { isDummyProduct } from "@/lib/definitions";
import { fetchProductById } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/Button";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { price as priceFn } from "@/lib/utils";
import Loading from "../Loading";
import useCart from "@/app/stores/CartStore";

const CartItem = ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) => {
  console.log(productId);
  const { data, status } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });
  const { removeFromCart, incrementQuantity, decreaseQuantity } = useCart();

  if (status === "error") {
    return (
      <div className="flex w-full cursor-pointer items-center justify-between border-b-2 p-4 text-primary">
        <span> اشکال در بارگیری اظلاعات </span>
      </div>
    );
  }
  if (status === "pending") {
    return (
      <div className="flex w-full  items-center gap-4 rounded-2xl border-2 border-gray-200 bg-secondary p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-500">
        <div className="flex w-1/2 items-center justify-between">
          <span> در حال بارگیری ...</span>
          <Loading />
        </div>
      </div>
    );
  }
  if (status === "success") {
    const { title } = data;

    const isDummy = isDummyProduct(data!);

    return (
      <div className="flex w-full items-center gap-4 rounded-2xl border-2 border-gray-200 bg-secondary p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-500">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Image
            src={isDummy ? data.images[0] : data.image}
            alt={title || "Product Image"}
            width={90}
            height={90}
            className="rounded-xl object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex w-full flex-col justify-between">
          {/* Title */}
          <span className="line-clamp-1 text-lg font-medium text-primary">
            {title?.split(" ").slice(0, 5).join(" ") + " ..."}
          </span>

          {/* Optional Details (only for dummy data) */}
          {isDummy && (
            <div className="mt-1 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p>📦 {digitsEnToFa(data.shippingInformation!)}</p>
              <p>💳 {digitsEnToFa(data.warrantyInformation!)}</p>
              <p>
                🏷️ اسم برند:{" "}
                <span className="font-medium text-gray-800">{data.brand}</span>
              </p>
              <p>↩️ {data.returnPolicy}</p>
            </div>
          )}
          {/* Optional Details (only for dummy data) */}
          {!isDummy && (
            <p className="text-sm  text-gray-600 dark:text-gray-400">
              تعداد در انبار: {digitsEnToFa(data.count!)}
            </p>
          )}
          {!isDummy && (
            <p className="text-sm  text-gray-600 dark:text-gray-400">
              📦 ارسال سریع
            </p>
          )}
        </div>

        {/* Right Side: Actions / Price */}

        <div className="flex h-full w-full flex-col items-end justify-between space-y-4">
          <Button
            onClick={() => removeFromCart(productId)}
            variant="destructive"
            size="sm"
            className="mt-2 rounded-md  font-medium text-white transition hover:bg-primary/90"
          >
            -
          </Button>
          <span className="text-sm font-semibold text-primary">
            {priceFn(data.price)}
          </span>
          <div>
            <div className="gap- mb-6 flex w-full items-center justify-between">
              <div className="flex items-center rounded-lg border border-gray-300">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => decreaseQuantity(productId)}
                  className="px-3"
                >
                  -
                </Button>
                <span className="px-4 py-2 text-sm font-medium">
                  {quantity.toLocaleString("fa-IR")}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => incrementQuantity(productId)}
                  className="px-3"
                  disabled={isDummyProduct(data) && quantity >= data.stock!}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CartItem;
