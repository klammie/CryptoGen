import { randomUUID } from "node:crypto"
import { NextResponse } from "next/server"
import { auth } from "@/app/lib/auth"
import prisma from "@/app/lib/db"

const maxelPayUrl = "https://api.maxelpay.com/api/v1/payments/sessions"

function getAppUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL
  if (configuredUrl) return configuredUrl.replace(/\/$/, "")

  return (process.env.NEXTAUTH_URL ?? "http://localhost:3000")
    .replace(/\/api\/auth\/callback\/google\/?$/, "")
    .replace(/\/$/, "")
}

export async function POST(request: Request) {
  const session = await auth()
  const userId = session?.user?.id
  const apiKey = process.env.MAXELPAY_API_KEY?.trim()

  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (!apiKey) return NextResponse.json({ error: "MaxelPay is not configured" }, { status: 503 })

  const body = await request.json().catch(() => null)
  const amount = Number(body?.amount)
  if (!Number.isSafeInteger(amount) || amount <= 0 || amount > 1_000_000) {
    return NextResponse.json({ error: "Enter a valid whole-dollar amount" }, { status: 400 })
  }

  const orderId = `deposit_${randomUUID()}`
  const appUrl = getAppUrl()
  const deposit = await prisma.deposit.create({
    data: { orderId, userId, amount },
  })

  try {
    const response = await fetch(maxelPayUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-KEY": apiKey },
      body: JSON.stringify({
        orderId,
        amount,
        currency: "USD",
        description: `CryptoGen wallet deposit (${orderId})`,
        successUrl: `${appUrl}/dashboard/wallet?deposit=success&orderId=${orderId}`,
        cancelUrl: `${appUrl}/dashboard/wallet?deposit=cancelled&orderId=${orderId}`,
        callbackUrl: `${appUrl}/api/webhooks/maxelpay`,
      }),
    })

    const result = await response.json().catch(() => null)
    const checkoutUrl =
      result?.data?.paymentUrl ??
      result?.paymentUrl ??
      result?.data?.checkoutUrl ??
      result?.checkoutUrl ??
      result?.data?.url ??
      result?.url
    const sessionId = result?.data?.sessionId ?? result?.sessionId

    if (!response.ok || typeof checkoutUrl !== "string") {
      await prisma.deposit.update({ where: { id: deposit.id }, data: { status: "failed" } })
      return NextResponse.json({ error: "MaxelPay could not create a payment session" }, { status: 502 })
    }

    await prisma.deposit.update({
      where: { id: deposit.id },
      data: { sessionId: typeof sessionId === "string" ? sessionId : undefined },
    })

    return NextResponse.json({ checkoutUrl })
  } catch {
    await prisma.deposit.update({ where: { id: deposit.id }, data: { status: "failed" } })
    return NextResponse.json({ error: "Unable to reach MaxelPay" }, { status: 502 })
  }
}