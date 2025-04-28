"use server";
import  prisma  from "@/app/lib/db";

export async function getTradeLogs(userId: string) {
  try {
    if (!userId) return { success: false, error: "Missing userId" };

    const tradeLogs = await prisma.tradeLogs.findMany({
      where: { userId }, // ✅ Correct: Filtering by userId
    });

    return { success: true, tradeLogs };
  } catch (error) {
    console.error("Database fetch error:", error);
    return { success: false, error: error };
  }
}