/*
  Warnings:

  - You are about to drop the column `approved` on the `User` table. All the data in the column will be lost.
  - The `type` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER_VOLUNTEER', 'USER_PARTNER', 'USER_SUPPORTER');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('REQUEST_PENDING', 'REQUEST_DENIED', 'REQUEST_APPROVED');

-- DropIndex
DROP INDEX "Payment_donationId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "approved",
ADD COLUMN     "password" TEXT,
ADD COLUMN     "requestSend" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requestStatus" "RequestType",
DROP COLUMN "type",
ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'USER_VOLUNTEER';
