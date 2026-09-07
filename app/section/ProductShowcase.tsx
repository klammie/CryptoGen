"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  TrendingUp,
  Zap,
  Shield,
  BarChart3,
  Cpu,
  LineChart,
  ArrowUpRight,
} from "lucide-react";
import { Reveal, EASE } from "@/app/components/ui/Reveal";
import { MotionLink } from "@/app/components/ui/MotionLink";
import AuthModal from "@/app/components/AuthModal";

/** Animated number that counts up once it scrolls into view */
function LiveStat({
  label,
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
}: {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
}) {
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`
  );
  const [shown, setShown] = useState(`0${suffix}`);
  const started = useRef(false);

  useEffect(() => {
    display.on("change", (v) => setShown(v));
  }, [display]);

  return (
    <div
      ref={(node) => {
        if (!node || started.current) return;
        const obs = new IntersectionObserver(
          ([e]) => {
            if (e.isIntersecting && !started.current) {
              started.current = true;
              animate(mv, value, { duration: 1.6, ease: EASE });
            }
          },
          { threshold: 0.4 }
        );
        obs.observe(node);
        return () => obs.disconnect();
      }}
      className="rounded-2xl border border-slate-200 bg-white p-5"
    >
      <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
        {shown}
      </p>
    </div>
  );
}

/** Fake live chart path */
function LiveChart() {
  const path =
    "M 10 140 L 40 120 L 70 130 L 100 95 L 130 105 L 160 80 L 190 90 L 220 60 L 250 75 L 280 45 L 310 55 L 340 30 L 370 40 L 400 20";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative w-full h-[220px] md:h-[280px] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex items-start justify-between mb-6">
        <div>
          <p className="text-xs text-slate-400 font-medium">BTC / USDT</p>
          <p className="text-2xl font-bold text-white tracking-tight mt-1">
            $67,428.50
          </p>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
          <ArrowUpRight className="w-3 h-3 text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400">+12.4%</span>
        </div>
      </div>

      <svg
        viewBox="0 0 420 160"
        className="relative z-10 w-full h-[140px] md:h-[160px]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="chart-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Fill */}
        <motion.path
          d={`${path} L 400 160 L 10 160 Z`}
          fill="url(#chart-fill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Animated stroke */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#chart-stroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: EASE, delay: 0.5 }}
        />

        {/* Pulsing dot at end */}
        <motion.circle
          cx="400"
          cy="20"
          r="5"
          fill="#a855f7"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2.2 }}
        />
      </svg>
    </motion.div>
  );
}

const features = [
  {
    Icon: Cpu,
    title: "Neural Trading Engine",
    desc: "Deep-learning models trained on 10+ years of market data, executing with sub-second precision.",
  },
  {
    Icon: Shield,
    title: "Institutional Security",
    desc: "Cold-storage custody, multi-sig wallets, and bank-grade encryption on every transaction.",
  },
  {
    Icon: Zap,
    title: "24/7 Autonomous Mode",
    desc: "Set your strategy and let the bot trade around the clock — even while you sleep.",
  },
  {
    Icon: LineChart,
    title: "Real-time Analytics",
    desc: "Live P&L, drawdown tracking, and risk metrics streamed to your dashboard in real time.",
  },
];

export const ProductShowcase = () => {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] -translate-y-1/2 -translate-x-1/2 bg-indigo-100/40 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <Reveal>
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
              <BarChart3 className="w-3 h-3" />
              Live Performance
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Institutional algorithms,{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                retail access.
              </span>
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              The same quantitative strategies used by hedge funds — rebuilt,
              optimized, and made available to every trader on CryptoGen.
            </p>
          </div>
        </Reveal>

        {/* Dashboard mock + stats */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-16">
          <Reveal className="lg:col-span-3">
            <LiveChart />
          </Reveal>

          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <Reveal delay={0.05}>
              <LiveStat label="Avg. monthly ROI" value={18.4} suffix="%" decimals={1} />
            </Reveal>
            <Reveal delay={0.1}>
              <LiveStat label="Active strategies" value={47} />
            </Reveal>
            <Reveal delay={0.15}>
              <LiveStat label="Trades executed" value={2.4} suffix="M" decimals={1} />
            </Reveal>
            <Reveal delay={0.2}>
              <LiveStat label="Win rate" value={87} suffix="%" />
            </Reveal>
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="h-full rounded-2xl border border-slate-200 bg-white p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
                  <f.Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex items-center gap-6 flex-wrap">
            <MotionLink
              href="/dashboard"
              className="gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
            >
              <TrendingUp className="w-4 h-4" />
              Explore the dashboard
                <AuthModal
                  initialMode="signup"
                  trigger={
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-slate-800"
                    >
                      Try the platform
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.button>
                  }
                />
            </MotionLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
};