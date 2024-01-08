/*
  Warnings:

  - Added the required column `featured` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `featured` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "featured" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "featured" BOOLEAN NOT NULL;
