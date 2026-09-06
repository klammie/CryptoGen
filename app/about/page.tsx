"use client";

import Head from "next/head";
import Image from "next/image";
import { MoveRight, Target, Eye, ShieldCheck } from "lucide-react";
import { Header } from "@/app/section/Header";
import { Footer } from "@/app/section/Footer";
import { Reveal } from "@/app/components/ui/Reveal";
import { MotionLink } from "@/app/components/ui/MotionLink";

const stats = [
  { value: "+78%", label: "Win Rate" },
  { value: "+31,600", label: "Active Users" },
  { value: "+$17,045,000", label: "Amount Paid-Out" },
];

const principles = [
  {
    Icon: Target,
    title: "Precision",
    desc: "Every trade is executed in split seconds with optimal risk management — no hesitation, no guesswork.",
  },
  {
    Icon: Eye,
    title: "Transparency",
    desc: "No hidden affiliate games. We win when you win. Our performance is tested, tracked and proven over time.",
  },
  {
    Icon: ShieldCheck,
    title: "Zero Emotions",
    desc: "The AI never fears missing out and never revenge trades. It simply follows A+ setups, 24/7.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Head>
        <title>About Us - CryptoGen</title>
        <meta
          name="description"
          content="Learn more about CryptoGen, your trusted platform for cryptocurrency trading."
        />
      </Head>

      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-100/50 rounded-full blur-3xl -z-10" />

          <div className="container relative z-10">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
                  Our Story
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                  Built by traders,{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    for traders.
                  </span>
                </h1>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  CryptoGen was born from real losses, hard lessons and two years of
                  market analysis — so you don&apos;t have to repeat them.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Story ── */}
        <section className="pb-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image */}
              <Reveal>
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/15 to-purple-500/15 blur-2xl" />
                  <div className="relative rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/5">
                    <Image
                      src="/assets/StockCake-Robot Analyzing Data_1742163711.jpg"
                      alt="AI analyzing market data"
                      width={600}
                      height={400}
                      priority
                      className="w-full rounded-2xl object-cover"
                    />
                    <div className="absolute -bottom-5 left-8 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-lg">
                      <p className="text-[11px] font-medium text-slate-500">The AI works</p>
                      <p className="text-sm font-bold text-slate-900">24/7 · Zero emotions</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Copy */}
              <Reveal delay={0.1}>
                <div className="space-y-5 text-slate-600 leading-relaxed">
                  <p>
                    I remember when I was first introduced to trading. Even though I was
                    aware of the risks, I still lost a lot. It took me about two years of
                    consistent learning and analyzing the market to start recovering some
                    of my losses. I share this because trading is not as easy as many
                    people online make it seem — some even earn commissions whether you
                    win or lose.
                  </p>
                  <p>
                    Now, imagine an application created by traders, for traders. An
                    application designed to eliminate those long hours spent sitting in
                    front of a computer analyzing the market, implementing strategies, and
                    waiting for setups to play out. No more entering trades too early out
                    of fear of missing out, or too late due to a lack of confidence in
                    your strategy.
                  </p>
                  <div className="rounded-r-2xl border-l-4 border-indigo-600 bg-indigo-50/60 px-5 py-4 text-slate-700">
                    That&apos;s where <strong className="text-slate-900">CryptoGen</strong>{" "}
                    comes in. A one-click interface powered by cutting-edge AI — developed
                    to analyze the market 24/7, search for A+ strategies, and execute
                    trades within split seconds with optimal risk management and zero
                    emotions.
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    — The CryptoGen Team
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── Stats band ── */}
        <section className="pb-24">
          <div className="container">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-12 md:py-16">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl" />
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-3xl md:text-4xl font-bold text-white tracking-tight tabular-nums">
                        {s.value}
                      </p>
                      <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                      <p className="mt-3 text-sm text-slate-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Principles ── */}
        <section className="pb-24 bg-slate-50 border-y border-slate-200">
          <div className="container py-24">
            <Reveal>
              <div className="max-w-2xl mx-auto text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  What we stand for
                </h2>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-5">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-5">
                      <p.Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
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
                  Ready to trade{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    smarter?
                  </span>
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Join thousands of traders already automating their edge.
                </p>
                <div className="mt-8 flex justify-center">
                  <MotionLink
                    href="/dashboard"
                    className="gap-2 px-6 py-3 text-base font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                  >
                    Start Trading for Free
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