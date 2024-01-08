/*
  Warnings:

  - You are about to drop the column `type` on the `Banner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Banner" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "BannerPosition" ADD COLUMN     "type" TEXT;
