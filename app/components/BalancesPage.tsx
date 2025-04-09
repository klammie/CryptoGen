import prisma from "../lib/db";

async function getAccBal(userId: string) {
  const accData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      accBal: true,
    },
  });

  if (!accData?.accBal) {
    return console.log("No Data");
  }

  return accData;
}