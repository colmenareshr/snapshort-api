/*
  Warnings:

  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinkStats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LinksCustomization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- DropForeignKey
ALTER TABLE "LinkStats" DROP CONSTRAINT "LinkStats_linkId_fkey";

-- DropForeignKey
ALTER TABLE "LinksCustomization" DROP CONSTRAINT "LinksCustomization_linkId_fkey";

-- DropTable
DROP TABLE "Link";

-- DropTable
DROP TABLE "LinkStats";

-- DropTable
DROP TABLE "LinksCustomization";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "links" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "longLink" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "linkStats" (
    "id" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "linkStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "linksCustomizations" (
    "id" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "customCode" TEXT NOT NULL,

    CONSTRAINT "linksCustomizations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "links_shortCode_key" ON "links"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "linksCustomizations_linkId_key" ON "linksCustomizations"("linkId");

-- CreateIndex
CREATE UNIQUE INDEX "linksCustomizations_customCode_key" ON "linksCustomizations"("customCode");

-- AddForeignKey
ALTER TABLE "links" ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "linkStats" ADD CONSTRAINT "linkStats_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "linksCustomizations" ADD CONSTRAINT "linksCustomizations_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "links"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
