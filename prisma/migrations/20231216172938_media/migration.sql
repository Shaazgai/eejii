-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryMedia" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "mediaId" TEXT,
    "categoryId" TEXT,

    CONSTRAINT "CategoryMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaImage" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "ownerId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "MediaImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CategoryMedia_mediaId_idx" ON "CategoryMedia"("mediaId");

-- CreateIndex
CREATE INDEX "CategoryMedia_categoryId_idx" ON "CategoryMedia"("categoryId");

-- AddForeignKey
ALTER TABLE "CategoryMedia" ADD CONSTRAINT "CategoryMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryMedia" ADD CONSTRAINT "CategoryMedia_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaImage" ADD CONSTRAINT "MediaImage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
