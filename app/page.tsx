import CategoryBoxes from "./components/main/CategoryBoxes";
import Clothes from "./components/main/Clothes";
import Hero from "./components/main/Hero";
import MostSales from "./components/main/MostSales";
import Off from "./components/main/off";
import ProductGroups from "./components/main/ProductGroups";

export default async function Home() {
  return (
    <div className="h-auto w-full bg-slate-100 pb-20 dark:bg-stone-900 ">
      <Hero />
      <ProductGroups />
      <Off />
      <CategoryBoxes />
      <MostSales />
      <Clothes />
    </div>
  );
}
