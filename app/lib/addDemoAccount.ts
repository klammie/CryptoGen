"use server";
import prisma from "./db";
import { getUserId } from "./getUserId";
import { updateKeyz } from "@/app/lib/UpdateKeyz"; // ✅ Import the addKeyz function

export async function addDemoAccount(accountData: {
  type: string;
  amount: number;
  image: string;
  isActive: boolean;
  cryptoId: string;
}) {
  try {
    // ✅ Get authenticated user ID server-side
    const userId = await getUserId();

    // Ensure valid user authentication
    if (!userId) {
      return { success: false, error: "User authentication failed" };
    }

    // ✅ Check if the user has sufficient keyz
    const keyUpdateResponse = await updateKeyz();
    if (!keyUpdateResponse.success) {
      console.warn(`Insufficient keyz: ${keyUpdateResponse.message}`);
      return { success: false, error: keyUpdateResponse.message }; // Exit if keyz are insufficient
    }

    console.log("Keyz are sufficient, proceeding with demo account creation.");

    // ✅ Create the new demo account
    const newAccount = await prisma.demoAccount.create({
      data: {
        id: userId, // Remove if `id` isn't required
        type: accountData.type,
        amount: accountData.amount,
        image: accountData.image,
        isActive: false,
        cryptoId: accountData.cryptoId,
      },
    });

    console.log("Demo account added successfully:", newAccount);
    return { success: true, newAccount };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Failed to add demo account" };
  }
}