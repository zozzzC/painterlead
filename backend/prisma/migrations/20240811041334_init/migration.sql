-- AlterTable
ALTER TABLE "ArtistGeneralCommission" ADD COLUMN     "optionalTagId" INTEGER;

-- AddForeignKey
ALTER TABLE "ArtistGeneralCommission" ADD CONSTRAINT "ArtistGeneralCommission_optionalTagId_fkey" FOREIGN KEY ("optionalTagId") REFERENCES "OptionalTag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
