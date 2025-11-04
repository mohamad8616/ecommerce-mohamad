import { DummyProduct, FakeProduct } from "@prisma/client";
import { prisma } from "./prismaClient";

export const fetchProducts = async (
  page = 1,
): Promise<{
  products: {
    products: Array<DummyProduct | FakeProduct>;
    summary: { totalCombined: number; totalFake: number; totalDummy: number };
  };
  hasMore: boolean;
  totalPage: number;
}> => {
  const response = await fetch(`/api/data?page=${page}`);
  return await response.json().then((data) => ({
    products: data.data,
    hasMore: data.pagination.hasNext,
    totalPage: data.pagination.totalPages,
  }));
};

export const fetchTotalPages = async () => {
  const res = await fetch(`api/data`);
  const data = await res.json();
  return data.pagination.totalPages;
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

export const getProductById = async (id: string) => {
  const [dummyProduct, fakeProduct] = await Promise.all([
    prisma.dummyProduct.findUnique({
      where: { id: Number(id) },
    }),
    prisma.fakeProduct.findUnique({
      where: { id: Number(id) },
    }),
  ]);
  return dummyProduct || fakeProduct;
};
