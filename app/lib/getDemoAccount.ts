"use server";
import prisma from "@/app/lib/db";
import { getUserId } from "./getUserId"; // ✅ Ensure correct path

export async function getDemoAccount() {
  try {
    // ✅ Fetch userId using `getUserId` instead of passing it
    const userId = await getUserId();

    if (!userId) {
      return { success: false, error: "Missing userId" };
    }

    // ✅ Query database using `userId`

    const demoAccount = await prisma.demoAccount.findMany({ where: { id: userId } });

   

    if (!demoAccount) {
      return { success: false, error: "Account not found" };
    }
    console.log(demoAccount);
    return { success: true, demoAccount };
  } catch (error) {
    console.error("Database fetch error:", error);
    return { success: false, error: error };
  }
}