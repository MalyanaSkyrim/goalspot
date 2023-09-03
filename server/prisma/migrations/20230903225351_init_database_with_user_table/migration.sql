-- CreateEnum
CREATE TYPE "UserTypeEnum" AS ENUM ('pitchOwner', 'player', 'admin');

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "password" STRING NOT NULL,
    "active" BOOL NOT NULL DEFAULT false,
    "type" "UserTypeEnum" NOT NULL DEFAULT 'player',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
