"use server";
import prisma from "@/app/lib/db";
import { getUserId } from "./getUserId"; // ✅ Ensure correct path

export async function getCryptoAccount() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return { success: false, error: "Missing userId" };
    }

    const liveAccount = await prisma.liveAccount.findUnique({ where: { id: userId } });
    const demoAccount = await prisma.demoAccount.findUnique({ where: { id: userId } });

    if (liveAccount) {
      return { success: true, account: { ...liveAccount, mode: "Live" } }; // ✅ Explicit type
    } else if (demoAccount) {
      return { success: true, account: { ...demoAccount, mode: "Demo" } }; // ✅ Explicit type
    } else {
      return { success: false, error: "Account not found" };
    }
  } catch (error) {
    console.error("Database fetch error:", error);
    return { success: false, error: error };
  }
}