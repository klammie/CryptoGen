import  prisma  from "@/app/lib/db";

export async function updateTradeStats(userId: string, result: number) {
  try {
    if (!userId) {
      throw new Error("User ID is missing");
    }

    const updateValue = result > 0 ? { profits: { increment: 1 } } : { profits: { decrement: 1 } };

    await prisma.profitsLoss.update({
      where: { id: userId },
      data: updateValue,
    });

    console.log(`Updated trade stats: ${result > 0 ? "Profits +1" : "Profits -1"}`);
  } catch (error) {
    console.error("Database update error:", error);
  }
}