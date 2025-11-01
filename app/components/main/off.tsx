import { getProductsByCategoryInFake } from "@/lib/queries";
import localFont from "next/font/local";
import OffSlider from "./OffSlider";
import { Percent } from "lucide-react";

const myoFont = localFont({
  src: "../../../fonts/AGhasem.ttf",
  display: "swap",
});

const off = async () => {
  const electronicProducts = await getProductsByCategoryInFake("الکترونیک");
  const jewelryProducts = await getProductsByCategoryInFake("جواهرات");

  return (
    <section className="mt-20 flex w-full flex-col items-center justify-between space-y-6 overflow-hidden bg-secondary p-2 text-primary lg:flex-row lg:border-4 lg:border-rose-500">
      <div className="w-full text-center lg:w-3/12">
        <h1
          className={`text-xl font-bold md:text-2xl lg:text-3xl ${myoFont.className} w-full p-5 tracking-wider  `}
        >
          جشنواره تخفیفات هفتگی
        </h1>
        <p
          className={`text-lg ${myoFont.className} w-full p-5 font-semibold tracking-wider `}
        >
          بهترین محصولات با تخفیف های ویژه
        </p>
        <Percent
          size={160}
          className="mx-auto mt-30 hidden text-rose-500 lg:block"
        />
      </div>
      <div className="w-full lg:w-9/12">
        <OffSlider products={[...electronicProducts, ...jewelryProducts]} />
      </div>
    </section>
  );
};

export default off;
