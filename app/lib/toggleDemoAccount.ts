"use server";
import prisma from "./db";
import { getUserId } from "./getUserId";
import { TradeSimulation } from "./tradeSimulation";
import { getCryptoAccount } from "@/app/lib/getCryptoAccount";
import { cryptoAcc, CryptoAccount } from "@/app/dashboard/trades/TradeSim";

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
        const formattedAccounts: CryptoAccount[] = userAccounts.map((acc) => {
          const matchedCryptoAcc = cryptoAcc.find((crypto) => crypto.cryptoId === acc.cryptoId);
        
          return {
            id: acc.id,
            type: acc.type,
            image: acc.image,
            amount: acc.amount,
            isActive: acc.isActive,
            name: acc.name || "Unknown",
            specialKey: matchedCryptoAcc?.specialKey || { min: 6, max: 100 }, // ✅ Use matched data
            waitTime: { min: 3600, max: 7200 },
            cryptoId: acc.cryptoId,
          };
        });

        TradeSimulation(formattedAccounts); // Pass formatted accounts
      }
    }

    return { success: true, updatedAccount };
  } catch (error) {
    console.error("Error toggling account status:", error);
    return { success: false, error: "Failed to update account status" };
  }
}