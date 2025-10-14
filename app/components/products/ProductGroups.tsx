import { AllCategories } from "@/lib/definitions";
import ProductsGroupItem from "./ProductsGroupItem";

const categories = [
  "الکترونیک",
  "خواربار",
  "زیبایی و بهداشت",
  "مبلمان",
  "لباس",
];
const ProductGroups = async () => {
  return (
    <div className="mx-auto mt-10 flex h-[300px] w-11/12 items-center justify-between rounded-xl bg-red-700 p-4">
      <div className="flex h-full w-2/12 flex-col items-center justify-center  px-3">
        <h1 className="text-center text-4xl font-bold"> بیشترین بازدید</h1>
        <h1 className="text-lg font-bold">دسته بندی محصولات</h1>
      </div>
      <div className="flex h-full w-10/12 items-center justify-between bg-slate-100 px-6 py-4">
        {categories.map((category, i) => {
          return <ProductsGroupItem key={i} category={category} />;
        })}
      </div>
    </div>
  );
};

export default ProductGroups;
