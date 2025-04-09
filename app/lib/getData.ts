import prisma from "@/app/lib/db"; // Adjust the import path as needed

export async function getData(userId: string) {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        userName: true,
        accBal: true,
        keyz: true
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
