-- CreateTable
CREATE TABLE "fido_passwords" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fido_passwords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fido_session" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "signed_in" BOOLEAN DEFAULT false,
    "credential" JSONB DEFAULT '[]',
    "challenge" TEXT,

    CONSTRAINT "fido_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fido_users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "credentials" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fido_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pin_number" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "pin_number" TEXT[],
    "pin_num_keys" JSONB NOT NULL,

    CONSTRAINT "pin_number_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "push_subscriptions" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phone_num" TEXT NOT NULL,
    "subscription" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "redirects" (
    "id" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "permanent" BOOLEAN NOT NULL,

    CONSTRAINT "redirects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pin_number_username_key" ON "pin_number"("username");
