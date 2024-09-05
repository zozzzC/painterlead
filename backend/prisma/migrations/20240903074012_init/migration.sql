/*
  Warnings:

  - The primary key for the `ArtistGeneralCommission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ArtistImages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `artistGeneralCommissionsId` on the `ArtistImages` table. All the data in the column will be lost.
  - The primary key for the `MainTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OptionalTag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ArtistGeneralCommission" DROP CONSTRAINT "ArtistGeneralCommission_artistId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistGeneralCommission" DROP CONSTRAINT "ArtistGeneralCommission_mainTagId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistGeneralCommission" DROP CONSTRAINT "ArtistGeneralCommission_optionalTagId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistImages" DROP CONSTRAINT "ArtistImages_artistGeneralCommissionsId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistImages" DROP CONSTRAINT "ArtistImages_artistId_fkey";

-- DropForeignKey
ALTER TABLE "MainTag" DROP CONSTRAINT "MainTag_artistId_fkey";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "ArtistGeneralCommission" DROP CONSTRAINT "ArtistGeneralCommission_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "artistId" SET DATA TYPE TEXT,
ALTER COLUMN "mainTagId" SET DATA TYPE TEXT,
ALTER COLUMN "optionalTagId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ArtistGeneralCommission_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ArtistGeneralCommission_id_seq";

-- AlterTable
ALTER TABLE "ArtistImages" DROP CONSTRAINT "ArtistImages_pkey",
DROP COLUMN "artistGeneralCommissionsId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "artistId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ArtistImages_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ArtistImages_id_seq";

-- AlterTable
ALTER TABLE "MainTag" DROP CONSTRAINT "MainTag_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "artistId" SET DATA TYPE TEXT,
ADD CONSTRAINT "MainTag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MainTag_id_seq";

-- AlterTable
ALTER TABLE "OptionalTag" DROP CONSTRAINT "OptionalTag_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "OptionalTag_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OptionalTag_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "password",
DROP COLUMN "username",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "CommissionToArtistImages" (
    "id" TEXT NOT NULL,
    "artistImagesId" TEXT NOT NULL,
    "artistGeneralCommissionId" TEXT NOT NULL,
    "sort" INTEGER NOT NULL,

    CONSTRAINT "CommissionToArtistImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArtistGeneralCommission" ADD CONSTRAINT "ArtistGeneralCommission_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistGeneralCommission" ADD CONSTRAINT "ArtistGeneralCommission_mainTagId_fkey" FOREIGN KEY ("mainTagId") REFERENCES "MainTag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistGeneralCommission" ADD CONSTRAINT "ArtistGeneralCommission_optionalTagId_fkey" FOREIGN KEY ("optionalTagId") REFERENCES "OptionalTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MainTag" ADD CONSTRAINT "MainTag_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionToArtistImages" ADD CONSTRAINT "CommissionToArtistImages_artistImagesId_fkey" FOREIGN KEY ("artistImagesId") REFERENCES "ArtistImages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionToArtistImages" ADD CONSTRAINT "CommissionToArtistImages_artistGeneralCommissionId_fkey" FOREIGN KEY ("artistGeneralCommissionId") REFERENCES "ArtistGeneralCommission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistImages" ADD CONSTRAINT "ArtistImages_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
