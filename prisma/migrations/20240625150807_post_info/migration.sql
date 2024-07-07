/*
  Warnings:

  - You are about to drop the `fido_passwords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fido_session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fido_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pin_number` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `push_subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `redirects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "fido_passwords";

-- DropTable
DROP TABLE "fido_session";

-- DropTable
DROP TABLE "fido_users";

-- DropTable
DROP TABLE "pin_number";

-- DropTable
DROP TABLE "push_subscriptions";

-- DropTable
DROP TABLE "redirects";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postSlug" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostImages" (
    "id" TEXT NOT NULL,
    "altText" TEXT,
    "contentType" TEXT NOT NULL,
    "blob" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postSlug" TEXT NOT NULL,

    CONSTRAINT "PostImages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- AddForeignKey
ALTER TABLE "Tags" ADD CONSTRAINT "Tags_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "Post"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostImages" ADD CONSTRAINT "PostImages_postSlug_fkey" FOREIGN KEY ("postSlug") REFERENCES "Post"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
