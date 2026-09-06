"use client";

import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { MapPin, Phone, Clock, MoveRight } from "lucide-react";
import mapSnapshot from "@/public/assets/Screenshot 2025-03-07 142557.png";
import { Header } from "@/app/section/Header";
import { Footer } from "@/app/section/Footer";
import { Reveal } from "@/app/components/ui/Reveal";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition";

const info = [
  {
    Icon: MapPin,
    title: "Our Location",
    lines: ["6 Cork Rd, Carrigaline Middle,", "Carrigaline, Co. Cork, P43 HW98, Ireland"],
  },
  { Icon: Phone, title: "Phone", lines: ["+353 818 286 666"] },
  { Icon: Clock, title: "Support Hours", lines: ["24/7 — we're always here"] },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white antialiased">
      <Head>
        <title>Contact Us - CryptoGen</title>
        <meta
          name="description"
          content="Get in touch with CryptoGen. We'd love to hear from you."
        />
      </Head>

      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-100/50 rounded-full blur-3xl -z-10" />

          <div className="container relative z-10">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
                  Contact
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                  We&apos;re here to{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    help.
                  </span>
                </h1>
                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                  Questions, feedback, or support — our team typically replies within a
                  few hours.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Info + Form ── */}
        <section className="pb-24">
          <div className="container">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Info column */}
              <Reveal className="lg:col-span-2">
                <div className="flex flex-col gap-4 h-full">
                  {info.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/5 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                          <item.Icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-slate-900 mb-1">
                            {item.title}
                          </h3>
                          {item.lines.map((line) => (
                            <p key={line} className="text-sm text-slate-500 leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Map */}
                  <div className="rounded-2xl border border-slate-200 overflow-hidden">
                    <Image
                      src={mapSnapshot}
                      alt="Map — CryptoGen HQ, Carrigaline, Ireland"
                      className="w-full h-56 object-cover grayscale hover:grayscale-0 transition duration-500"
                    />
                  </div>
                </div>
              </Reveal>

              {/* Form column */}
              <Reveal delay={0.1} className="lg:col-span-3">
                <form
                  onSubmit={handleSubmit}
                  className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-xl shadow-slate-900/5 h-full flex flex-col"
                >
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
                    Send us a message
                  </h2>
                  <p className="text-sm text-slate-500 mb-8">
                    Fill in the details below and we&apos;ll get back to you shortly.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="How can we help?"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="group relative mt-auto inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
                    />
                    Send Message
                    <MoveRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <Toaster richColors position="bottom-left" />
    </div>
  );
}