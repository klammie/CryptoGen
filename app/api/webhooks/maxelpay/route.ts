import { createHmac, timingSafeEqual } from "node:crypto"
import { NextResponse } from "next/server"
import prisma from "@/app/lib/db"

function isValidSignature(payload: string, signature: string | null) {
  const secret = process.env.MAXELPAY_WEBHOOK_SECRET
  if (!secret || !signature) return false

  const expected = createHmac("sha256", secret).update(payload).digest("hex")
  const actualBuffer = Buffer.from(signature, "hex")
  const expectedBuffer = Buffer.from(expected, "hex")
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer)
}

export async function POST(request: Request) {
  const rawPayload = await request.text()
  if (!isValidSignature(rawPayload, request.headers.get("x-maxelpay-signature"))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  const payload = JSON.parse(rawPayload) as {
    event?: string
    data?: Record<string, unknown>
  }
  const data = payload?.data
  if (typeof data?.orderId !== "string" || typeof data.status !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const deposit = await prisma.deposit.findUnique({ where: { orderId: data.orderId } })
  if (!deposit) return NextResponse.json({ error: "Unknown order" }, { status: 404 })

  const status = data.status.toLowerCase()
  const isPaid = payload.event === "payment.completed" && ["paid", "completed", "success"].includes(status)
  const nextStatus = isPaid ? "paid" : status

  await prisma.$transaction(async (transaction) => {
    const claimed = await transaction.deposit.updateMany({
      where: { id: deposit.id, status: { not: "paid" } },
      data: {
        status: nextStatus,
        paidAmount: typeof data.paidAmount === "number" ? Math.round(data.paidAmount) : undefined,
        txHash: typeof data.txHash === "string" ? data.txHash : undefined,
        network: typeof data.network === "string" ? data.network : undefined,
        tokenSymbol: typeof data.tokenSymbol === "string" ? data.tokenSymbol : undefined,
      },
    })

    if (!isPaid || claimed.count !== 1) return

    await transaction.user.update({
      where: { id: deposit.userId },
      data: { accBal: { increment: deposit.amount } },
    })
  })

  return NextResponse.json({ received: true })
}