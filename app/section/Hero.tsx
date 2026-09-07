"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import cogImage from "@/public/assets/cog.png";
import { MotionLink } from "@/app/components/ui/MotionLink";
import { EASE } from "@/app/components/ui/Reveal";
import AuthModal from "@/app/components/AuthModal";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

export const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Scroll-driven rotation + gentle downward parallax for the cog
  const cogRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const cogY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={heroRef}
      className="relative pt-20 pb-24 md:pt-28 md:pb-32 bg-white overflow-hidden"
    >
      {/* Subtle Background Grid & Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/50 rounded-full blur-3xl -z-10" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl -z-10" />

      {/* Mobile only: cog as a faint watermark behind the copy (adds no height) */}
      <div className="lg:hidden absolute top-16 left-1/2 -translate-x-1/2 w-[420px] h-[420px] opacity-[0.07] pointer-events-none">
        <motion.div style={{ rotate: cogRotate }} className="w-full h-full">
          <Image src={cogImage} alt="" className="w-full h-full object-contain" />
        </motion.div>
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ── Copy ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl mx-auto lg:mx-0"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Version 2.0 is live
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]"
            >
              The Most Accurate{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AI Cryptocurrency
              </span>{" "}
              Trading Bot
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed"
            >
              Automate your portfolio with institutional-grade algorithms. Our
              built-in Artificial Intelligence takes the emotion out of trading,
              executing precise strategies 24/7.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-10">
              <AuthModal
                initialMode="signup"
                trigger={
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/20 transition-colors hover:bg-slate-800"
                  >
                    Start Trading for Free
                    <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                }
              />

              <MotionLink
                href="/about"
                shine={false}
                className="gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors"
              >
                See How It Works
              </MotionLink>
            </motion.div>
          </motion.div>

          {/* ── Cog visual (desktop) ── */}
          <motion.div
            style={{ y: cogY }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            className="relative hidden lg:flex items-center justify-center py-8"
          >
            {/* Soft glow */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-2xl" />

            {/* Static ring */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-indigo-200/70" />

            {/* Dashed ring — rotates with scroll */}
            <motion.div
              style={{ rotate: cogRotate }}
              className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-purple-300/60"
            />

            {/* The cog — rotates with scroll + idle float */}
            <motion.div
              style={{ rotate: cogRotate }}
              animate={{ y: [-10, 10] }}
              transition={{
                y: { repeat: Infinity, repeatType: "mirror", duration: 5, ease: "easeInOut" },
              }}
              className="relative w-64 h-64 xl:w-72 xl:h-72 flex items-center justify-center"
            >
              <Image
                src={cogImage}
                alt="AI Core"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};