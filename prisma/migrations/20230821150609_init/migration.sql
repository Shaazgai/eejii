-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ROLE_USER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "externalId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'ROLE_USER',
    "type" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "firstName" TEXT,
    "lastName" TEXT,
    "gender" TEXT,
    "bio" TEXT,
    "birthday" TIMESTAMP(3),
    "skills" TEXT,
    "organization" TEXT,
    "contact" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "roles" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "requiredTime" TEXT,
    "contact" JSONB,
    "ownerId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAssociation" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT,
    "eventId" TEXT,
    "status" TEXT,
    "type" TEXT,

    CONSTRAINT "EventAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fundraising" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goalAmount" INTEGER NOT NULL,
    "currentAmount" INTEGER NOT NULL,
    "contact" JSONB,
    "location" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "ownerId" TEXT,

    CONSTRAINT "Fundraising_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundAssociation" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT,
    "fundraisingId" TEXT,
    "status" TEXT,
    "type" TEXT,

    CONSTRAINT "FundAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrantFundraising" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "goalAmount" INTEGER NOT NULL,
    "currentAmount" INTEGER NOT NULL,
    "contact" JSONB,
    "location" TEXT,
    "startTime" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "ownerId" TEXT,

    CONSTRAINT "GrantFundraising_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrantAssociation" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT,
    "grantId" TEXT,
    "status" TEXT,
    "type" TEXT,

    CONSTRAINT "GrantAssociation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "volunteerId" TEXT,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "provinceName" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "amount" INTEGER NOT NULL,
    "userId" TEXT,
    "isPublicName" BOOLEAN NOT NULL DEFAULT false,
    "fundraisingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "amount" INTEGER NOT NULL,
    "invoiceId" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "donationId" TEXT NOT NULL,
    "details" JSONB,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryFundraising" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "fundraisingId" TEXT,
    "categoryId" TEXT,

    CONSTRAINT "CategoryFundraising_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryGrantFundraising" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "grantFundraisingId" TEXT,
    "categoryId" TEXT,

    CONSTRAINT "CategoryGrantFundraising_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryEvent" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "eventId" TEXT,
    "categoryId" TEXT,

    CONSTRAINT "CategoryEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_externalId_key" ON "User"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Event_ownerId_idx" ON "Event"("ownerId");

-- CreateIndex
CREATE INDEX "EventAssociation_userId_idx" ON "EventAssociation"("userId");

-- CreateIndex
CREATE INDEX "EventAssociation_eventId_idx" ON "EventAssociation"("eventId");

-- CreateIndex
CREATE INDEX "Fundraising_ownerId_idx" ON "Fundraising"("ownerId");

-- CreateIndex
CREATE INDEX "FundAssociation_userId_idx" ON "FundAssociation"("userId");

-- CreateIndex
CREATE INDEX "FundAssociation_fundraisingId_idx" ON "FundAssociation"("fundraisingId");

-- CreateIndex
CREATE UNIQUE INDEX "GrantFundraising_ownerId_key" ON "GrantFundraising"("ownerId");

-- CreateIndex
CREATE INDEX "GrantFundraising_ownerId_idx" ON "GrantFundraising"("ownerId");

-- CreateIndex
CREATE INDEX "GrantAssociation_userId_idx" ON "GrantAssociation"("userId");

-- CreateIndex
CREATE INDEX "GrantAssociation_grantId_idx" ON "GrantAssociation"("grantId");

-- CreateIndex
CREATE INDEX "Certificate_volunteerId_idx" ON "Certificate"("volunteerId");

-- CreateIndex
CREATE INDEX "Address_userId_idx" ON "Address"("userId");

-- CreateIndex
CREATE INDEX "Donation_userId_idx" ON "Donation"("userId");

-- CreateIndex
CREATE INDEX "Donation_fundraisingId_idx" ON "Donation"("fundraisingId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_donationId_key" ON "Payment"("donationId");

-- CreateIndex
CREATE INDEX "CategoryFundraising_fundraisingId_idx" ON "CategoryFundraising"("fundraisingId");

-- CreateIndex
CREATE INDEX "CategoryFundraising_categoryId_idx" ON "CategoryFundraising"("categoryId");

-- CreateIndex
CREATE INDEX "CategoryGrantFundraising_grantFundraisingId_idx" ON "CategoryGrantFundraising"("grantFundraisingId");

-- CreateIndex
CREATE INDEX "CategoryGrantFundraising_categoryId_idx" ON "CategoryGrantFundraising"("categoryId");

-- CreateIndex
CREATE INDEX "CategoryEvent_eventId_idx" ON "CategoryEvent"("eventId");

-- CreateIndex
CREATE INDEX "CategoryEvent_categoryId_idx" ON "CategoryEvent"("categoryId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAssociation" ADD CONSTRAINT "EventAssociation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAssociation" ADD CONSTRAINT "EventAssociation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fundraising" ADD CONSTRAINT "Fundraising_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundAssociation" ADD CONSTRAINT "FundAssociation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundAssociation" ADD CONSTRAINT "FundAssociation_fundraisingId_fkey" FOREIGN KEY ("fundraisingId") REFERENCES "Fundraising"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrantFundraising" ADD CONSTRAINT "GrantFundraising_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrantAssociation" ADD CONSTRAINT "GrantAssociation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrantAssociation" ADD CONSTRAINT "GrantAssociation_grantId_fkey" FOREIGN KEY ("grantId") REFERENCES "GrantFundraising"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_fundraisingId_fkey" FOREIGN KEY ("fundraisingId") REFERENCES "Fundraising"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_donationId_fkey" FOREIGN KEY ("donationId") REFERENCES "Donation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryFundraising" ADD CONSTRAINT "CategoryFundraising_fundraisingId_fkey" FOREIGN KEY ("fundraisingId") REFERENCES "Fundraising"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryFundraising" ADD CONSTRAINT "CategoryFundraising_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGrantFundraising" ADD CONSTRAINT "CategoryGrantFundraising_grantFundraisingId_fkey" FOREIGN KEY ("grantFundraisingId") REFERENCES "GrantFundraising"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryGrantFundraising" ADD CONSTRAINT "CategoryGrantFundraising_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryEvent" ADD CONSTRAINT "CategoryEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryEvent" ADD CONSTRAINT "CategoryEvent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
