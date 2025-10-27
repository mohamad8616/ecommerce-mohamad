import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const normalized = q?.normalize("NFC");
  console.log(q, normalized);
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }
  const fakeCount = await prisma.fakeProduct.count();
  const dummyCount = await prisma.dummyProduct.count();

  console.log("fake count:", fakeCount, "dummy count:", dummyCount);
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
