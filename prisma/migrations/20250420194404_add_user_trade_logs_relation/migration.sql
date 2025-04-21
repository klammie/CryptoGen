/*
  Warnings:

  - Added the required column `userId` to the `TradeLogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TradeLogs_id_key";

-- AlterTable
ALTER TABLE "TradeLogs" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "TradeLogs" ADD CONSTRAINT "TradeLogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
