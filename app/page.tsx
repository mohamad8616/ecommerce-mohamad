import Hero from "./components/main/Hero";
import ProductGroups from "./components/products/ProductGroups";
import { getSession } from "./_customhooks/hooks";

export default async function Home() {
  // const session = await getSession();
  return (
    <div className="min-h-svh w-full bg-slate-100 pb-20 dark:bg-stone-900 ">
      <Hero />
      <ProductGroups />
    </div>
  );
}
