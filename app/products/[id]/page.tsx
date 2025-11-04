import React from "react";
import { getProductById } from "@/lib/queries";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return <div>محصول مورد نظر یافت نشد</div>;
  }
  console.log(id);
  return <main className="h-full w-full bg-amber-500">page</main>;
};

export default page;
