"use server";
import { prisma } from "@/lib/prismaClient";
import type { DummyProduct, FakeProduct } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const search = searchParams.get("search") || "";

    // Restrict to safe sort fields
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build where condition
    const buildWhereCondition = () => {
      const where: {
        OR?: {
          name?: { contains: string; mode: "insensitive" };
          description?: { contains: string; mode: "insensitive" };
        }[];
      } = {};

      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" as const } },
          { description: { contains: search, mode: "insensitive" as const } },
        ];
      }

      return where;
    };

    const whereCondition = buildWhereCondition();

    // Define safe orderBy configuration
    const getOrderBy = () => {
      const safeSortFields = ["createdAt", "updatedAt", "name", "price"];
      const field = safeSortFields.includes(sortBy) ? sortBy : "createdAt";

      return { [field]: sortOrder };
    };

    const [fakeProducts, dummyProducts, totalFakeCount, totalDummyCount] =
      await Promise.all([
        prisma.fakeProduct.findMany({
          where: whereCondition,
          orderBy: getOrderBy(),
        }),
        prisma.dummyProduct.findMany({
          where: whereCondition,
          orderBy: getOrderBy(),
        }),
        prisma.fakeProduct.count({ where: whereCondition }),
        prisma.dummyProduct.count({ where: whereCondition }),
      ]);

    // Combine products
    const combinedProducts = [
      ...fakeProducts.map((product) => ({
        ...product,
        productType: "fake" as const,
      })),
      ...dummyProducts.map((product) => ({
        ...product,
        productType: "dummy" as const,
      })),
    ];

    const sortedProducts = combinedProducts.sort((a, b) => {
      // Use a type-safe approach by checking the field
      let aValue: number | string;
      let bValue: number | string;

      switch (sortBy) {
        case "title":
          aValue = a.title;
          bValue = b.title;
          break;
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "category":
          aValue = a.category;
          bValue = b.category;
          break;
        case "updatedAt":
          aValue = new Date(a.updatedAt).getTime();
          bValue = new Date(b.updatedAt).getTime();
          break;
        default: // createdAt
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
      }

      if (sortOrder === "desc") {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    const totalCombinedProducts = totalFakeCount + totalDummyCount;
    const paginatedProducts = sortedProducts.slice(skip, skip + limit);
    const totalPages = Math.ceil(totalCombinedProducts / limit);

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        summary: {
          totalFake: totalFakeCount,
          totalDummy: totalDummyCount,
          totalCombined: totalCombinedProducts,
        },
      },
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: totalCombinedProducts,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
