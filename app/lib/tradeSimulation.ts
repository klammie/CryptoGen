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

    // ✅ Debugging logs
    console.log("Available cryptoAcc IDs:", cryptoAcc.map(acc => acc.cryptoId));
    console.log("Fetched user accounts:", userAccounts);
    console.log("Full cryptoAcc object:", cryptoAcc);

    userAccounts.forEach((account) => {
      console.log(`Checking for match with cryptoId: '${account.cryptoId}'`);
      const matchedCryptoAcc = cryptoAcc.find((acc) => acc.cryptoId?.trim() === account.cryptoId?.trim());
      if (matchedCryptoAcc) {
        const interval = generateRandomInterval(matchedCryptoAcc);
        console.log(`Trade for ${matchedCryptoAcc.name} ${interval / 1000} seconds`);
    
        setInterval(() => {
          coreFunc(matchedCryptoAcc);
        }, interval);
      } else {
        console.warn(`No matched account for cryptoId: ${account.cryptoId}`);
      }
    });

  } catch (error) {
    console.error("Error fetching trade accounts from database:", error);
  }
};