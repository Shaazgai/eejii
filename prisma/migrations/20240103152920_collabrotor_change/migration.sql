/*
  Warnings:

  - You are about to drop the `EventCollaborator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectCollaborator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventCollaborator" DROP CONSTRAINT "EventCollaborator_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventCollaborator" DROP CONSTRAINT "EventCollaborator_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCollaborator" DROP CONSTRAINT "ProjectCollaborator_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectCollaborator" DROP CONSTRAINT "ProjectCollaborator_userId_fkey";

-- DropTable
DROP TABLE "EventCollaborator";

-- DropTable
DROP TABLE "ProjectCollaborator";

-- CreateTable
CREATE TABLE "EventCollabrator" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT,
    "eventId" TEXT,
    "status" TEXT,
    "type" TEXT,

    CONSTRAINT "EventCollabrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventParticipator" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT,
    "eventId" TEXT,
    "status" TEXT,
    "type" TEXT,

    CONSTRAINT "EventParticipator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectCollaborator" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT,
    "projectId" TEXT,
    "status" TEXT,
    "type" TEXT,

    CONSTRAINT "ProjectCollaborator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventCollabrator_userId_idx" ON "EventCollabrator"("userId");

-- CreateIndex
CREATE INDEX "EventCollabrator_eventId_idx" ON "EventCollabrator"("eventId");

-- CreateIndex
CREATE INDEX "EventParticipator_userId_idx" ON "EventParticipator"("userId");

-- CreateIndex
CREATE INDEX "EventParticipator_eventId_idx" ON "EventParticipator"("eventId");

-- CreateIndex
CREATE INDEX "ProjectCollaborator_userId_idx" ON "ProjectCollaborator"("userId");

-- CreateIndex
CREATE INDEX "ProjectCollaborator_projectId_idx" ON "ProjectCollaborator"("projectId");

-- AddForeignKey
ALTER TABLE "EventCollabrator" ADD CONSTRAINT "EventCollabrator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCollabrator" ADD CONSTRAINT "EventCollabrator_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipator" ADD CONSTRAINT "EventParticipator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventParticipator" ADD CONSTRAINT "EventParticipator_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaborator" ADD CONSTRAINT "ProjectCollaborator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectCollaborator" ADD CONSTRAINT "ProjectCollaborator_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
