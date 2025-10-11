import { PrismaClient } from "@prisma/client";
import { fakestoreData, products } from "@/lib/translatedData";

const prisma = new PrismaClient();

async function main() {
  // Seed FakeProducts (if using separate tables)
  for (const product of fakestoreData) {
    await prisma.fakeProduct.create({
      data: {
        externalId: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: product.rating.rate,
        rate: product.rating.rate,
        count: product.rating.count,
      },
    });
  }

  // Seed DummyProducts (if using separate tables)
  for (const product of products) {
    await prisma.dummyProduct.create({
      data: {
        externalId: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        tags: product.tags,
        brand: product.brand,
        sku: product.sku,
        weight: product.weight,
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        availabilityStatus: product.availabilityStatus,
        returnPolicy: product.returnPolicy,
        minimumOrderQuantity: product.minimumOrderQuantity,
        images: product.images,
        thumbnail: product.thumbnail,
        width: product.dimensions.width,
        height: product.dimensions.height,
        depth: product.dimensions.depth,
        barcode: product.meta.barcode,
        qrCode: product.meta.qrCode,
        reviews: {
          create: product.reviews.map((review) => ({
            rating: review.rating,
            comment: review.comment,
            date: new Date(review.date),
            reviewerName: review.reviewerName,
            reviewerEmail: review.reviewerEmail,
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
