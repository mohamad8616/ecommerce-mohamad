/*
  Warnings:

  - You are about to drop the column `status` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `authority` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "status",
ADD COLUMN     "authority" TEXT NOT NULL;
