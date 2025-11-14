/*
  Warnings:

  - You are about to drop the column `currency` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `InvoiceItem` table. All the data in the column will be lost.
  - Added the required column `productId` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."InvoiceItem" DROP CONSTRAINT "InvoiceItem_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "currency";

-- AlterTable
ALTER TABLE "InvoiceItem" DROP COLUMN "name",
ADD COLUMN     "productId" INTEGER NOT NULL,
ALTER COLUMN "invoiceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "InvoiceItem" ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
