import { redirect } from "next/navigation";
import { auth } from "./lib/auth";
import { Header } from "./section/Header";
import { Hero } from "./section/Hero";
import { LogoTicker } from "./section/LogoTicker";
import { ProductShowcase } from "./section/ProductShowcase";
import { Pricing } from "./section/Pricing";
import { Testimonials } from "./section/Testimonials";
import { CallToAction } from "./section/CallToAction";
import { Footer } from "./section/Footer";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect("/dashboard");
  }

  return (
    <div className="bg-[#EAEEFE] mx-auto">
      <Header />
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
