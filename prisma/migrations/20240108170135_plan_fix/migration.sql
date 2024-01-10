/*
  Warnings:

  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PartnerPlan" DROP CONSTRAINT "PartnerPlan_planId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_planId_fkey";

-- DropForeignKey
ALTER TABLE "PlanImage" DROP CONSTRAINT "PlanImage_ownerId_fkey";

-- DropTable
DROP TABLE "Plan";

-- CreateTable
CREATE TABLE "UserPlan" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "price" BIGINT NOT NULL,
    "originalPrice" BIGINT NOT NULL,

    CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_planId_fkey" FOREIGN KEY ("planId") REFERENCES "UserPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanImage" ADD CONSTRAINT "PlanImage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "UserPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerPlan" ADD CONSTRAINT "PartnerPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "UserPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
