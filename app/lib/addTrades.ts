"use server";
import { Trade } from "../dashboard/trades/TradeSim";
import prisma from "./db";
import { getUserId } from "./getUserId";

export async function addTradeLog(tradeData: { 
  matchedCrypto: Trade; 
  result: number; 
  interval: number; 
}) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, error: "User authentication failed" };
    }

    const newTradeLog = await prisma.tradeLogs.create({
      data: {
        userId,
        crypto: tradeData.matchedCrypto.name, // ✅ Ensure this aligns with `crypto`
        result: tradeData.result,
      },
    });

    return { success: true, newTradeLog };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: error };
  }
}