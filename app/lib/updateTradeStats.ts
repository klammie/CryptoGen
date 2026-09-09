import prisma from "@/app/lib/db";

export async function updateTradeStats(userId: string, result: number) {
  try {
    if (!userId) {
      throw new Error("User ID is missing");
    }

    await prisma.profitsLoss.upsert({
      where: { id: userId },
      create: {
        id: userId,
        profits: result > 0 ? 1 : 0,
        loss: result > 0 ? 0 : 1,
        breakeven: 0,
      },
      update: result > 0
        ? { profits: { increment: 1 } }
        : { loss: { increment: 1 } },
    });
  } catch (error) {
    console.error("Database update error:", error);
  }
}