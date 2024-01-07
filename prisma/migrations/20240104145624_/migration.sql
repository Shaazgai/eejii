/*
  Warnings:

  - You are about to drop the `EventCollabrator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventCollabrator" DROP CONSTRAINT "EventCollabrator_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventCollabrator" DROP CONSTRAINT "EventCollabrator_userId_fkey";

-- DropTable
DROP TABLE "EventCollabrator";

-- CreateTable
CREATE TABLE "EventCollaborator" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT,
    "eventId" TEXT,
    "status" TEXT,
    "type" TEXT,

    CONSTRAINT "EventCollaborator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventCollaborator_userId_idx" ON "EventCollaborator"("userId");

-- CreateIndex
CREATE INDEX "EventCollaborator_eventId_idx" ON "EventCollaborator"("eventId");

-- AddForeignKey
ALTER TABLE "EventCollaborator" ADD CONSTRAINT "EventCollaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCollaborator" ADD CONSTRAINT "EventCollaborator_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
