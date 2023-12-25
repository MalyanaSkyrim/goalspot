/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `PitchImage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PitchImage_url_key" ON "PitchImage"("url");
