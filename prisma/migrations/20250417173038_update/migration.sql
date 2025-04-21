-- AlterTable
ALTER TABLE "DemoAccount" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "LiveAccount" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "TradeLogs" (
    "id" TEXT NOT NULL,
    "crypto" TEXT NOT NULL,
    "result" INTEGER NOT NULL,

    CONSTRAINT "TradeLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TradeLogs_id_key" ON "TradeLogs"("id");
