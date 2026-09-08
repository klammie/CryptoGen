"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Reveal, EASE } from "@/app/components/ui/Reveal";
import { MotionLink } from "@/app/components/ui/MotionLink";

type Plan = {
  name: string;
  description: string;
  monthly: number;
  yearly: number;
  popular?: boolean;
  cta: string;
  features: string[];
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    description: "For new traders exploring the platform.",
    monthly: 0,
    yearly: 0,
    cta: "Start free",
    features: [
      "1 active strategy",
      "Paper trading mode",
      "Basic market data",
      "Community access",
      "Email support",
    ],
  },
  {
    name: "Pro",
    description: "For serious traders ready to scale.",
    monthly: 49,
    yearly: 39,
    popular: true,
    cta: "Upgrade to Pro",
    features: [
      "Unlimited strategies",
      "Live trading on 10+ exchanges",
      "Real-time analytics & alerts",
      "Priority execution routing",
      "Advanced risk controls",
      "24/7 priority support",
    ],
  },
  {
    name: "Enterprise",
    description: "For funds and institutional teams.",
    monthly: 299,
    yearly: 249,
    cta: "Contact sales",
    features: [
      "Everything in Pro",
      "Custom strategy API",
      "Dedicated account manager",
      "White-glove onboarding",
      "SOC 2 compliance",
      "SLA-backed uptime",
    ],
  },
];

export const Pricing = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const save = (plan: Plan) =>
    plan.yearly > 0
      ? Math.round(((plan.monthly - plan.yearly) / plan.monthly) * 100)
      : 0;

  return (
    <section className="relative py-24 md:py-32 bg-slate-50 overflow-hidden">
      {/* Accent glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 translate-x-1/2 bg-purple-100/40 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3" />
              Simple pricing
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              One platform.{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Every plan.
              </span>
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Start free. Upgrade when your portfolio demands it. Cancel anytime.
            </p>
          </div>
        </Reveal>

        {/* Billing toggle */}
        <Reveal>
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center rounded-full bg-white border border-slate-200 p-1 shadow-sm">
              {(["monthly", "yearly"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setBilling(opt)}
                  className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-colors ${
                    billing === opt
                      ? "text-indigo-600"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {billing === opt && (
                    <motion.span
                      layoutId="billing-bg"
                      className="absolute inset-0 bg-slate-900 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative capitalize">
                    {opt}
                    {opt === "yearly" && (
                      <span className="ml-1.5 text-xs text-emerald-500 font-bold">
                        -20%
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className={`relative h-full rounded-2xl p-8 flex flex-col ${
                  plan.popular
                    ? "bg-slate-900 text-white border border-slate-800 shadow-2xl shadow-slate-900/20 scale-[1.02]"
                    : "bg-white text-slate-900 border border-slate-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[11px] font-bold uppercase tracking-wide shadow-lg">
                      <Sparkles className="w-3 h-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <p
                    className={`text-sm mt-1 ${
                      plan.popular ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price — animated swap */}
                <div className="my-8">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-sm font-medium ${
                        plan.popular ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      $
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={billing}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: EASE }}
                        className="text-5xl font-bold tracking-tight tabular-nums"
                      >
                        {billing === "monthly" ? plan.monthly : plan.yearly}
                      </motion.span>
                    </AnimatePresence>
                    {plan.monthly > 0 && (
                      <span
                        className={`text-sm ${
                          plan.popular ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        /mo
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-2 ${
                      plan.popular ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {plan.monthly === 0
                      ? "Free forever"
                      : billing === "yearly"
                      ? `Billed $${plan.yearly * 12}/year · save ${save(plan)}%`
                      : "Billed monthly"}
                  </p>
                </div>

                {/* CTA */}
                <MotionLink
                  href="/dashboard/shop"
                  fullWidth
                  className={`py-3 text-sm font-semibold rounded-xl transition-colors ${
                    plan.popular
                      ? "text-slate-900 bg-white hover:bg-slate-100"
                      : "text-white bg-slate-900 hover:bg-slate-800"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </MotionLink>

                {/* Features */}
                <ul className="mt-8 space-y-3 flex-1">
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      className={`flex items-start gap-2.5 text-sm ${
                        plan.popular ? "text-slate-300" : "text-slate-600"
                      }`}
                    >
                      <span
                        className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.popular
                            ? "bg-indigo-500/20"
                            : "bg-indigo-100"
                        }`}
                      >
                        <Check
                          className={`w-2.5 h-2.5 ${
                            plan.popular ? "text-indigo-300" : "text-indigo-600"
                          }`}
                          strokeWidth={3}
                        />
                      </span>
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Trust note */}
        <Reveal delay={0.1}>
          <p className="text-center text-sm text-slate-500 mt-12">
            All plans include SSL encryption, 2FA, and 30-day money-back guarantee.
          </p>
        </Reveal>
      </div>
    </section>
  );
};