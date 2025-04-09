import prisma from "./db";
import { requireUser } from "./hooks";

export const updateKeyz = async () => {
  const session = await requireUser();
  const id = session?.user?.id;

  if (!id) {
    throw new Error("Invalid user session");
  }

  try {
    // Fetch the user's current keyz balance
    const user = await prisma.user.findUnique({
      where: { id },
      select: { keyz: true }, // Only retrieve the keyz field
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Check if keyz is greater than 1 before proceeding
    if (user.keyz <= 1) {
      return { success: false, message: "Insufficient Keys" };
    }

    // Proceed with decrementing keyz
    const updatedAccount = await prisma.user.update({
      where: { id },
      data: {
        keyz: {
          decrement: 1, // Subtract 1 from keyz
        },
      },
    });

    console.log("Keyz decremented successfully:", updatedAccount);
    return { success: true, message: "Keyz decremented successfully!" };
  } catch (error) {
    console.error("Error updating keyz:", error);
    return { success: false, message: "Failed to decrement keyz" };
  }
};
