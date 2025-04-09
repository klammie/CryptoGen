import React from "react";
import { CallToAction } from "../section/CallToAction";
import { Footer } from "../section/Footer";
import { Hero } from "../section/Hero";
import { LogoTicker } from "../section/LogoTicker";
import { Pricing } from "../section/Pricing";
import { ProductShowcase } from "../section/ProductShowcase";
import { Testimonials } from "../section/Testimonials";
import { SwiftLogin } from "../section/SwiftLogin";

export default function Home() {
  return (
    <div className="bg-[#EAEEFE] mx-auto">
      <SwiftLogin />
      <Hero />
      <LogoTicker />
      <ProductShowcase />
      <Pricing />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
