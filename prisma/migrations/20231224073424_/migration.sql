/*
  Warnings:

  - You are about to drop the column `requiredTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "requiredTime";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "location",
ADD COLUMN     "link" TEXT,
ALTER COLUMN "goalAmount" DROP NOT NULL,
ALTER COLUMN "currentAmount" DROP NOT NULL;
