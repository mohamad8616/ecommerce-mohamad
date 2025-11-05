import ProductsGroupItem from "./ProductsGroupItem";
import grocery from "@/public/category/apple.jpg";
import electronic from "@/public/category/laptop.jpg";
import sofa from "@/public/category/sofa.jpg";
import clothes from "@/public/category/clothes.jpg";
import beauty from "@/public/category/beauty.jpg";

const categories = [
  { title: "الکترونیک", img: electronic, link: "electronic" },
  { title: "خواربار", img: grocery, link: "grocery" },
  { title: "زیبایی و بهداشت", img: beauty, link: "beauty" },
  { title: "مبلمان", img: sofa, link: "sofa" },
  { title: "لباس", img: clothes, link: "menClothes" },
];

const ProductGroups = async () => {
  return (
    <section className="mx-auto mt-20 w-full bg-gradient-to-r from-gray-200 to-gray-500 p-6 shadow-md">
      {/* Category List */}
      <div className="grid w-full grid-cols-2 place-items-center gap-6 rounded-xl p-6 sm:grid-cols-3 md:grid-cols-5">
        {categories.map((cat, index) => (
          <ProductsGroupItem
            key={index}
            categoryTitle={cat.title}
            image={cat.img}
            link={cat.link}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGroups;
