/*
  Warnings:

  - Added the required column `enabled` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enabled` to the `Fundraising` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enabled` to the `GrantFundraising` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED', 'DONE');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "enabled" BOOLEAN NOT NULL,
ADD COLUMN     "status" "ProjectStatus";

-- AlterTable
ALTER TABLE "Fundraising" ADD COLUMN     "enabled" BOOLEAN NOT NULL,
ADD COLUMN     "status" "ProjectStatus";

-- AlterTable
ALTER TABLE "GrantFundraising" ADD COLUMN     "enabled" BOOLEAN NOT NULL,
ADD COLUMN     "status" "ProjectStatus";
