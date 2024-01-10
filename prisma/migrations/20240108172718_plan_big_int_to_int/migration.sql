/*
  Warnings:

  - You are about to alter the column `price` on the `Permit` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `originalPrice` on the `Permit` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `price` on the `UserPlan` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `originalPrice` on the `UserPlan` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Permit" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "originalPrice" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "UserPlan" ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "originalPrice" SET DATA TYPE INTEGER;
