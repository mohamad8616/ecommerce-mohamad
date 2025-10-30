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
    <section className="mt-20 flex w-full flex-col justify-between space-y-6 overflow-hidden p-2 lg:flex-row lg:bg-rose-500 dark:bg-stone-300">
      <div className="w-full  lg:w-3/12">
        <h1
          className={`text-xl font-bold md:text-2xl lg:text-3xl ${myoFont.className} w-full p-5 tracking-wider text-secondary `}
        >
          جشنواره تخفیفات هفتگی
        </h1>
        <p
          className={`text-lg ${myoFont.className} w-full p-5 font-semibold tracking-wider text-secondary `}
        >
          بهترین محصولات با تخفیف های ویژه
        </p>
        <Percent size={150} className="mt-30 hidden text-slate-100 lg:block" />
      </div>
      <div className="w-full lg:w-9/12">
        <OffSlider products={[...electronicProducts, ...jewelryProducts]} />
      </div>
    </section>
  );
};

export default off;
