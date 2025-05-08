import { updateTradeStats } from "@/app/lib/updateTradeStats";
import { getUserId } from "@/app/lib/getUserId";
import { updateTradeAccounts } from "@/app/lib/updateTradeAccounts";
import { addTradeLog } from "@/app/lib/addTrades";

export interface Account {
  id: string;
  image: string;
  type: string;
  amount: number;
  features?: string[]; // ✅ Now optional
  demo?: Array<{ id: string }>;
  live?: Array<{ id: string }>;
  isActive: boolean;
  cryptoId?: string;
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
  type?: string;
  amount: number;
  specialKey: {
    min: number;
    max: number;
  };
  waitTime: {
    min: number;
    max: number;
  };
  isActive: boolean;
  cryptoId?: string;
}

export interface Trade {
  name: string;
  matchedCrypto: Crypto | undefined;
  result: number;
  interval: number;
}

export const cryptoData: Crypto[] = [
  { name: "Bitcoin", image: "/crypto-images/bitcoin1.png", id: 1 }, // ✅ Ensure leading slash
  { name: "Litecoin", image: "/crypto-images/coin.png", id: 2 },
  { name: "Dogecoin", image: "/crypto-images/dogecoin.png", id: 3 },
  { name: "Ethereum", image: "/crypto-images/ethereum.png", id: 4 }, // 🔍 Correct spelling
  { name: "Gold", image: "/crypto-images/gold-bars.png", id: 5 }, // ✅ Fix path here
  { name: "Pepecoin", image: "/crypto-images/pepelogo.png", id: 6 },
  { name: "Solana", image: "/crypto-images/solanac.png", id: 7 }, // ✅ Remove `/public/assets/`
  { name: "Xrp", image: "/crypto-images/xrp.png", id: 8 },
  { name: "Tether", image: "/crypto-images/tether.png", id: 9 },
];

export const cryptoAcc: CryptoAccount[] = [
  {
    name: "Passive",
    id: "1000L",
    image: "",
    amount: 1000,
    specialKey: { min: 4, max: 2 },
    waitTime: { min: 7000, max: 9800 },
    cryptoId: "1000L",
    isActive: false,
  },
  {
    name: "Passive",
    id: "3000L",
    image: "",
    amount: 3000,
    specialKey: { min: 8, max: 5 },
    waitTime: { min: 5000, max: 8000 },
    cryptoId: "3000L",
    isActive: false,
  },
  {
    name: "Passive",
    id: "5000L",
    image: "",
    amount: 5000,
    specialKey: { min: 9, max: 12 },
    waitTime: { min: 4700, max: 7000 },
    cryptoId: "5000L",
    isActive: false,
  },
  {
    name: "Semi-Aggressive",
    id: "10000L",
    image: "",
    amount: 10000,
    specialKey: { min: 21, max: 20 },
    waitTime: { min: 2500, max: 5100 },
    cryptoId: "10000L",
    isActive: false,
  },
  {
    name: "Semi-Aggressive",
    id: "20000L",
    image: "",
    amount: 20000,
    specialKey: { min: 36, max: 40 },
    waitTime: { min: 2200, max: 4700 },
    cryptoId: "20000L",
    isActive: false,
  },
  {
    name: "Semi-Aggressive",
    id: "30000L",
    image: "",
    amount: 30000,
    specialKey: { min: 41, max: 60 },
    waitTime: { min: 2100, max: 4500 },
    cryptoId: "30000L",
    isActive: false,
  },
  {
    name: "Aggressive",
    id: "50000L",
    image: "",
    amount: 50000,
    specialKey: { min: 201, max: 300 },
    waitTime: { min: 1500, max: 3400 },
    cryptoId: "50000L",
    isActive: false,
  },
  {
    name: "Aggressive",
    id: "100000L",
    image: "",
    amount: 100000,
    specialKey: { min: 501, max: 500 },
    waitTime: { min: 1300, max: 3200 },
    cryptoId: "100000L",
    isActive: false,
  },
  {
    name: "Aggressive",
    id: "200000L",
    image: "",
    amount: 200000,
    specialKey: { min: 4001, max: 1000 },
    waitTime: { min: 1100, max: 2800 },
    cryptoId: "200000L",
    isActive: false,
  },
];

export const cryptoRandomizer = (): Trade => {
  const randomIndex = Math.floor(Math.random() * cryptoData.length);
  const matchedCrypto = cryptoData[randomIndex];

  return {
    matchedCrypto, // ✅ Use the randomized value, do NOT overwrite
    result: 0,
    interval: 0,
    name: matchedCrypto?.name || "", // ✅ Ensure `name` is extracted properly
  };
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

// Ensure user identification

export const updateTradeStatsLc = async (result: number): Promise<void> => {
  const userId = await getUserId();
  if (!userId) {
    console.error("User ID is missing");
    return;
  }

  await updateTradeStats(userId, result);
};

export const coreFunc = async (account: CryptoAccount): Promise<void> => {
  console.log("Trade Initiated:", account);

  // Ensure account has required properties

  if (typeof account.specialKey === "string") {
    console.warn(
      `specialKey is a string: ${account.specialKey}, checking validity...`
    );

    const numericValue = Number(account.specialKey);

    if (!isNaN(numericValue)) {
      account.specialKey = { min: numericValue, max: numericValue }; // ✅ Convert valid number
    } else {
      console.error("Invalid specialKey format:", account.specialKey);
      account.specialKey = { min: 0, max: 100 }; // ✅ Assign default values instead
    }
  }
  const matchedCrypto = cryptoRandomizer() ?? {
    id: "default",
    name: "Unknown Crypto",
  }; // ✅ Ensures it's always defined
  const result = generateCustomRandomNumber(account);
  const interval = generateRandomInterval(account);
  console.log("int:", interval);
  // Update losses or profits based on the trade result

  // ✅ Store trade log in the database instead of localStorage
  await addTradeLog({ matchedCrypto, result, interval });

  // ✅ Update the account balance based on trade result in the database
  await updateTradeAccounts(account.id, result);
  updateTradeStatsLc(result);

  console.log("Trade log recorded and account balance updated!");
};
