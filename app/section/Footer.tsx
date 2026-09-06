"use client";

import { Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/qwenlogo.png";
import { MotionLink } from "@/app/components/ui/MotionLink";
import { Reveal } from "@/app/components/ui/Reveal";
import { CryptoGenLogo } from "../components/ui/CryptoGenLogo";

const footerLinks = {
  Product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/dashboard/shop" },
    { name: "Affiliate", href: "/affiliate" },
    { name: "Changelog", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "/contact" },
    { name: "Press", href: "#" },
  ],
  Resources: [
    { name: "How it Works", href: "/dashboard/help/works" },
    { name: "FAQ", href: "/dashboard/help/faq" },
    { name: "Support", href: "/dashboard/help/support" },
    { name: "Blog", href: "#" },
  ],
  Legal: [
    { name: "Terms of Service", href: "/legal" },
    { name: "Privacy Policy", href: "/legal" },
    { name: "Cookie Policy", href: "/legal" },
    { name: "Risk Disclosure", href: "/legal" },
  ],
};

const linkUnderline =
  "relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-indigo-600 after:transition-transform after:duration-300 hover:after:scale-x-100";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="container">
        {/* Top Section: Logo & Socials */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-12 border-b border-slate-100">
            <div className="max-w-sm">
              <Link href="/" className="group flex items-center gap-2.5 mb-4">
            <CryptoGenLogo size={32} withWordmark={false} />
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Crypto <span className="text-indigo-600">Gen</span>
            </span>
          </Link>
              <p className="text-sm text-slate-500 leading-relaxed">
                Institutional-grade AI trading algorithms, accessible to everyone. Trade
                smarter, not harder.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {[
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Youtube, href: "#" },
                { Icon: Linkedin, href: "#" },
              ].map(({ Icon, href }, index) => (
                <MotionLink
                  key={index}
                  href={href}
                  shine={false}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </MotionLink>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Middle Section: Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {Object.entries(footerLinks).map(([category, links], i) => (
            <Reveal key={category} delay={i * 0.08}>
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`inline-block text-sm text-slate-500 hover:text-indigo-600 transition-colors ${linkUnderline}`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Section: Copyright */}
        <Reveal delay={0.1}>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-slate-400">
              © {currentYear} CryptoGen Inc. All rights reserved.
            </p>
            <p className="text-xs text-slate-400 max-w-md text-center md:text-right">
              Trading cryptocurrency involves significant risk. Past performance is not
              indicative of future results.
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};