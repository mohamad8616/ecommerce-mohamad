import { digitsEnToFa } from "@persian-tools/persian-tools";
import { clsx, type ClassValue } from "clsx";
import { Star } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      size={14}
      className={
        index < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : "text-gray-300"
      }
    />
  ));
};

export const formatToRial = (price: number) => {
  return new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
  }).format(price);
};

export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const price = (price: number, discount?: boolean) => {
  const rounded = Math.round(price);
  const separated = formatNumber(rounded);
  const localized = digitsEnToFa(separated);

  return discount ? `${localized} %` : `${localized} ریال`;
};
