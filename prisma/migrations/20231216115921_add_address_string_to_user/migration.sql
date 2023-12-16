/*
  Warnings:

  - You are about to drop the column `birthday` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthday",
ADD COLUMN     "addressShort" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3);
