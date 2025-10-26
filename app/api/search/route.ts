import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const normalized = q?.normalize("NFC");

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const fakeProducts = await prisma.fakeProduct.findMany({
    where: {
      category: { contains: normalized },
    },
    take: 5,
  });
  const dummyProducts = await prisma.dummyProduct.findMany({
    where: {
      category: { contains: normalized },
    },

    take: 5,
  });

  return NextResponse.json({ results: [...fakeProducts, ...dummyProducts] });
}
