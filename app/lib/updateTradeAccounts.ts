"use server";
import prisma from "@/app/lib/db";

export async function updateTradeAccounts(userId: string, tradeResult: number) {
  try {
    if (!userId) return { success: false, error: "Missing userId" };

    // ✅ Find both Live & Demo accounts
    const liveAccount = await prisma.liveAccount.findUnique({ where: { id: userId } });
    const demoAccount = await prisma.demoAccount.findUnique({ where: { id: userId } });

    if (!liveAccount && !demoAccount) {
      return { success: false, error: "No accounts found for user" };
    }

    // ✅ Update LiveAccount if it exists
    if (liveAccount) {
      await prisma.liveAccount.update({
        where: { id: userId },
        data: { amount: { increment: tradeResult } },
      });
      console.log(`Updated LiveAccount balance for user ${userId}`);
    }

    // ✅ Update DemoAccount if it exists
    if (demoAccount) {
      await prisma.demoAccount.update({
        where: { id: userId },
        data: { amount: { increment: tradeResult } },
      });
      console.log(`Updated DemoAccount balance for user ${userId}`);
    }

    return { success: true, message: "Account balance updated successfully" };
  } catch (error) {
    console.error("Database update error:", error);
    return { success: false, error: error };
  }
}