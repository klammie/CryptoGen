"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import {
  MoveRight,
  LineChart,
  ShieldCheck,
  Sparkles,
  LifeBuoy,
  Layers,
} from "lucide-react";
import { Header } from "@/app/section/Header";
import { Footer } from "@/app/section/Footer";
import { Reveal, EASE } from "@/app/components/ui/Reveal";
import { MotionLink } from "@/app/components/ui/MotionLink";

const modes = [
  {
    name: "Passive",
    risk: 1,
    dot: "bg-emerald-500",
    text: "text-emerald-600",
    desc: "Steady, low-drawdown strategies for long-term growth with minimal exposure.",
  },
  {
    name: "Semi-Aggressive",
    risk: 2,
    dot: "bg-amber-500",
    text: "text-amber-600",
    desc: "A balanced mix of opportunity and risk for traders who want more movement.",
  },
  {
    name: "Aggressive",
    risk: 3,
    dot: "bg-rose-500",
    text: "text-rose-600",
    desc: "High-activity strategies chasing maximum opportunity in volatile markets.",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Head>
        <title>Features - CryptoGen</title>
        <meta
          name="description"
          content="Discover the powerful features of CryptoGen, your trusted platform for cryptocurrency trading."
        />
      </Head>

      <Header />

      <main>
        {/* ── Hero ─ */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-100/50 rounded-full blur-3xl -z-10" />

          <div className="container relative z-10">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
                  <Sparkles className="w-3 h-3" />
                  Features
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                  Everything you need to{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    trade smarter.
                  </span>
                </h1>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  A complete toolkit built to empower traders — from real-time data to
                  automated strategies and institutional-grade security.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Bento feature grid ── */}
        <section className="pb-24">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Large card */}
              <Reveal className="md:col-span-2">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
                    <LineChart className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Advanced Trading Tools
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-lg">
                    Access real-time market data, customizable charts, and automated
                    trading strategies designed to optimize every decision you make.
                  </p>

                  {/* Animated sparkline */}
                  <svg viewBox="0 0 400 120" className="mt-8 w-full h-28" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="feat-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#a855f7" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0 100 L40 88 L80 94 L120 70 L160 78 L200 56 L240 64 L280 40 L320 48 L360 26 L400 14"
                      fill="none"
                      stroke="url(#feat-line)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: EASE }}
                    />
                  </svg>
                </div>
              </Reveal>

              {/* Security */}
              <Reveal delay={0.08}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    High Security Standards
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Two-factor authentication, cold storage, and end-to-end encryption
                    keep your assets and personal information protected at all times.
                  </p>
                </div>
              </Reveal>

              {/* Interface */}
              <Reveal delay={0.05}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
                    <Sparkles className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    User-Friendly Interface
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Intuitive by design — easy navigation, clear visuals, and
                    comprehensive tools for beginners and pros alike.
                  </p>
                </div>
              </Reveal>

              {/* Support */}
              <Reveal delay={0.1}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
                    <LifeBuoy className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    24/7 Customer Support
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Our dedicated team is available around the clock for technical
                    assistance and trading guidance. We&apos;re here to help.
                  </p>
                </div>
              </Reveal>

              {/* Options */}
              <Reveal delay={0.15} className="md:col-span-2 lg:col-span-1">
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
                    <Layers className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Diverse Trading Options
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Choose your risk profile and explore various cryptocurrencies to
                    diversify your portfolio.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Trading modes ── */}
        <section className="pb-24 bg-slate-50 border-y border-slate-200">
          <div className="container py-24">
            <Reveal>
              <div className="max-w-2xl mx-auto text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  Pick your risk profile
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Three strategy intensities, one intelligent engine.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-5">
              {modes.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-slate-900">{m.name}</h3>
                      <div className="flex items-center gap-1">
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className={`w-2 h-2 rounded-full ${d < m.risk ? m.dot : "bg-slate-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{m.desc}</p>
                    <p className={`mt-4 text-xs font-semibold ${m.text}`}>
                      Risk level {m.risk}/3
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24">
          <div className="container">
            <Reveal>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  Put the engine{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    to work.
                  </span>
                </h2>
                <div className="mt-8 flex justify-center">
                  <MotionLink
                    href="/dashboard"
                    className="gap-2 px-6 py-3 text-base font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                  >
                    Open Dashboard
                    <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </MotionLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}