"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  Briefcase,
  Trophy,
  Check,
  Star,
  Info,
} from "lucide-react";
import { HOME_CONTENT } from "@/content/site";
import { useEnrollModal } from "@/components/EnrollContext";

const TIMELINE_STEPS = [
  {
    step: "01",
    title: "Zero Upfront Admission",
    desc: "Complete our evaluation and start learning without paying a single rupee in tuition. We absorb all upfront training costs.",
    highlight: "₹0 Down Payment",
  },
  {
    step: "02",
    title: "AI-First Practical Bootcamp",
    desc: "Master modern fullstack architectures, generative AI tools, and production engineering with daily in-person mentor feedback.",
    highlight: "Daily Industry Mentorship",
  },
  {
    step: "03",
    title: "Agile Tribers Incubation",
    desc: "Work on live client apps and open-source platforms. Graduate with a production-tested GitHub portfolio.",
    highlight: "Verified Internship Cert",
  },
  {
    step: "04",
    title: "1-on-1 Placement Sprints",
    desc: "ATS-optimized resumes, DSA problem-solving drills, and technical mock interviews connecting directly to 50+ hiring partners.",
    highlight: "Direct Hiring Pipeline",
  },
  {
    step: "05",
    title: "Job Offer & ₹40K Fixed Fee",
    desc: "Under Step 8 of our transparent roadmap, you only pay a flat ₹40,000 fee once you receive and accept your verifiable tech job offer.",
    highlight: "No Perpetual Salary Cuts",
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Upfront Tuition Cost",
    traditional: "₹50,000 – ₹1,50,000 upfront",
    karka: "₹0 Upfront (Zero Tuition Risk)",
  },
  {
    feature: "When You Pay",
    traditional: "Before training even starts",
    karka: "Only after securing a tech job offer",
  },
  {
    feature: "Payment Structure",
    traditional: "Fixed upfront or high-interest EMI",
    karka: "Flat ₹40,000 fee under Step 8 (No % cuts)",
  },
  {
    feature: "Hands-on Experience",
    traditional: "Toy sandbox tasks & slides",
    karka: "Live incubation projects at Agile Tribers",
  },
  {
    feature: "Curriculum Standard",
    traditional: "Static decades-old syntax",
    karka: "AI-native tools, LLM workflows & prompt eng.",
  },
  {
    feature: "Placement Commitment",
    traditional: "Self-serve job links / no accountability",
    karka: "100% Learn Till Placed dedicated support",
  },
];

export const PayAfterPlacementExperience: React.FC = () => {
  const { openEnroll } = useEnrollModal();
  const [activeStep, setActiveStep] = useState(0);
  const [degreeStatus, setDegreeStatus] = useState("graduate");
  const [stream, setStream] = useState("eng");

  const payData = HOME_CONTENT.payAfterHired;

  return (
    <div className="w-full space-y-16">
      {/* 1. Header & Quick Value Proposition */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-200/60 dark:border-indigo-800/50">
          <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
          <span>Transparent Financial Accountability</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
          How Our <span className="text-indigo-600 dark:text-indigo-400">Pay After Placement</span> Works
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-body">
          We believe high-quality engineering education should align with student success. You focus 100% on building software; we carry the financial risk until you get hired.
        </p>
      </div>

      {/* 2. Interactive 5-Step Process Timeline */}
      <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-xl space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Step-by-Step Pathway</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-heading">
              Your Journey from Zero to Tech Offer
            </h3>
          </div>
          <div className="flex items-center gap-2" role="tablist" aria-label="Roadmap stages">
            {TIMELINE_STEPS.map((s, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={activeStep === idx}
                aria-label={`Step ${s.step}: ${s.title}`}
                onClick={() => setActiveStep(idx)}
                className={`w-9 h-9 rounded-xl font-mono text-xs font-black transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer ${
                  activeStep === idx
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10"
                }`}
              >
                {s.step}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Step Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200/60 dark:border-indigo-800/50">
              <span>Stage {TIMELINE_STEPS[activeStep].step} of 05</span>
              <span>•</span>
              <span>{TIMELINE_STEPS[activeStep].highlight}</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
              {TIMELINE_STEPS[activeStep].title}
            </h4>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-body">
              {TIMELINE_STEPS[activeStep].desc}
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-50 dark:bg-[#0B1120] border border-slate-200/80 dark:border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Key Guarantee</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white font-heading">
              Under Step 8 of our curriculum, the only course payment is a flat ₹40,000 fee payable strictly after you land a job.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-body">
              No salary sharing agreements, no perpetual percentage deductions, and zero hidden penalties.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Side-by-Side Comparison: Traditional Institutes vs Karka */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-heading">
            Traditional Institutes vs. Karka Pay After Placement
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-body">
            Compare why students choose Karka over paying upfront tuition elsewhere.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#111A2E] shadow-xl">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-white/5">
                <th className="p-4 sm:p-5 font-bold text-slate-700 dark:text-slate-200 text-xs uppercase tracking-wider font-heading">
                  Feature / Parameter
                </th>
                <th className="p-4 sm:p-5 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-heading">
                  Traditional Institutes
                </th>
                <th className="p-4 sm:p-5 font-black text-indigo-700 dark:text-indigo-300 text-xs uppercase tracking-wider bg-indigo-50/50 dark:bg-indigo-950/30 font-heading">
                  Karka AI & Tech Academy
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 font-medium font-body">
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-slate-800 dark:text-slate-200">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{row.traditional}</span>
                  </td>
                  <td className="p-4 sm:p-5 text-slate-900 dark:text-white font-bold bg-indigo-50/30 dark:bg-indigo-950/20">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span>{row.karka}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Interactive Eligibility Checker Widget & Advisory CTA */}
      <div className="p-8 sm:p-12 rounded-2xl bg-[#0B1120] border border-white/10 text-white shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider mb-2 font-heading">
                Instant Check
              </span>
              <h3 className="text-2xl sm:4xl font-black font-heading leading-tight text-white">
                Are You Eligible for ₹0 Upfront Tuition?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-300 font-body">
                Answer two quick questions to confirm your Pay After Placement qualification.
              </p>
            </div>

            <div className="space-y-4 font-body">
              {/* Question 1: Graduation Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-heading">
                  1. Current Status:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    aria-pressed={degreeStatus === "graduate"}
                    onClick={() => setDegreeStatus("graduate")}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all text-left font-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer ${
                      degreeStatus === "graduate"
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    College Graduate / Final Year
                  </button>
                  <button
                    type="button"
                    aria-pressed={degreeStatus === "switcher"}
                    onClick={() => setDegreeStatus("switcher")}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all text-left font-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer ${
                      degreeStatus === "switcher"
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    Working / Career Switcher
                  </button>
                </div>
              </div>

              {/* Question 2: Degree Stream */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 font-heading">
                  2. Educational Stream:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    aria-pressed={stream === "eng"}
                    onClick={() => setStream("eng")}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all text-center font-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer ${
                      stream === "eng"
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    B.E / B.Tech
                  </button>
                  <button
                    type="button"
                    aria-pressed={stream === "cs"}
                    onClick={() => setStream("cs")}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all text-center font-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer ${
                      stream === "cs"
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    BCA / B.Sc IT
                  </button>
                  <button
                    type="button"
                    aria-pressed={stream === "arts"}
                    onClick={() => setStream("arts")}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all text-center font-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer ${
                      stream === "arts"
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/30"
                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    Arts / Science / Other
                  </button>
                </div>
              </div>
            </div>

            {/* Instant Result Box */}
            <div className="p-4 rounded-xl bg-[#111A2E] border border-indigo-500/30 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0 stroke-[2.5]" />
              <div>
                <p className="text-sm font-black text-white font-heading">
                  Eligible for Pay After Placement!
                </p>
                <p className="text-xs text-slate-300 font-body">
                  Zero tuition upfront during training. Flat ₹40,000 fee applies strictly after tech placement.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Advisor Callout */}
          <div className="lg:col-span-5 p-8 rounded-2xl bg-[#111A2E] border border-white/15 text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 mx-auto flex items-center justify-center font-black shadow-lg">
              <Sparkles className="w-7 h-7 text-indigo-400" />
            </div>
            <div>
              <h4 className="text-xl font-black text-white font-heading">
                Confirm Your Eligibility
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed font-body">
                Speak directly with an academic advisor to discuss upcoming batch timings, offline lab access in Nagercoil, and contract terms.
              </p>
            </div>

            <div className="space-y-3 font-heading">
              <button
                type="button"
                onClick={() => openEnroll("Pay After Placement Eligibility")}
                className="w-full py-4 px-6 rounded-xl text-sm font-extrabold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
              >
                Apply for Zero Upfront Seat
              </button>
              <a
                href="https://wa.me/919487530243?text=Hi%20Karka%20Admissions,%20I%20want%20to%20verify%20my%20Pay%20After%20Placement%20eligibility"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full py-3 px-6 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Ask via WhatsApp (+91 9487530243)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
