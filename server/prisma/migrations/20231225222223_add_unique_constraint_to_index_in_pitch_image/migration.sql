/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `PitchImage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PitchImage_url_key";

-- CreateIndex
CREATE UNIQUE INDEX "PitchImage_index_key" ON "PitchImage"("index");
