"use server";
import prisma from "@/app/lib/db";
import { getUserId } from "@/app/lib/getUserId"; // ✅ Ensure correct path

export async function getPnLStats() {
  try {
    const userId = await getUserId();

    if (!userId) {
      return { success: false, error: "Missing userId" };
    }

    const tradeLogs = await prisma.tradeLogs.findMany({
      where: { userId },
      select: { result: true },
    });

    const totalProfit = tradeLogs.reduce(
      (total, trade) => (trade.result > 0 ? total + trade.result : total),
      0
    );
    const totalLoss = tradeLogs.reduce(
      (total, trade) => (trade.result < 0 ? total + Math.abs(trade.result) : total),
      0
    );

    return { success: true, data: { profit: totalProfit, loss: totalLoss } };
  } catch (error) {
    console.error("Database fetch error:", error);
    return { success: false, error: error };
  }
}