-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('WORDS10', 'WORDS15', 'WORDS20', 'TIME15', 'TIME30', 'TIME60');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "wpm" DOUBLE PRECISION NOT NULL,
    "acc" DOUBLE PRECISION NOT NULL,
    "entries" INTEGER NOT NULL,
    "time" DOUBLE PRECISION NOT NULL,
    "errors" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "mode" "Mode" NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
