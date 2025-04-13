import prisma from "./db";
import { requireUser } from "./hooks";

export const updateKeyz = async (formData: FormData) => {
  console.log("Received form data:", formData);

  const session = await requireUser();
  const id = session?.user?.id;

  if (!id) return { success: false, message: "Invalid user session" };

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { keyz: true },
    });

    if (!user) return { success: false, message: "User not found" };
    if (user.keyz === null)
      return { success: false, message: "Keyz not initialized" };

    if (user.keyz <= 1) return { success: false, message: "Insufficient Keys" };

    const updatedAccount = await prisma.user.update({
      where: { id },
      data: { keyz: { decrement: 1 } },
    });

    console.log("Keyz decremented successfully:", updatedAccount);
    return { success: true, message: "Keyz decremented successfully!" };
  } catch (error) {
    console.error("Error updating keyz:", error);
    return { success: false, message: "Failed to decrement keyz" };
  }
};
