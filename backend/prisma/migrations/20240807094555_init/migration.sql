/*
  Warnings:

  - You are about to drop the `_ArtistGeneralCommissionToMainTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mainTagId` to the `ArtistGeneralCommission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ArtistGeneralCommissionToMainTag" DROP CONSTRAINT "_ArtistGeneralCommissionToMainTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistGeneralCommissionToMainTag" DROP CONSTRAINT "_ArtistGeneralCommissionToMainTag_B_fkey";

-- AlterTable
ALTER TABLE "ArtistGeneralCommission" ADD COLUMN     "mainTagId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_ArtistGeneralCommissionToMainTag";

-- CreateTable
CREATE TABLE "OptionalTag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "OptionalTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArtistGeneralCommission" ADD CONSTRAINT "ArtistGeneralCommission_mainTagId_fkey" FOREIGN KEY ("mainTagId") REFERENCES "MainTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
