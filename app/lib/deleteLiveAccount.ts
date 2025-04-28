"use server";
import prisma from "@/app/lib/db";
import { getUserId } from "./getUserId";

export async function deleteLiveAccount() {
  try {
    // ✅ Get authenticated user ID
    const userId = await getUserId();

    if (!userId) {
      return { success: false, error: "User authentication failed" };
    }

    // ✅ Check if the account exists
    const liveAccount = await prisma.liveAccount.findUnique({ where: { id: userId } });

    if (!liveAccount) {
      return { success: false, error: "Live account not found" };
    }

    // ✅ Delete the account
    await prisma.liveAccount.delete({ where: { id: userId } });

    console.log(`LiveAccount deleted for user ${userId}`);

    return { success: true, message: "LiveAccount deleted successfully" };
  } catch (error) {
    console.error("Error deleting live account:", error);
    return { success: false, error: "Failed to delete live account" };
  }
}