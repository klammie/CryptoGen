// utils/TradeSim.ts
const updateAccountBalance = (accountId: string, tradeResult: number) => {
  const updateBalance = (key: string) => {
    const storedAccounts = localStorage.getItem(key);
    if (storedAccounts) {
      const parsedAccounts: Account[] = JSON.parse(storedAccounts);
      const updatedAccounts = parsedAccounts.map((account) => {
        if (account.id === accountId) {
          return { ...account, amount: account.amount + tradeResult };
        }
        return account;
      });
      localStorage.setItem(key, JSON.stringify(updatedAccounts));
    }
  };

  updateBalance("DemoAccount");
  updateBalance("LiveAccount");
};

export interface Account {
  id: string;
  image: string;
  type: string;
  amount: number;
  features?: string[]; // ✅ Now optional
  demo?: Array<{ id: string }>;
  live?: Array<{ id: string }>;
}

export interface Crypto {
  name: string;
  image: string;
  id: number;
}

export interface CryptoAccount {
  name: string;
  id: string;
  image: string;
  amount: number;
  specialKey: {
    min: number;
    max: number;
  };
  waitTime: {
    min: number;
    max: number;
  };
}

export interface Trade {
  matchedCrypto: Crypto | undefined;
  result: number;
  interval: number;
}

export const cryptoData: Crypto[] = [
  { name: "Bitcoin", image: "../crypto-images/bitcoin1.png", id: 1 },
  { name: "Litecoin", image: "../crypto-images/coin.png", id: 2 },
  { name: "Dogecoin", image: "../crypto-images/dogecoin.png", id: 3 },
  { name: "Etherum", image: "../crypto-images/etherum.png", id: 4 },
  { name: "Gold", image: "../crypto-images/gold-bars.png", id: 5 },
  { name: "Pepecoin", image: "../crypto-images/pepelogo.png", id: 6 },
  { name: "Solana", image: "../crypto-images/solanac.png", id: 7 },
  { name: "Xrp", image: "../crypto-images/xrp.png", id: 8 },
  { name: "Tether", image: "../crypto-images/tether.png", id: 9 },
];

export const cryptoAcc: CryptoAccount[] = [
  {
    name: "Passive",
    id: "1000L",
    image: "",
    amount: 1000,
    specialKey: { min: 4, max: 2 },
    waitTime: { min: 7000, max: 9800 },
  },
  {
    name: "Passive",
    id: "3000L",
    image: "",
    amount: 3000,
    specialKey: { min: 8, max: 5 },
    waitTime: { min: 5000, max: 8000 },
  },
  {
    name: "Passive",
    id: "5000L",
    image: "",
    amount: 5000,
    specialKey: { min: 9, max: 12 },
    waitTime: { min: 4700, max: 7000 },
  },
  {
    name: "Semi-Aggressive",
    id: "10000L",
    image: "",
    amount: 10000,
    specialKey: { min: 21, max: 20 },
    waitTime: { min: 2500, max: 5100 },
  },
  {
    name: "Semi-Aggressive",
    id: "15000L",
    image: "",
    amount: 15000,
    specialKey: { min: 36, max: 40 },
    waitTime: { min: 2200, max: 4700 },
  },
  {
    name: "Semi-Aggressive",
    id: "20000L",
    image: "",
    amount: 20000,
    specialKey: { min: 41, max: 60 },
    waitTime: { min: 2100, max: 4500 },
  },
  {
    name: "Aggressive",
    id: "50000L",
    image: "",
    amount: 50000,
    specialKey: { min: 201, max: 300 },
    waitTime: { min: 1500, max: 3400 },
  },
  {
    name: "Aggressive",
    id: "100000L",
    image: "",
    amount: 100000,
    specialKey: { min: 501, max: 500 },
    waitTime: { min: 1300, max: 3200 },
  },
  {
    name: "Aggressive",
    id: "200000L",
    image: "",
    amount: 200000,
    specialKey: { min: 4001, max: 1000 },
    waitTime: { min: 1100, max: 2800 },
  },
];

export const cryptoRandomizer = (): Crypto | undefined => {
  let matchedCrypto: Crypto | undefined;
  const randomNumber = Math.floor(Math.random() * cryptoData.length) + 1;
  cryptoData.forEach((crypto) => {
    if (crypto.id === randomNumber) {
      matchedCrypto = crypto;
    }
  });
  return matchedCrypto;
};

export function generateCustomRandomNumber(crypto: CryptoAccount): number {
  const randomNumber1 = Math.random() * 15 + 1; // Generates a random decimal number between 1 and 16
  let result: number;
  if (randomNumber1 < 10) {
    result = Math.random() * crypto.specialKey.min + crypto.specialKey.max; // Generates a positive decimal
  } else {
    result = -(Math.random() * crypto.specialKey.min + crypto.specialKey.max); // Generates a negative decimal
  }

  // Round to two decimal places
  return parseFloat(result.toFixed(2));
}

export function generateRandomInterval(crypto: CryptoAccount): number {
  const minInterval = crypto.waitTime.min * 1000;
  const maxInterval = crypto.waitTime.max * 1000;
  const randomInterval =
    Math.random() * (maxInterval - minInterval) + minInterval;
  return randomInterval;
}

export const updateTradeStats = (result: number): void => {
  // Retrieve current counts from localStorage or initialize them
  const storedLosses = localStorage.getItem("losses");
  const storedProfits = localStorage.getItem("profits");

  const losses = storedLosses ? parseInt(storedLosses, 10) : 0; // Default to 0 if no value is found
  const profits = storedProfits ? parseInt(storedProfits, 10) : 0; // Default to 0 if no value is found

  // Check the result and update the respective counter
  if (result < 1) {
    localStorage.setItem("losses", (losses + 1).toString());
    console.log(`Updated losses count: ${losses + 1}`);
  } else {
    localStorage.setItem("profits", (profits + 1).toString());
    console.log(`Updated profits count: ${profits + 1}`);
  }
};

export const coreFunc = (account: CryptoAccount): void => {
  console.log("Account passed to coreFunc:", account);

  // Ensure account has required properties
  if (
    !account.specialKey ||
    typeof account.specialKey.min !== "number" ||
    typeof account.specialKey.max !== "number"
  ) {
    console.error("Invalid account data:", account);
    return;
  }

  const matchedCrypto = cryptoRandomizer();
  const result = generateCustomRandomNumber(account);
  const interval = generateRandomInterval(account);

  // Update losses or profits based on the trade result
  updateTradeStats(result);

  // Retrieve existing trades from localStorage
  const storedTrades = localStorage.getItem("TradeLogs");
  const tradeLogs: Trade[] = storedTrades ? JSON.parse(storedTrades) : [];

  // Write data to the trade logs
  tradeLogs.push({ matchedCrypto, result, interval });
  localStorage.setItem("TradeLogs", JSON.stringify(tradeLogs));

  // **Update the account balance based on trade result**
  updateAccountBalance(account.id, result);
};

export const TradeSimulation = (cryptoAcc: CryptoAccount[]): void => {
  // Retrieve DemoAccount data from localStorage
  const storedDemoAccounts = localStorage.getItem("DemoAccount");
  const demoAccounts: Array<{ id: { demo: string } }> = storedDemoAccounts
    ? JSON.parse(storedDemoAccounts)
    : [];

  demoAccounts.forEach((demoAccount) => {
    const matchedCryptoAcc = cryptoAcc.find(
      (acc) => acc.id === demoAccount.id.demo
    );

    if (matchedCryptoAcc) {
      // Generate the wait time dynamically
      const interval = generateRandomInterval(matchedCryptoAcc);

      console.log(
        `Trade for ${matchedCryptoAcc.name} will run after ${
          interval / 1000
        } seconds`
      );

      // Use setTimeout to delay execution of coreFunc
      setInterval(() => {
        coreFunc(matchedCryptoAcc);
      }, interval);
    }
  });
};
