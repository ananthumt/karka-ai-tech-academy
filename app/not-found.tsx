import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Compass, Home, Phone, BookOpen, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/content/site";

export const metadata: Metadata = {
  title: "Page Not Found | Karka AI & Tech Academy",
  robots: { index: false, follow: true },
};

const SUGGESTIONS = [
  { href: "/", label: "Home", desc: "Start from the beginning", icon: Home },
  { href: "/courses", label: "All 26 Courses", desc: "Browse every program", icon: BookOpen },
  {
    href: "/course-finder",
    label: "Course Finder",
    desc: "60-second match quiz",
    icon: Compass,
  },
  { href: "/contact", label: "Contact", desc: "Talk to an advisor", icon: Phone },
];

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center bg-[#F8FAFC] dark:bg-[#080C17] transition-colors py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          Error 404
        </p>

        <h1 className="mt-4 heading-hero text-slate-900 dark:text-white text-balance">
          We can&apos;t find that page
        </h1>

        <p className="mt-5 text-lead text-slate-600 dark:text-slate-400 font-body max-w-xl mx-auto">
          The link may be out of date or mistyped. Here are the places people usually
          want.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {SUGGESTIONS.map(({ href, label, desc, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span className="w-11 h-11 shrink-0 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-heading font-bold text-slate-900 dark:text-white">
                  {label}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 font-body">
                  {desc}
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-heading font-bold">
          <a
            href={SITE_CONFIG.phoneTel}
            className="inline-flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>{SITE_CONFIG.phone}</span>
          </a>
          <a
            href={SITE_CONFIG.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>WhatsApp us</span>
          </a>
        </div>
      </div>
    </div>
  );
}
