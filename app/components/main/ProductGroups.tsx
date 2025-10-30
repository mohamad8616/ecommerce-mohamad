import ProductsGroupItem from "./ProductsGroupItem";
import grocery from "@/public/category/apple.jpg";
import electronic from "@/public/category/laptop.jpg";
import sofa from "@/public/category/sofa.jpg";
import clothes from "@/public/category/clothes.jpg";
import beauty from "@/public/category/beauty.jpg";

const categories = [
  { title: "الکترونیک", img: electronic },
  { title: "خواربار", img: grocery },
  { title: "زیبایی و بهداشت", img: beauty },
  { title: "مبلمان", img: sofa },
  { title: "لباس", img: clothes },
];

const ProductGroups = async () => {
  return (
    <section className="mx-auto mt-10 w-full bg-gradient-to-r from-gray-300 to-gray-400 p-6 shadow-md">
      {/* Category List */}
      <div className="grid w-full grid-cols-2 place-items-center gap-6 rounded-xl bg-slate-100 p-6 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((cat, index) => (
          <ProductsGroupItem key={index} category={cat.title} image={cat.img} />
        ))}
      </div>
    </section>
  );
};

export default ProductGroups;
