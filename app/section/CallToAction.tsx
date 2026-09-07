"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import starImage from "@/public/assets/star.png";
import springImage from "@/public/assets/spring.png";
import { MotionLink } from "@/app/components/ui/MotionLink";
import { EASE } from "@/app/components/ui/Reveal";
import AuthModal from "@/app/components/AuthModal";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
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

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-slate-900 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          {/* Floating Accents */}
          <motion.div
            className="absolute -left-20 top-10 hidden lg:block opacity-40"
            style={{ translateY }}
          >
            <Image src={starImage} alt="" width={120} height={120} className="w-32 h-32" />
          </motion.div>
          <motion.div
            className="absolute -right-10 bottom-10 hidden lg:block opacity-40"
            style={{ translateY }}
          >
            <Image src={springImage} alt="" width={140} height={140} className="w-36 h-36" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight"
          >
            Ready to automate your <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              trading success?
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="mt-6 text-lg text-slate-400 max-w-xl leading-relaxed">
            Join thousands of traders who have already upgraded their portfolio. Start
            with a free demo account today and experience the power of AI.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mt-10">
            <AuthModal
              initialMode="signup"
              trigger={
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-slate-900 shadow-lg transition-colors hover:bg-slate-100"
                >
                  Get Started Now
                  <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.button>
              }
            />

            <MotionLink
              href="/dashboard/help/works"
              shine={false}
              className="px-8 py-3.5 text-base font-semibold text-white bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-slate-600 transition-colors"
            >
              Learn More
            </MotionLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};