import { prisma } from "@/lib/prismaClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }
  const dummyProduct = await prisma.dummyProduct.findUnique({
    where: {
      id: Number(id),
    },
  });
  const fakeProduc = await prisma.fakeProduct.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!dummyProduct && !fakeProduc) {
    return NextResponse.json({ error: "product not found" }, { status: 404 });
  }
  return NextResponse.json(dummyProduct || fakeProduc);
}
