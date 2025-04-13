"use server";

import prisma from "./db"; // Adjust the path based on your project structure
import { requireUser } from "../lib/hooks";

export const updateAccbal = async (formData: FormData) => {
  const session = await requireUser();
  const id = session?.user?.id;
  const totalAmount = parseFloat(formData.get("totalAmount") as string);

  if (!id || isNaN(totalAmount)) {
    throw new Error("Invalid data provided");
  }

  try {
    // Fetch the user's current account balance
    const user = await prisma.user.findUnique({
      where: { id },
      select: { accBal: true }, // Only retrieve the accBal field
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if the accBal is sufficient
    if ((user.accBal ?? 0) < totalAmount) {
      throw new Error("Insufficient Funds");
    }

    // Proceed with updating accBal if balance is sufficient
    const updatedAccount = await prisma.user.update({
      where: { id },
      data: {
        accBal: {
          decrement: totalAmount, // Subtract totalAmount from accBal
        },
      },
    });

    console.log("Account balance updated successfully:", updatedAccount);
    return { success: true, message: "Account balance updated successfully" };
  } catch (error: unknown) {
    console.error("Error updating account balance:", error);
  
    let message = "An unexpected error occurred"; // ✅ Default error message
    if (error instanceof Error) {
      message = error.message; // ✅ TypeScript safely accesses `.message`
    }
  
    return { success: false, message };
  }
};