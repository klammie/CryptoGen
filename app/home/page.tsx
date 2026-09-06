import { redirect } from "next/navigation";
import { auth } from "../lib/auth";
import { PageEnter } from "../components/ui/PageEnter";
import { Header } from "../section/Header";
import { CallToAction } from "../section/CallToAction";
import { Footer } from "../section/Footer";
import { Hero } from "../section/Hero";
import { LogoTicker } from "../section/LogoTicker";
import { Pricing } from "../section/Pricing";
import { ProductShowcase } from "../section/ProductShowcase";
import { Testimonials } from "../section/Testimonials";

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
