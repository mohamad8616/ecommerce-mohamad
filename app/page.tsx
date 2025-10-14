import Hero from "./components/main/Hero";
import ProductGroups from "./components/products/ProductGroups";

export default function Home() {
  return (
    <div className="min-h-svh w-full bg-slate-100 pb-20 dark:bg-stone-900 ">
      <Hero />
      <ProductGroups />
    </div>
  );
}
