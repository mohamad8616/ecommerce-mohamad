-- CreateTable
CREATE TABLE "fake_products" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "rate" DOUBLE PRECISION,
    "count" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fake_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dummy_products" (
    "id" SERIAL NOT NULL,
    "externalId" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountPercentage" DOUBLE PRECISION,
    "rating" DOUBLE PRECISION,
    "stock" INTEGER,
    "tags" TEXT[],
    "brand" TEXT,
    "sku" TEXT,
    "weight" DOUBLE PRECISION,
    "warrantyInformation" TEXT,
    "shippingInformation" TEXT,
    "availabilityStatus" TEXT,
    "returnPolicy" TEXT,
    "minimumOrderQuantity" INTEGER,
    "images" TEXT[],
    "thumbnail" TEXT,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "depth" DOUBLE PRECISION,
    "barcode" TEXT,
    "qrCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dummy_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dummy_reviews" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "comment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reviewerName" TEXT NOT NULL,
    "reviewerEmail" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "dummy_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dummy_products_sku_key" ON "dummy_products"("sku");

-- AddForeignKey
ALTER TABLE "dummy_reviews" ADD CONSTRAINT "dummy_reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "dummy_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
