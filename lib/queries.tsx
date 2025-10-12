import { DummyProduct, FakeProduct } from "@prisma/client";
import { prisma } from "./prismaClient";

export const fetchProducts = async () => {
  const dummyData: DummyProduct[] = await prisma.dummyProduct.findMany();
  const fakeData: FakeProduct[] = await prisma.fakeProduct.findMany();
  return [...dummyData, ...fakeData];
};
