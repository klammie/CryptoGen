"use server";

import prisma from "./db"; // Adjust path based on your project structure
import { requireUser } from "../lib/hooks";

export const incrementKeyz = async () => {
  const session = await requireUser();
  const id = session?.user?.id;

  if (!id) {
    throw new Error("Invalid user session");
  }

  try {
    // Fetch the current value of keyz
    const user = await prisma.user.findUnique({
      where: { id },
      select: { keyz: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Increment keyz by 1
    const updatedAccount = await prisma.user.update({
      where: { id },
      data: {
        keyz: { increment: 1 }, // Add 1 to the keyz field
      },
    });

    console.log("Keyz incremented successfully:", updatedAccount);
    return { success: true, message: "Keyz incremented successfully!" };
  } catch (error) {
    console.error("Error incrementing keyz:", error);
    return { success: false, message: "Failed to increment keyz" };
  }
};