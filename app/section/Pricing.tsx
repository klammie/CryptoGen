"use client";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const pricingTiers = [
  {
    title: "Passive",
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "3+ Instruments to trade",
      "Bonus instruments",
      "Beginner Friendly",
      "5% Deposit Bonus",
    ],
  },
  {
    title: "Semi",
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "5+ Instruments to trade",
      "Bonus instruments",
      "Pros and Beginner Friendly",
      "Mt4 & Mt5 Investor Account login",
      "10% Deposit Bonus",
    ],
  },
  {
    title: "Aggressive",
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "8+ Instruments to trade",
      "Bonus instruments",
      "Commercial Accounts Available",
      "Elite Customer Support",
      "Mt4 & Mt5 Investor Account login",
      "20% Deposit Bonus",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title py-2">Have it your way!</h2>
          <p className="section-description mt-5">
            Choose from three distinct trading styles: Whether you prefer a
            passive, semi-aggressive, or aggressive approach, our crypto trading
            app offers the perfect account to match your strategy. Tailor your
            experience to suit your trading style and maximize your potential.
          </p>
        </div>
        <div className="flex flex-col gap-12 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(
            ({ title, buttonText, popular, inverse, features }, tierIndex) => (
              <div
                key={`tier-${tierIndex}`}
                className={twMerge(
                  "card",
                  inverse === true && "border-black bg-black text-white"
                )}
              >
                <div className="flex justify-between">
                  <h3
                    className={twMerge(
                      "font-bold text-black text-3xl mr-4",
                      inverse === true && "text-white/60"
                    )}
                  >
                    {title}
                  </h3>
                  {popular === true && (
                    <div className="inline-flex items-center text-sm px-4 py-1.5 rounded-xl border border-white/20">
                      <motion.span
                        animate={{
                          backgroundPositionX: "100%",
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                          repeatType: "loop",
                        }}
                        className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                      >
                        Popular
                      </motion.span>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline gap-1 mt-[30px]">
                  <span className="text-gray text-black/50 font-bold tracking-tighter leading-none">
                    Free Tier Available
                  </span>
                </div>
                <button
                  className={twMerge(
                    "btn btn-primary w-full mt-[30px]",
                    inverse === true && "bg-white text-black"
                  )}
                >
                  {buttonText}
                </button>
                <ul className="flex flex-col gap-5 mt-8">
                  {features.map((feature, featureIndex) => (
                    <li
                      key={`feature-${tierIndex}-${featureIndex}`}
                      className="font-semibold text-black flex items-center gap-4"
                    >
                      <Check
                        className={twMerge(
                          "h6 w-6",
                          inverse === true && "text-white"
                        )}
                      />
                      <span
                        className={twMerge(
                          "text-black",
                          inverse === true && "text-white"
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
