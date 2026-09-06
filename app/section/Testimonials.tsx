"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/app/components/ui/Reveal";

type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  result: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marcus Chen",
    role: "Independent Trader",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    quote:
      "CryptoGen completely changed how I approach the market. The AI picks up on patterns I'd never spot myself.",
    rating: 5,
    result: "+142% in 6 months",
  },
  {
    name: "Sofia Alvarez",
    role: "Portfolio Manager",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    quote:
      "I've used Bloomberg, TradingView, and half a dozen bots. Nothing comes close to the precision of CryptoGen's neural engine.",
    rating: 5,
    result: "Saved 20h/week",
  },
  {
    name: "David Okonkwo",
    role: "Crypto Fund Analyst",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    quote:
      "The risk controls alone are worth the subscription. Our fund's drawdown dropped by 60% in the first quarter.",
    rating: 5,
    result: "-60% drawdown",
  },
  {
    name: "Emma Johansson",
    role: "Day Trader",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    quote:
      "Setup took 10 minutes. Within a week I had three strategies running 24/7. It genuinely feels like cheating.",
    rating: 5,
    result: "3 strategies live",
  },
  {
    name: "Kenji Tanaka",
    role: "Quant Developer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    quote:
      "As a quant, I was skeptical. The codebase is clean, the API is well-documented, and the backtests are honest. Rare combo.",
    rating: 5,
    result: "API-first design",
  },
  {
    name: "Priya Patel",
    role: "Retail Investor",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    quote:
      "I started on the free plan with paper trading. Six months later I'm on Pro and the ROI has paid for itself ten times over.",
    rating: 5,
    result: "10× ROI",
  },
];

/** A single testimonial card with magnifying hover */
function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  // Varied heights for a masonry feel
  const tall = index % 3 === 1;

  return (
    <motion.article
      whileHover={{
        scale: 1.035,
        y: -6,
        zIndex: 20,
      }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={`group relative rounded-2xl border border-slate-200 bg-white p-6 transition-shadow duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-200 ${
        tall ? "md:row-span-2" : ""
      }`}
    >
      {/* Magnifier glow — subtle radial on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(99,102,241,0.08), transparent 60%)",
        }}
      />

      {/* Quote icon */}
      <Quote className="w-6 h-6 text-indigo-200 mb-4 flex-shrink-0 transition-colors group-hover:text-indigo-400" />

      {/* Rating */}
      <div className="flex items-center gap-0.5 mb-3">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star
            key={i}
            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      {/* Quote text */}
      <p className="text-slate-700 text-[15px] leading-relaxed mb-6">
        "{t.quote}"
      </p>

      {/* Result chip */}
      <div className="mb-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span className="text-xs font-semibold text-emerald-700">
          {t.result}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
          <Image
            src={t.avatar}
            alt={t.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 truncate">
            {t.name}
          </p>
          <p className="text-xs text-slate-500 truncate">{t.role}</p>
        </div>
      </div>
    </motion.article>
  );
}

export const Testimonials = () => {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="container relative z-10">
        {/* Header */}
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
              Loved by traders
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]">
              Real results from{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                real traders.
              </span>
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Join 12,000+ traders already automating their edge with CryptoGen.
            </p>
          </div>
        </Reveal>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <TestimonialCard t={t} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Aggregate stats */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: "4.9", label: "App Store rating" },
              { value: "12k+", label: "Active traders" },
              { value: "$240M", label: "Traded volume" },
              { value: "87%", label: "Retention rate" },
            ].map((s) => (
              <div
                key={s.label}
                className="text-center py-5 px-3 rounded-xl border border-slate-200 bg-slate-50/50"
              >
                <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                  {s.value}
                </p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};