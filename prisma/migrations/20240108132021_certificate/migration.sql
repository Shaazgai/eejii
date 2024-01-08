/*
  Warnings:

  - Added the required column `grade` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationName` to the `Certificate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `volunteerName` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Certificate_volunteerId_idx";

-- AlterTable
ALTER TABLE "Certificate" ADD COLUMN     "certificateTemplateId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "grade" INTEGER NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "organizationId" TEXT,
ADD COLUMN     "organizationName" TEXT NOT NULL,
ADD COLUMN     "volunteerName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "partnerPlanId" TEXT;

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" BIGINT NOT NULL,
    "originalPrice" BIGINT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanImage" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "path" TEXT,
    "type" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "PlanImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerPlan" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "planId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PartnerPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CertificateTemplate" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "organizationName" TEXT NOT NULL,
    "logoPath" TEXT,
    "stampPath" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "CertificateTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_code_key" ON "Plan"("code");

-- CreateIndex
CREATE INDEX "PlanImage_ownerId_idx" ON "PlanImage"("ownerId");

-- CreateIndex
CREATE INDEX "PartnerPlan_userId_planId_idx" ON "PartnerPlan"("userId", "planId");

-- CreateIndex
CREATE INDEX "CertificateTemplate_userId_idx" ON "CertificateTemplate"("userId");

-- CreateIndex
CREATE INDEX "Banner_bannerPositionId_idx" ON "Banner"("bannerPositionId");

-- CreateIndex
CREATE INDEX "Certificate_volunteerId_organizationId_idx" ON "Certificate"("volunteerId", "organizationId");

-- CreateIndex
CREATE INDEX "EventImage_ownerId_idx" ON "EventImage"("ownerId");

-- CreateIndex
CREATE INDEX "Media_ownerId_idx" ON "Media"("ownerId");

-- CreateIndex
CREATE INDEX "MediaImage_ownerId_idx" ON "MediaImage"("ownerId");

-- CreateIndex
CREATE INDEX "Payment_partnerPlanId_donationId_idx" ON "Payment"("partnerPlanId", "donationId");

-- CreateIndex
CREATE INDEX "ProjectImage_ownerId_idx" ON "ProjectImage"("ownerId");

-- CreateIndex
CREATE INDEX "UserImage_ownerId_idx" ON "UserImage"("ownerId");

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_certificateTemplateId_fkey" FOREIGN KEY ("certificateTemplateId") REFERENCES "CertificateTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_partnerPlanId_fkey" FOREIGN KEY ("partnerPlanId") REFERENCES "PartnerPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanImage" ADD CONSTRAINT "PlanImage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerPlan" ADD CONSTRAINT "PartnerPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerPlan" ADD CONSTRAINT "PartnerPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CertificateTemplate" ADD CONSTRAINT "CertificateTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
