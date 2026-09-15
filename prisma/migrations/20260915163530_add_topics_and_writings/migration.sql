/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WritingStatus" AS ENUM ('DRAFT', 'SUBMITTED');

-- CreateEnum
CREATE TYPE "TopicType" AS ENUM ('BAR_CHART', 'LINE_GRAPH', 'PIE_CHART', 'TABLE', 'MAP', 'PROCESS', 'MIXED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TopicType" NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Writing" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "WritingStatus" NOT NULL DEFAULT 'DRAFT',
    "wordCount" INTEGER NOT NULL DEFAULT 0,
    "score" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Writing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Writing_userId_idx" ON "Writing"("userId");

-- CreateIndex
CREATE INDEX "Writing_topicId_idx" ON "Writing"("topicId");

-- CreateIndex
CREATE INDEX "Writing_status_idx" ON "Writing"("status");

-- AddForeignKey
ALTER TABLE "Writing" ADD CONSTRAINT "Writing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Writing" ADD CONSTRAINT "Writing_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
