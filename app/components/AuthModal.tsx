"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { registerUser } from "@/app/lib/registerUser";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// Adjust this path if you saved the logo component elsewhere
import { CryptoGenLogo } from "@/app/components/ui/CryptoGenLogo";
import GoogleLogo from "@/public/googlelogo.png";
import Image from "next/image";
import {
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  MoveRight,
  ShieldCheck,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const inputClass =
  "w-full rounded-xl border border-indigo-100 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/25";

const STRENGTH_LABELS = ["Too weak", "Weak", "Fair", "Good", "Strong"];

interface AuthModalProps {
  initialMode?: "signin" | "signup";
  trigger?: ReactNode;
}

function scorePassword(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function AuthModal({
  initialMode = "signin",
  trigger,
}: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const score = scorePassword(password);

  async function handleGoogleSignIn() {
    setLoading(true);
    setError("");
    await signIn("google", { callbackUrl: "/dashboard" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (mode === "signup") {
      const fd = new FormData();
      fd.set("email", email);
      fd.set("password", password);
      fd.set("confirmPassword", confirmPassword);

      const result = await registerUser(fd);
      if (!result.ok) {
        setError(result.error ?? "Unable to create your account.");
        setLoading(false);
        return;
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    window.location.assign("/dashboard");
  }

  const switchMode = (m: "signin" | "signup") => {
    setMode(m);
    setError("");
  };

  return (
    <Dialog>
      {/* ── Trigger (black) ── */}
      <DialogTrigger asChild>
        {trigger ?? (
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            disabled={loading}
            className="group relative overflow-hidden rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-black disabled:opacity-60"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-indigo-200/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
            />
            {loading ? "Signing in..." : "Try for Free"}
          </motion.button>
        )}
      </DialogTrigger>

      {/* ── Modal (white card) ── */}
      <DialogContent className="sm:max-w-[400px] overflow-hidden rounded-2xl border-indigo-100 bg-white p-0 shadow-2xl shadow-indigo-500/10">
        {/* Light purple accent line */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300" />

        <DialogHeader className="relative flex flex-col items-center gap-2 px-8 pb-3 pt-8 text-center">
          {/* Soft purple glow */}
          <div className="pointer-events-none absolute -top-14 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-indigo-100/70 blur-2xl" />

          {/* Accessible title (visually hidden — the logo carries the brand) */}
          <DialogTitle className="sr-only">
            {mode === "signin"
              ? "Sign in to CryptoGen"
              : "Create your CryptoGen account"}
          </DialogTitle>

          {/* ── Brand logo (transparent SVG mark + wordmark) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative"
          >
            <CryptoGenLogo size={40} />
          </motion.div>

          <motion.p
            key={mode}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="relative text-[13px] text-slate-500"
          >
            {mode === "signin"
              ? "Welcome back — sign in to your dashboard."
              : "Create your free account in seconds."}
          </motion.p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="relative space-y-4 px-8 pb-6 pt-2">
          {/* ── Mode switch (light purple track, white pill) ── */}
          <div className="grid grid-cols-2 rounded-xl border border-indigo-100 bg-indigo-50/70 p-1">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`relative rounded-lg py-2 text-sm font-semibold transition-colors ${
                  mode === m ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {mode === m && (
                  <motion.span
                    layoutId="auth-mode-pill"
                    className="absolute inset-0 rounded-lg border border-indigo-100 bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative">
                  {m === "signin" ? "Sign in" : "Create account"}
                </span>
              </button>
            ))}
          </div>

          {/* ── Google (white) ── */}
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-100 bg-white py-2.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-indigo-50/60 disabled:opacity-60"
          >
            <Image src={GoogleLogo} alt="" className="h-4 w-4" />
            Continue with Google
          </motion.button>

          {/* ── Divider ─ */}
          <div className="relative flex items-center gap-3 text-[11px] text-slate-400">
            <div className="h-px flex-1 bg-indigo-100" />
            <span>OR</span>
            <div className="h-px flex-1 bg-indigo-100" />
          </div>

          {/* ── Email ── */}
          <div>
            <label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium text-slate-900">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* ── Password ── */}
          <div>
            <label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium text-slate-900">
              Password
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                minLength={8}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-indigo-300 transition-colors hover:text-indigo-600"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {/* Strength meter — purple scale */}
            <AnimatePresence initial={false}>
              {mode === "signup" && password.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-1.5 pt-2.5">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                          i < score ? "bg-indigo-400" : "bg-indigo-100"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="pt-1.5 text-[11px] font-medium text-indigo-600">
                    {STRENGTH_LABELS[score]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Confirm password (signup only) ── */}
          <AnimatePresence initial={false}>
            {mode === "signup" && (
              <motion.div
                key="confirm"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <label
                  htmlFor="auth-confirm-password"
                  className="mb-1.5 block text-sm font-medium text-slate-900"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
                  <input
                    id="auth-confirm-password"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={8}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-indigo-300 transition-colors hover:text-indigo-600"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Error (semantic red only) ── */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[13px] text-rose-600"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Submit (black) ── */}
          <motion.button
            type="submit"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-colors hover:bg-black disabled:pointer-events-none disabled:opacity-60"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-indigo-200/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
            />
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              <>
                {mode === "signup" ? "Create account" : "Sign in"}
                <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            )}
          </motion.button>
        </form>

        {/* ── Trust footer (light purple) ── */}
        <div className="flex items-center justify-center gap-1.5 border-t border-indigo-100 bg-indigo-50/60 px-8 py-3 text-[11px] text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
          Protected by 256-bit encryption · 2FA supported
        </div>
      </DialogContent>
    </Dialog>
  );
}