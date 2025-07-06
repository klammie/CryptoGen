import prisma from "./db";
import { getUserId } from "./getUserId";

export async function toggleLiveAccount(cryptoId: string) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return { success: false, error: "User authentication failed" };
    }

    // ✅ Find the specific live account by userId and cryptoId
    const account = await prisma.liveAccount.findFirst({
      where: {
        id: userId,
        cryptoId: cryptoId,
      },
      select: { isActive: true },
    });

    if (!account) {
      return { success: false, error: "Live account not found" };
    }

    // ✅ Toggle isActive without storing the result
    await prisma.liveAccount.updateMany({
      where: {
        id: userId,
        cryptoId: cryptoId,
      },
      data: {
        isActive: !account.isActive,
      },
    });

    console.log(
      `Live account ${cryptoId} is now ${!account.isActive ? "Active" : "Inactive"}`
    );

    return {
      success: true,
      updatedAccount: {
        id: userId,
        cryptoId,
        isActive: !account.isActive,
      },
    };
  } catch (error) {
    console.error("Error toggling live account:", error);
    return { success: false, error: "Failed to update live account status" };
  }
}