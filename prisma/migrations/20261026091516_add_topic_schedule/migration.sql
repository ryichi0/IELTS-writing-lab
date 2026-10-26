/*
  Warnings:

  - A unique constraint covering the columns `[publishDate]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "chartData" JSONB,
ADD COLUMN     "publishDate" DATE,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "sourceUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Topic_publishDate_key" ON "Topic"("publishDate");
