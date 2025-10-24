import ProductsGroupItem from "./ProductsGroupItem";

const categories = [
  { title: "الکترونیک", img: "" },
  { title: "خواربار", img: "" },
  { title: "زیبایی و بهداشت", img: "" },
  { title: "مبلمان", img: "" },
  { title: "لباس", img: "" },
];

const ProductGroups = async () => {
  return (
    <section className="mx-auto mt-10 w-full rounded-2xl bg-red-700 p-6 shadow-md">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="mb-1 text-3xl font-extrabold text-white">
          بیشترین بازدید
        </h1>
        <p className="text-sm text-white opacity-90">دسته بندی محصولات</p>
      </div>

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
