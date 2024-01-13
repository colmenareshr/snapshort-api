-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "longLink" TEXT NOT NULL,
    "shortCode" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkStats" (
    "id" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinksCustomization" (
    "id" SERIAL NOT NULL,
    "linkId" INTEGER NOT NULL,
    "customCode" TEXT NOT NULL,

    CONSTRAINT "LinksCustomization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_shortCode_key" ON "Link"("shortCode");

-- CreateIndex
CREATE UNIQUE INDEX "LinksCustomization_linkId_key" ON "LinksCustomization"("linkId");

-- CreateIndex
CREATE UNIQUE INDEX "LinksCustomization_customCode_key" ON "LinksCustomization"("customCode");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkStats" ADD CONSTRAINT "LinkStats_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinksCustomization" ADD CONSTRAINT "LinksCustomization_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
