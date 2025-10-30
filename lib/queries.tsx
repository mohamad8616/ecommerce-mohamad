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

export const getProductsByCategoryInFake = async (category: string) => {
  const fakeProducts = await prisma.fakeProduct.findMany({
    where: { category },
    take: 4,
  });
  return [...fakeProducts];
};

export const getProductsByCategoryInDummy = async (category: string) => {
  const dummyProducts = await prisma.dummyProduct.findMany({
    where: { category },
  });
  return [...dummyProducts];
};
