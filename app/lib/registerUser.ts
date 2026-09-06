"use server"

import { hash } from "bcryptjs"
import prisma from "./db"

type RegisterResult = {
  ok: boolean
  error?: string
}

export async function registerUser(formData: FormData): Promise<RegisterResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const password = String(formData.get("password") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." }
  }

  if (password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." }
  }

  if (password !== confirmPassword) {
    return { ok: false, error: "Passwords do not match." }
  }

  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return { ok: false, error: "An account with this email already exists." }
  }

  const passwordHash = await hash(password, 12)
  try {
    await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    })
  } catch {
    return { ok: false, error: "An account with this email already exists." }
  }

  return { ok: true }
}