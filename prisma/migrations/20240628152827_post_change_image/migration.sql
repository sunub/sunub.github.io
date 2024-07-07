/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PostImages` table. All the data in the column will be lost.
  - You are about to drop the column `postSlug` on the `PostImages` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PostImages` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `PostImages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `PostImages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostImages" DROP CONSTRAINT "PostImages_postSlug_fkey";

-- AlterTable
ALTER TABLE "PostImages" DROP COLUMN "createdAt",
DROP COLUMN "postSlug",
DROP COLUMN "updatedAt",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Redirects" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Redirects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Redirects_source_destination_key" ON "Redirects"("source", "destination");

-- CreateIndex
CREATE UNIQUE INDEX "PostImages_imageId_key" ON "PostImages"("imageId");
