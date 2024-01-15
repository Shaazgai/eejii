-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "projectId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "level" INTEGER,
ADD COLUMN     "xp" INTEGER;
