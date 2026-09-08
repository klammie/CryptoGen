"use server";
import prisma from "@/app/lib/db";
import { getUserId } from "@/app/lib/getUserId";

export async function updateTradeAccounts(_accountId: string, tradeResult: number) {
  try {
    const userId = await getUserId();
    if (!userId) return { success: false, error: "Missing userId" };

    // ✅ Find both Live & Demo accounts
    const liveAccount = await prisma.liveAccount.findUnique({ where: { id: userId } });
    const demoAccount = await prisma.demoAccount.findUnique({ where: { id: userId } });

    if (!liveAccount && !demoAccount) {
      return { success: false, error: "No accounts found for user" };
    }

    await prisma.$transaction(async (transaction) => {
      if (liveAccount) {
        await transaction.liveAccount.update({
          where: { id: userId },
          data: { amount: { increment: tradeResult } },
        });
      }

      if (demoAccount) {
        await transaction.demoAccount.update({
          where: { id: userId },
          data: { amount: { increment: tradeResult } },
        });
      }
    });

    return { success: true, message: "Account balance updated successfully" };
  } catch (error) {
    console.error("Database update error:", error);
    return { success: false, error: error };
  }
}