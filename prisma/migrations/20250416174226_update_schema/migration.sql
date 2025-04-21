/*
  Warnings:

  - You are about to drop the `TradeAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `investmentSummary` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `ProfitsLoss` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `RecentActivities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `RecentActivities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecentActivities" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "TradeAccount";

-- DropTable
DROP TABLE "cart";

-- DropTable
DROP TABLE "investmentSummary";

-- CreateTable
CREATE TABLE "DemoAccount" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "DemoAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveAccount" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "LiveAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestmentSummary" (
    "id" TEXT NOT NULL,

    CONSTRAINT "InvestmentSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DemoAccount_id_key" ON "DemoAccount"("id");

-- CreateIndex
CREATE UNIQUE INDEX "LiveAccount_id_key" ON "LiveAccount"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InvestmentSummary_id_key" ON "InvestmentSummary"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProfitsLoss_id_key" ON "ProfitsLoss"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RecentActivities_userId_key" ON "RecentActivities"("userId");
