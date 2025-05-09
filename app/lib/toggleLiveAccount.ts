"use server";
import prisma from "./db";
import { getUserId } from "./getUserId";
import { TradeSimulation } from "./tradeSimulation";
import { getCryptoAccount } from "@/app/lib/getCryptoAccount";
import { CryptoAccount, cryptoAcc } from "@/app/dashboard/trades/TradeSim";

export async function toggleLiveAccount() {
  try {
    // ✅ Get authenticated user ID
    const userId = await getUserId();

    if (!userId) {
      console.error("User authentication failed");
      return { success: false, error: "User authentication failed" };
    }

    // ✅ Fetch the current account
    const account = await prisma.liveAccount.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

    if (!account) {
      console.error("Account not found");
      return { success: false, error: "Account not found" };
    }

    // ✅ Toggle `isActive`
    const updatedAccount = await prisma.liveAccount.update({
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
        const formattedAccounts = cryptoAcc
        .map((crypto): CryptoAccount | undefined => {
          const matchedAccount = userAccounts.find((account) => account.cryptoId?.trim() === crypto.cryptoId?.trim());
          console.log("Matched Account:", matchedAccount);
          if (matchedAccount) {
            return {
              id: matchedAccount.id,
              cryptoId: matchedAccount.cryptoId,
              type: matchedAccount.type,
              image: matchedAccount.image,
              amount: matchedAccount.amount,
              isActive: matchedAccount.isActive,
              name: matchedAccount.name || crypto.name,
              specialKey: matchedAccount?.specialKey || {min:6, max:100},
              waitTime: matchedAccount?.waitTime || {min:3600, max:7200},
            };
          }
          return undefined; // Use undefined instead of null to avoid type mismatch
        })
        .filter((acc): acc is CryptoAccount => !!acc); // ✅ Type assertion ensures only valid CryptoAccount objects remain
        TradeSimulation(formattedAccounts); // Pass formatted accounts
      }

      console.log("Trade Initiated");
    } else {
      console.warn("Account is now inactive");
    }

    return { success: true, updatedAccount };
  } catch (error) {
    console.error("Error toggling account status:", error);
    return { success: false, error: "Failed to update account status" };
  }
}