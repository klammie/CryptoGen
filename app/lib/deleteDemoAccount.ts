"use server";
import prisma from "@/app/lib/db";
import { getUserId } from "./getUserId";

export async function deleteDemoAccount() {
  try {
    // ✅ Get authenticated user ID
    const userId = await getUserId();

    if (!userId) {
      return { success: false, error: "User authentication failed" };
    }

    // ✅ Check if the account exists
    const demoAccount = await prisma.demoAccount.findUnique({ where: { id: userId } });

    if (!demoAccount) {
      return { success: false, error: "Demo account not found" };
    }

    // ✅ Delete the account
    await prisma.demoAccount.delete({ where: { id: userId } });

    console.log(`DemoAccount deleted for user ${userId}`);

    return { success: true, message: "DemoAccount deleted successfully" };
  } catch (error) {
    console.error("Error deleting demo account:", error);
    return { success: false, error: "Failed to delete demo account" };
  }
}