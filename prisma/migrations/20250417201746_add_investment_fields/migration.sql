/*
  Warnings:

  - Added the required column `cryptoName` to the `InvestmentSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loss` to the `InvestmentSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wins` to the `InvestmentSummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvestmentSummary" ADD COLUMN     "cryptoName" TEXT NOT NULL,
ADD COLUMN     "loss" INTEGER NOT NULL,
ADD COLUMN     "wins" INTEGER NOT NULL;
