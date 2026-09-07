"use server";

import prisma from "./db";
import { getUserId } from "./getUserId";

export async function toggleLiveAccount(cryptoId: string) {
  try {
    const userId = await getUserId();

    if (!userId) {
      return { success: false, error: "User authentication failed" };
    }

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

    const isActive = !account.isActive;

    await prisma.liveAccount.updateMany({
      where: {
        id: userId,
        cryptoId: cryptoId,
      },
      data: {
        isActive,
      },
    });

    return { success: true, isActive };
  } catch (error) {
    console.error("Error toggling live account:", error);
    return { success: false, error: "Failed to update live account status" };
  }
}