/*
  Warnings:

  - You are about to alter the column `name` on the `Tags` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - Added the required column `category` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summary` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "summary" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tags" ALTER COLUMN "name" SET DATA TYPE VARCHAR(30);

-- CreateTable
CREATE TABLE "Pattern" (
    "id" TEXT NOT NULL,
    "pattern" TEXT[],
    "length" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Pattern_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PinHash" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "hash" JSONB NOT NULL,

    CONSTRAINT "PinHash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PinNumbers" (
    "id" TEXT NOT NULL,
    "numbers" TEXT[],
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "UserInfo" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Pattern_username_key" ON "Pattern"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PinHash_username_key" ON "PinHash"("username");

-- CreateIndex
CREATE UNIQUE INDEX "PinNumbers_username_key" ON "PinNumbers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserInfo_username_key" ON "UserInfo"("username");

-- CreateIndex
CREATE INDEX "Post_category_date_idx" ON "Post"("category", "date");

-- CreateIndex
CREATE INDEX "Post_slug_idx" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Redirects_source_idx" ON "Redirects"("source");

-- AddForeignKey
ALTER TABLE "Pattern" ADD CONSTRAINT "Pattern_username_fkey" FOREIGN KEY ("username") REFERENCES "UserInfo"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PinHash" ADD CONSTRAINT "PinHash_username_fkey" FOREIGN KEY ("username") REFERENCES "UserInfo"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PinNumbers" ADD CONSTRAINT "PinNumbers_username_fkey" FOREIGN KEY ("username") REFERENCES "UserInfo"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
