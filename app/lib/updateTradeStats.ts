import prisma from "@/app/lib/db";

export async function updateTradeStats(userId: string, result: number) {
  try {
    if (!userId) {
      throw new Error("User ID is missing");
    }

    if (result > 0) {
      await prisma.profitsLoss.update({
        where: { id: userId },
        data: { profits: { increment: 1 } },
      });
      console.log("Profits incremented by 1");
    } else {
      await prisma.profitsLoss.update({
        where: { id: userId },
        data: { loss: { increment: 1 } },
      });
      console.log("Loss incremented by 1");
    }
  } catch (error) {
    console.error("Database update error:", error);
  }
}