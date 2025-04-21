"use server";
import { getCryptoAccount } from "@/app/lib/getCryptoAccount";
import { coreFunc, CryptoAccount } from "@/app/dashboard/trades/TradeSim";
import { generateRandomInterval } from "@/app/dashboard/trades/TradeSim";

export const TradeSimulation = async (cryptoAcc: CryptoAccount[]): Promise<void> => {
  try {
    // ✅ Fetch accounts from database instead of localStorage
    const response = await getCryptoAccount();

    if (!response.success || !response.account) {
      console.warn("No accounts found for the user.");
      return;
    }

    const userAccounts = Array.isArray(response.account) ? response.account : [response.account];

    // ✅ Iterate through user accounts and match them with `cryptoAcc`
    userAccounts.forEach((account) => {
      const matchedCryptoAcc = cryptoAcc.find((acc) => acc.id === account.id);

      if (matchedCryptoAcc) {
        // ✅ First, calculate the interval outside `setInterval`
        const interval = generateRandomInterval(matchedCryptoAcc);
        
        console.log(`Trade for ${matchedCryptoAcc.name} will run every ${interval / 1000} seconds`);

        // ✅ Then, use the calculated interval inside `setInterval`
        setInterval(() => {
          coreFunc(matchedCryptoAcc);
        }, interval);
      }
    });

  } catch (error) {
    console.error("Error fetching trade accounts from database:", error);
  }
};