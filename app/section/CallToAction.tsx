"use client";
import { MoveRight } from "lucide-react";
import Image from "next/image"; // ✅ Import Next.js Image component
import starImage from "@/public/assets/star.png";
import springImage from "@/public/assets/spring.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CallToAction = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-white to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="container">
        <div className="section-heading relative">
          <h2 className="section-title py-2">Sign up for Free Today</h2>
          <p className="section-description mt-6">
            Trading is not as simple as some traders make it seem. While they
            might tell you that{" "}
            <span>
              &lsquo;a good strategy and proper risk management&rsquo;
            </span>{" "}
            are essential, that&apos;s just the tip of the iceberg. Dive deeper
            to uncover more insights below.
          </p>
          {/* ✅ Use Next.js Image component */}
          <motion.div
            className="absolute -left-[350px] -top-[137px] hidden sm:block" // Hide on small screens
            style={{ translateY }}
          >
            <Image src={starImage} alt="Star Image" width={360} height={360} />
          </motion.div>

          <motion.div
            className="absolute -right-[331px] -top-[19px] hidden sm:block" // Hide on small screens
            style={{ translateY }}
          >
            <Image
              src={springImage}
              alt="Spring Image"
              width={360}
              height={360}
            />
          </motion.div>
        </div>
        <div className="flex gap-2 mt-10 justify-center">
          <button className="btn btn-primary">Get for free</button>
          <a href="/about">
            <button className="btn btn-text">
              <span>Learn more</span>
              <MoveRight className="h-5 w-5 gap-1 justify-center flex ml-1 mt-0.5" />
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};
