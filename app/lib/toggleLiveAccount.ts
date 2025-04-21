"use server";
import prisma from "./db";
import { getUserId } from "./getUserId";

export async function toggleLiveAccount() {
  try {
    // ✅ Get authenticated user ID
    const userId = await getUserId();

    if (!userId) {
      return { success: false, error: "User authentication failed" };
    }

    // ✅ Determine the correct Prisma model
    

    // ✅ Fetch the current account
    const account = await prisma.liveAccount.findUnique({
      where: { id: userId },
      select: { isActive: true },
    });

    if (!account) {
      return { success: false, error: "Account not found" };
    }

    // ✅ Toggle `isActive`
    const updatedAccount = await prisma.liveAccount.update({
      where: { id: userId },
      data: { isActive: !account.isActive },
    });

    console.log(`Updated ${updatedAccount} account status: ${updatedAccount.isActive ? "Active" : "Inactive"}`);

    return { success: true, updatedAccount };
  } catch (error) {
    console.error("Error toggling account status:", error);
    return { success: false, error: "Failed to update account status" };
  }
}