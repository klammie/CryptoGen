"use client";

import Head from "next/head";
import Image from "next/image";
import { MoveRight, Check, Users, Wallet, BadgeCheck } from "lucide-react";
import { Header } from "@/app/section/Header";
import { Footer } from "@/app/section/Footer";
import { Reveal } from "@/app/components/ui/Reveal";
import { MotionLink } from "@/app/components/ui/MotionLink";

const steps = [
  {
    n: "01",
    title: "Sign up",
    desc: "Join the affiliate program and get your unique promo code instantly.",
  },
  {
    n: "02",
    title: "Share",
    desc: "Share your promo code with your audience through any channel.",
  },
  {
    n: "03",
    title: "Earn",
    desc: "Earn commissions for every new user who signs up and starts trading.",
  },
];

const benefits = [
  "Generous commission rates",
  "Real-time tracking and reporting",
  "Marketing materials and support",
  "Exclusive promotions and bonuses",
  "Timely payouts",
  "Affiliate contests",
  "Dedicated affiliate manager",
  "Exclusive webinars and training",
];

export default function Affiliate() {
  return (
    <div className="min-h-screen bg-white antialiased">
      <Head>
        <title>Affiliate Program - CryptoGen</title>
        <meta
          name="description"
          content="Join the CryptoGen Affiliate Program and earn commissions for promoting our platform."
        />
      </Head>

      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl -z-10" />

          <div className="container relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <Reveal>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
                    <Users className="w-3 h-3" />
                    Affiliate Program
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                    Earn{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      big commissions
                    </span>{" "}
                    for sharing what works.
                  </h1>
                  <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                    Becoming an affiliate is easy, profitable, and free. Earn generous
                    commissions every time a user signs up with your promo code.
                  </p>
                  <div className="mt-8">
                    <MotionLink
                      href="/dashboard"
                      className="gap-2 px-6 py-3 text-base font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                    >
                      Become an Affiliate
                      <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </MotionLink>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-500/15 to-purple-500/15 blur-2xl" />
                  <div className="relative rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/5">
                    <Image
                      src="/assets/3d-cryptocurrency-rendering-design.jpg"
                      alt="CryptoGen affiliate program"
                      width={600}
                      height={400}
                      priority
                      className="w-full rounded-2xl object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="pb-24">
          <div className="container">
            <Reveal>
              <div className="max-w-2xl mx-auto text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                  How it works
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Getting started takes less than five minutes.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-5">
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.08}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600 mb-5">
                      {s.n}
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Benefits + Join panel ── */}
        <section className="pb-24 bg-slate-50 border-y border-slate-200">
          <div className="container py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Benefits */}
              <Reveal>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">
                    Affiliate benefits
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {benefits.map((b) => (
                      <div
                        key={b}
                        className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3"
                      >
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <Check className="w-2.5 h-2.5 text-indigo-600" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-slate-600">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Join panel */}
              <Reveal delay={0.1}>
                <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-10">
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-6">
                      <Wallet className="w-5 h-5 text-indigo-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                      Ready to start earning?
                    </h3>
                    <p className="text-slate-400 leading-relaxed mb-8">
                      Join the CryptoGen affiliate program today and take the first step
                      towards a new revenue stream. Sign up to get your unique
                      promotional code.
                    </p>
                    <div className="flex items-center gap-3 mb-8">
                      <BadgeCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-slate-300">
                        Free to join · No minimum audience
                      </span>
                    </div>
                    <MotionLink
                      href="/dashboard"
                      className="gap-2 px-6 py-3 text-sm font-semibold text-slate-900 bg-white rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      Sign Up Now
                      <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </MotionLink>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}