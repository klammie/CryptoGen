"use server";
import prisma from "@/app/lib/db";
import { getUserId } from "./getUserId"; // ✅ Ensure correct path

export async function getLiveAccount() {
  try {
    // ✅ Fetch userId using `getUserId` instead of passing it
    const userId = await getUserId();

    if (!userId) {
      return { success: false, error: "Missing userId" };
    }

    // ✅ Query database using `userId`

    const liveAccount = await prisma.liveAccount.findMany({ where: { id: userId } });

   

    if (!liveAccount) {
      return { success: false, error: "Account not found" };
    }
    console.log(liveAccount);
    return { success: true, liveAccount };
  } catch (error) {
    console.error("Database fetch error:", error);
    return { success: false, error: error };
  }
}