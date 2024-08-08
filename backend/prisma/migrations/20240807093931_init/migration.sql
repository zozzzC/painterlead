/*
  Warnings:

  - You are about to drop the `_ArtistGeneralCommissionToArtistImages` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `artistGeneralCommissionsId` to the `ArtistImages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ArtistGeneralCommissionToArtistImages" DROP CONSTRAINT "_ArtistGeneralCommissionToArtistImages_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistGeneralCommissionToArtistImages" DROP CONSTRAINT "_ArtistGeneralCommissionToArtistImages_B_fkey";

-- AlterTable
ALTER TABLE "ArtistImages" ADD COLUMN     "artistGeneralCommissionsId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ArtistGeneralCommissionToArtistImages";

-- AddForeignKey
ALTER TABLE "ArtistImages" ADD CONSTRAINT "ArtistImages_artistGeneralCommissionsId_fkey" FOREIGN KEY ("artistGeneralCommissionsId") REFERENCES "ArtistGeneralCommission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
