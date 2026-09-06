import { redirect } from "next/navigation";
import { auth } from "./lib/auth";
import { PageEnter } from "@/app/components/ui/PageEnter";
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
    <PageEnter>
      <div className="min-h-screen bg-white antialiased">
        <Header />
        <main>
          <Hero />
          <LogoTicker />
          <ProductShowcase />
          <Pricing />
          <Testimonials />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </PageEnter>
  );
}