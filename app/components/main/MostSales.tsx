import { getProductsByCategoryInDummy } from "@/lib/queries";
import React from "react";
import MostSalesSlider from "./MostSalesSlider";
import localFont from "next/font/local";

const myoFont = localFont({
  src: "../../../fonts/AGhasem.ttf",
  display: "swap",
});

const MostSales = async () => {
  const sofas = await getProductsByCategoryInDummy("مبلمان");
  const beauties = await getProductsByCategoryInDummy("زیبایی");

  return (
    <section className="mt-30 px-5 py-8">
      <h1
        className={`${myoFont.className} mb-8 text-center text-4xl font-bold`}
      >
        محصولات پرفروش
      </h1>
      <MostSalesSlider products={[...sofas, ...beauties]} />
    </section>
  );
};

export default MostSales;
