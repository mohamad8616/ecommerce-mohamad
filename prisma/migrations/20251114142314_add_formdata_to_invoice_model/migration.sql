/*
  Warnings:

  - Added the required column `address` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `invoiceNumber` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "mobile" TEXT NOT NULL,
DROP COLUMN "invoiceNumber",
ADD COLUMN     "invoiceNumber" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON "Invoice"("invoiceNumber");
