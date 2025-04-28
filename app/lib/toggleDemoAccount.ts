"use server";
import prisma from "./db";
import { getUserId } from "./getUserId";
import { TradeSimulation } from "./tradeSimulation";
import { getCryptoAccount } from "@/app/lib/getCryptoAccount";
import { CryptoAccount } from "@/app/dashboard/trades/TradeSim";

export async function toggleDemoAccount() {
  try {
    // ✅ Get authenticated user ID
    const userId = await getUserId();

    if (!userId) {
      return { success: false, error: "User authentication failed" };
    }

    // ✅ Fetch the current account
    const account = await prisma.demoAccount.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

    if (!account) {
      return { success: false, error: "Account not found" };
    }

    // ✅ Toggle `isActive`
    const updatedAccount = await prisma.demoAccount.update({
      where: { id: userId },
      data: { isActive: !account.isActive },
    });

    console.log(
      `Updated account status: ${updatedAccount.isActive ? "Active" : "Inactive"}`
    );

    if (updatedAccount.isActive) {
      // ✅ Fetch crypto accounts
      const response = await getCryptoAccount();

      if (response.success && response.account) {
        const userAccounts = Array.isArray(response.account)
          ? response.account
          : [response.account];

        // ✅ Map fetched accounts to `CryptoAccount` type
        const formattedAccounts: CryptoAccount[] = userAccounts.map((acc) => ({
          id: acc.id,
          type: acc.type,
          image: acc.image,
          amount: acc.amount,
          isActive: acc.isActive,
          name: acc.name || "Unknown", // Provide default values if missing
          specialKey:
            typeof acc.specialKey === "object"
              ? acc.specialKey
              : { min: 0, max: 100 }, // ✅ Ensures valid specialKey format
          waitTime:
            typeof acc.waitTime === "object"
              ? acc.waitTime
              : { min: 5000, max: 10000 }, // ✅ Ensures valid waitTime format
              cryptoId: acc.cryptoId,
        }));

        TradeSimulation(formattedAccounts); // Pass formatted accounts
      }
    }

    return { success: true, updatedAccount };
  } catch (error) {
    console.error("Error toggling account status:", error);
    return { success: false, error: "Failed to update account status" };
  }
}