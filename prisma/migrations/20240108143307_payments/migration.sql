/*
  Warnings:

  - You are about to drop the column `userId` on the `PartnerPlan` table. All the data in the column will be lost.
  - You are about to drop the column `partnerPlanId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[partnerPlanId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Banner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partnerPlanId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PartnerPlan" DROP CONSTRAINT "PartnerPlan_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_donationId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_partnerPlanId_fkey";

-- DropIndex
DROP INDEX "PartnerPlan_userId_planId_idx";

-- DropIndex
DROP INDEX "Payment_partnerPlanId_donationId_idx";

-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BannerPosition" ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "PartnerPlan" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "partnerPlanId",
ADD COLUMN     "bannerPositionId" TEXT,
ADD COLUMN     "permitId" TEXT,
ADD COLUMN     "planId" TEXT,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "donationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "partnerPlanId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PartnerBanner" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "bannerId" TEXT NOT NULL,
    "userId" TEXT,
    "active" BOOLEAN NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permit" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "originalPrice" BIGINT NOT NULL,
    "eventPermit" INTEGER NOT NULL DEFAULT 2,
    "projectPermit" INTEGER NOT NULL DEFAULT 2,
    "bannerPermit" INTEGER NOT NULL DEFAULT 2,

    CONSTRAINT "Permit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerPermit" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "eventPermit" INTEGER NOT NULL DEFAULT 2,
    "projectPermit" INTEGER NOT NULL DEFAULT 2,
    "bannerPermit" INTEGER NOT NULL DEFAULT 2,
    "userId" TEXT,

    CONSTRAINT "PartnerPermit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PartnerBanner_bannerId_key" ON "PartnerBanner"("bannerId");

-- CreateIndex
CREATE INDEX "PartnerBanner_userId_idx" ON "PartnerBanner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Permit_code_key" ON "Permit"("code");

-- CreateIndex
CREATE INDEX "PartnerPlan_planId_idx" ON "PartnerPlan"("planId");

-- CreateIndex
CREATE INDEX "Payment_planId_bannerPositionId_permitId_donationId_idx" ON "Payment"("planId", "bannerPositionId", "permitId", "donationId");

-- CreateIndex
CREATE UNIQUE INDEX "User_partnerPlanId_key" ON "User"("partnerPlanId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_partnerPlanId_fkey" FOREIGN KEY ("partnerPlanId") REFERENCES "PartnerPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bannerPositionId_fkey" FOREIGN KEY ("bannerPositionId") REFERENCES "BannerPosition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_permitId_fkey" FOREIGN KEY ("permitId") REFERENCES "Permit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerBanner" ADD CONSTRAINT "PartnerBanner_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Banner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerBanner" ADD CONSTRAINT "PartnerBanner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerPermit" ADD CONSTRAINT "PartnerPermit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
