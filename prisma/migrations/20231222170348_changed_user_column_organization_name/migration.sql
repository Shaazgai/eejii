/*
  Warnings:

  - You are about to drop the column `organization` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "organization",
ADD COLUMN     "organizationName" TEXT;
