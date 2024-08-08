-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'WAITLIST', 'CLOSED');

-- CreateTable
CREATE TABLE "ArtistGeneralCommission" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL,
    "artistId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "blurb" TEXT,
    "description" TEXT,

    CONSTRAINT "ArtistGeneralCommission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "MainTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtistImages" (
    "id" SERIAL NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "ArtistImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtistGeneralCommissionToArtistImages" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ArtistGeneralCommissionToMainTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistGeneralCommissionToArtistImages_AB_unique" ON "_ArtistGeneralCommissionToArtistImages"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistGeneralCommissionToArtistImages_B_index" ON "_ArtistGeneralCommissionToArtistImages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistGeneralCommissionToMainTag_AB_unique" ON "_ArtistGeneralCommissionToMainTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistGeneralCommissionToMainTag_B_index" ON "_ArtistGeneralCommissionToMainTag"("B");

-- AddForeignKey
ALTER TABLE "ArtistGeneralCommission" ADD CONSTRAINT "ArtistGeneralCommission_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MainTag" ADD CONSTRAINT "MainTag_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistImages" ADD CONSTRAINT "ArtistImages_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistGeneralCommissionToArtistImages" ADD CONSTRAINT "_ArtistGeneralCommissionToArtistImages_A_fkey" FOREIGN KEY ("A") REFERENCES "ArtistGeneralCommission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistGeneralCommissionToArtistImages" ADD CONSTRAINT "_ArtistGeneralCommissionToArtistImages_B_fkey" FOREIGN KEY ("B") REFERENCES "ArtistImages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistGeneralCommissionToMainTag" ADD CONSTRAINT "_ArtistGeneralCommissionToMainTag_A_fkey" FOREIGN KEY ("A") REFERENCES "ArtistGeneralCommission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistGeneralCommissionToMainTag" ADD CONSTRAINT "_ArtistGeneralCommissionToMainTag_B_fkey" FOREIGN KEY ("B") REFERENCES "MainTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
