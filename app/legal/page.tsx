"use client";

import Head from "next/head";
import { useEffect, useState, type ReactNode } from "react";
import { AlertTriangle, Mail, MapPin, ShieldCheck } from "lucide-react";
import { Header } from "@/app/section/Header";
import { Footer } from "@/app/section/Footer";
import { Reveal } from "@/app/components/ui/Reveal";

// ── Document meta ────────────────────────────────────────────────────────────
// Edit this to your document's actual revision date
const LAST_UPDATED = "1 March 2025";

// Serif stack for long-form legal body text (headings/UI stay sans-serif)
const SERIF = "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, Georgia, serif";

const SECTIONS = [
  { id: "general-disclaimer", number: "01", title: "General Disclaimer" },
  { id: "terms-of-service", number: "02", title: "Terms of Service" },
  { id: "privacy-policy", number: "03", title: "Privacy Policy" },
  { id: "risk-disclosure", number: "04", title: "Risk Disclosure" },
  { id: "aml-policy", number: "05", title: "Anti-Money Laundering (AML) Policy" },
  { id: "intellectual-property", number: "06", title: "Copyright & Intellectual Property" },
  { id: "governing-law", number: "07", title: "Governing Law" },
  { id: "contact-information", number: "08", title: "Contact Information" },
];

// ── Typography primitives ────────────────────────────────────────────────────
function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-[16px] leading-[1.8] text-slate-600" style={{ fontFamily: SERIF }}>
      {children}
    </p>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3.5 text-[16px] leading-[1.8] text-slate-600"
          style={{ fontFamily: SERIF }}
        >
          <span className="mt-[15px] h-px w-4 flex-shrink-0 bg-indigo-300" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-amber-200/80 bg-amber-50/70 px-5 py-4">
      <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-amber-800">
        <AlertTriangle className="h-4 w-4" />
        {title}
      </p>
      <div
        className="text-[15px] leading-[1.75] text-amber-900/80"
        style={{ fontFamily: SERIF }}
      >
        {children}
      </div>
    </div>
  );
}

function SectionBlock({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 mb-14 last:mb-0">
      <div className="mb-6 flex items-baseline gap-3 border-b border-slate-200 pb-4">
        <span className="text-sm font-bold tabular-nums text-indigo-600">{number}</span>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-[22px]">
          {title}
        </h2>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function LegalPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  // Scroll-spy for the table of contents
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-140px 0px -65% 0px" }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white antialiased">
      <Head>
        <title>Legal Information - CryptoGen</title>
        <meta
          name="description"
          content="CryptoGen legal information: terms of service, privacy policy, risk disclosure, AML policy and more."
        />
      </Head>

      <Header />

      <main>
        {/* ── Document header ── */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50/70 pb-14 pt-20 md:pb-16 md:pt-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

          <div className="container relative z-10">
            <Reveal>
              <div className="max-w-3xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  <ShieldCheck className="h-3 w-3" />
                  Legal & Compliance
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                  Legal Information
                </h1>

                <p
                  className="mt-5 text-[17px] leading-[1.8] text-slate-600"
                  style={{ fontFamily: SERIF }}
                >
                  This document outlines the terms, policies and disclosures that govern
                  your use of CryptoGen. Please read it carefully before using the
                  platform.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-slate-500">
                  <span>
                    Last updated:{" "}
                    <strong className="font-semibold text-slate-700">{LAST_UPDATED}</strong>
                  </span>
                  <span className="hidden h-3 w-px bg-slate-300 sm:block" />
                  <span>Version 2.0</span>
                  <span className="hidden h-3 w-px bg-slate-300 sm:block" />
                  <span>Applies to all CryptoGen services</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Body: TOC + content ── */}
        <section className="py-14 md:py-20">
          <div className="container">
            {/* Mobile TOC chips */}
            <div className="mb-10 flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-colors ${
                    activeId === s.id
                      ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-white text-slate-500"
                  }`}
                >
                  {s.number} · {s.title}
                </a>
              ))}
            </div>

            <div className="grid gap-12 lg:grid-cols-[250px_minmax(0,1fr)] xl:gap-16">
              {/* Desktop TOC sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    On this page
                  </p>
                  <nav className="flex flex-col gap-0.5 border-l border-slate-200">
                    {SECTIONS.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className={`-ml-px border-l-2 py-1.5 pl-4 text-[13px] leading-snug transition-colors ${
                          activeId === s.id
                            ? "border-indigo-600 font-semibold text-indigo-600"
                            : "border-transparent text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {s.title}
                      </a>
                    ))}
                  </nav>

                  {/* Help card */}
                  <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <ShieldCheck className="mb-3 h-5 w-5 text-indigo-600" />
                    <p className="mb-1 text-sm font-semibold text-slate-900">Questions?</p>
                    <p className="mb-3 text-[13px] leading-relaxed text-slate-500">
                      Contact our legal team for clarification on any policy in this
                      document.
                    </p>
                    <a
                      href="mailto:legal@cryptogen.com"
                      className="text-[13px] font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                    >
                      legal@cryptogen.com
                    </a>
                  </div>
                </div>
              </aside>

              {/* Document content */}
              <div className="max-w-3xl">
                <Reveal>
                  <SectionBlock id="general-disclaimer" number="01" title="General Disclaimer">
                    <P>
                      CryptoGen is committed to providing accurate and timely information
                      regarding cryptocurrency trading. However, we do not guarantee the
                      completeness or accuracy of the content. Cryptocurrency trading
                      involves risk, and you should conduct your own research before
                      making any trading decisions. CryptoGen will not be held liable for
                      any losses incurred.
                    </P>
                  </SectionBlock>
                </Reveal>

                <Reveal>
                  <SectionBlock id="terms-of-service" number="02" title="Terms of Service">
                    <P>
                      By using our platform, you agree to our Terms of Service. These terms
                      outline your rights and responsibilities while using CryptoGen&apos;s
                      services. They cover account registration, trading activities,
                      prohibited actions, and dispute resolution.
                    </P>
                    <Bullets
                      items={[
                        "Users must be at least 18 years old.",
                        "Only one account per device is allowed for security reasons.",
                        "Users are responsible for maintaining the confidentiality of their account information.",
                        "Any violations of our terms may result in account suspension or termination.",
                      ]}
                    />
                  </SectionBlock>
                </Reveal>

                <Reveal>
                  <SectionBlock id="privacy-policy" number="03" title="Privacy Policy">
                    <P>
                      Your privacy is important to us. Our Privacy Policy explains how we
                      collect, use, and protect your personal information. We comply with
                      all relevant data protection regulations and ensure that your data is
                      handled securely.
                    </P>
                    <Bullets
                      items={[
                        "We collect information to provide and improve our services.",
                        "Your data is never sold to third parties.",
                        "You have the right to access, modify, and delete your personal information.",
                      ]}
                    />
                  </SectionBlock>
                </Reveal>

                <Reveal>
                  <SectionBlock id="risk-disclosure" number="04" title="Risk Disclosure">
                    <P>
                      Trading cryptocurrencies involves substantial risk and is not
                      suitable for every investor. The value of cryptocurrencies can
                      fluctuate significantly, leading to potential losses. You should only
                      trade with money you can afford to lose.
                    </P>
                    <Callout title="Important">
                      <ul className="list-disc space-y-1.5 pl-5">
                        <li>Past performance is not indicative of future results.</li>
                        <li>
                          Consider consulting a financial advisor before engaging in
                          trading activities.
                        </li>
                      </ul>
                    </Callout>
                  </SectionBlock>
                </Reveal>

                <Reveal>
                  <SectionBlock id="aml-policy" number="05" title="Anti-Money Laundering (AML) Policy">
                    <P>
                      CryptoGen is committed to preventing money laundering and terrorist
                      financing. We comply with all applicable AML laws and regulations and
                      have implemented robust procedures to detect and prevent suspicious
                      activities.
                    </P>
                    <Bullets
                      items={[
                        "User verification processes.",
                        "Monitoring and reporting of suspicious transactions.",
                        "Regular audits and compliance checks.",
                      ]}
                    />
                  </SectionBlock>
                </Reveal>

                <Reveal>
                  <SectionBlock
                    id="intellectual-property"
                    number="06"
                    title="Copyright & Intellectual Property"
                  >
                    <P>
                      All content on the CryptoGen website, including text, graphics,
                      logos, and images, is the property of CryptoGen or its licensors and
                      is protected by copyright laws. Unauthorized use of our content is
                      strictly prohibited.
                    </P>
                    <Bullets
                      items={[
                        "You may not reproduce, distribute, or create derivative works from our content without explicit permission.",
                      ]}
                    />
                  </SectionBlock>
                </Reveal>

                <Reveal>
                  <SectionBlock id="governing-law" number="07" title="Governing Law">
                    <P>
                      These legal terms are governed by and construed in accordance with
                      the laws of Ireland. Any disputes arising from these terms will be
                      resolved through binding arbitration in Ireland.
                    </P>
                  </SectionBlock>
                </Reveal>

                <Reveal>
                  <SectionBlock id="contact-information" number="08" title="Contact Information">
                    <P>
                      For any questions or concerns regarding our legal information, please
                      contact us at:
                    </P>

                    <div className="grid gap-4 pt-2 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-200">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50">
                          <Mail className="h-4 w-4 text-indigo-600" />
                        </div>
                        <p className="mb-1 text-[13px] font-semibold text-slate-900">Email</p>
                        <a
                          href="mailto:legal@cryptogen.com"
                          className="text-[14px] text-indigo-600 transition-colors hover:text-indigo-700"
                        >
                          legal@cryptogen.com
                        </a>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-200">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50">
                          <MapPin className="h-4 w-4 text-indigo-600" />
                        </div>
                        <p className="mb-1 text-[13px] font-semibold text-slate-900">Address</p>
                        <p className="text-[14px] leading-relaxed text-slate-600">
                          6 Cork Rd, Carrigaline Middle,
                          <br />
                          Carrigaline, Co. Cork,
                          <br />
                          P43 HW98, Ireland
                        </p>
                      </div>
                    </div>
                  </SectionBlock>
                </Reveal>

                {/* Back to top */}
                <div className="mt-16 border-t border-slate-200 pt-6">
                  <a
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-[13px] font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
                  >
                    ↑ Back to top
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}