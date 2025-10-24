import Hero from "./components/main/Hero";
import ProductGroups from "./components/main/ProductGroups";

export default async function Home() {
  return (
    <div className="h-auto w-full bg-slate-100 pb-20 dark:bg-stone-900 ">
      <Hero />
      <ProductGroups />
    </div>
  );
}
