import { DummyProduct, FakeProduct } from "@prisma/client";
import { prisma } from "./prismaClient";

export const fetchProducts = async () => {
  const dummyData: DummyProduct[] = await prisma.dummyProduct.findMany();
  const fakeData: FakeProduct[] = await prisma.fakeProduct.findMany();
  return [...dummyData, ...fakeData];
};

export const getCategories = async () => {
  const dummyCategory: { category: string }[] =
    await prisma.dummyProduct.findMany({
      select: { category: true },
    });
  const fakeCategory: { category: string }[] =
    await prisma.fakeProduct.findMany({
      select: { category: true },
    });
  return [...dummyCategory, ...fakeCategory].filter(
    (category, i) =>
      category.category !==
      [...dummyCategory, ...fakeCategory][i + 1]?.category,
  );
};
