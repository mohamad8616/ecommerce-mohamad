-- AlterTable
ALTER TABLE "user" ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "phoneNumberVerified" BOOLEAN NOT NULL DEFAULT false;
