"use server";

import  prisma  from "@/app/lib/db";
import { getUserId } from "@/app/lib/getUserId";

export async function getInvestmentSummary() {
  const userId = await getUserId();
  if (!userId) return { success: false, error: "User ID is missing", data: [] };

  try {
    const investmentSummaries = await prisma.investmentSummary.findMany({
      where: { id: userId },
      select: {
        id: true,
        cryptoName: true,
        wins: true,
        loss: true,
      },
    });

    if (!investmentSummaries || investmentSummaries.length === 0) {
      console.log("Investment Summaries:", investmentSummaries);
      return { success: false, error: "No Investment data available", data: [] };
    }

    return {
      success: true,
      data: investmentSummaries.map((investment) => ({
        name: investment.cryptoName ?? "Unknown",
        wins: investment.wins ?? 0,
        loss: investment.loss ?? 0,
      })),
    };
  } catch (error) {
    console.error("Database fetch error:", error);
    return { success: false, error: "Failed to fetch investment summary", data: [] };
  }
}