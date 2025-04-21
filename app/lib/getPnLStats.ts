"use server";
import prisma from "@/app/lib/db";
import { getUserId } from "@/app/lib/getUserId"; // ✅ Ensure correct path

export async function getPnLStats() {
  try {
    const userId = await getUserId(); // ✅ Fetch authenticated user ID

    if (!userId) {
      return { success: false, error: "Missing userId" };
    }

    // ✅ Query database for profits and losses based on `userId`
    const pnlData = await prisma.profitsLoss.findMany({
      where: { id: userId }, // ✅ Use 'id' instead of 'userId'
    });
    if (!pnlData || pnlData.length === 0) {
      return { success: false, error: "No profit/loss data found" };
    }

    // ✅ Calculate total profit/loss values
    const totalProfit = pnlData.reduce((acc, item) => acc + item.profits, 0);
    const totalLoss = pnlData.reduce((acc, item) => acc + item.loss, 0);

    return { success: true, data: { profit: totalProfit, loss: totalLoss } };
  } catch (error) {
    console.error("Database fetch error:", error);
    return { success: false, error: error };
  }
}