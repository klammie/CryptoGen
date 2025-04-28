"use server";
import prisma from "./db";
import { getUserId } from "./getUserId";

export async function addDemoAccount(accountData: { type: string; amount: number; image: string, isActive: boolean, cryptoId: string }) {
  try {
    // ✅ Get authenticated user ID server-side
    const userId = await getUserId();

    // Ensure valid user authentication
    if (!userId) {
      return { success: false, error: "User authentication failed" };
    }


    // ✅ Create the new demo account (without client-side errors)
    const newAccount = await prisma.demoAccount.create({
      data: {
        id: userId,
        type: accountData.type,
        amount: accountData.amount,
        image: accountData.image,
        isActive: false,
        cryptoId: accountData.cryptoId
      },
    });

    return { success: true, newAccount };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: error };
  }
}