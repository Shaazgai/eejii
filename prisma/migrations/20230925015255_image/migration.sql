-- CreateTable
CREATE TABLE "EventImage" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "ownerId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "EventImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundImage" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "ownerId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "FundImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrantImage" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "ownerId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "GrantImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserImage" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "ownerId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventImage" ADD CONSTRAINT "EventImage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundImage" ADD CONSTRAINT "FundImage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Fundraising"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrantImage" ADD CONSTRAINT "GrantImage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "GrantFundraising"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
