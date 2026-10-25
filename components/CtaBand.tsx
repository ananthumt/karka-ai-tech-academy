"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Phone, ChevronRight } from "lucide-react";
import { CTA_BAND } from "@/content/site";
import { useEnrollModal } from "@/components/EnrollContext";

interface CtaBandProps {
  onOpenEnroll?: () => void;
}

export const CtaBand: React.FC<CtaBandProps> = ({ onOpenEnroll }) => {
  const { openEnroll } = useEnrollModal();
  const handleEnroll = onOpenEnroll || openEnroll;

  return (
    <section className="grain mesh-dark w-full py-24 sm:py-28 relative overflow-hidden bg-[#070B14] text-white border-t border-white/10">
      {/* Architectural grid, faded toward the edges */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_60%,transparent_100%)] deco"
        aria-hidden="true"
      />

      {/* Top hairline: a bright 1px seam reads as a light source edge */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent deco"
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full surface-glass !bg-white/[0.06] !border-white/15 text-indigo-200 text-[11px] font-heading font-bold uppercase tracking-[0.18em] mb-7">
          <Sparkles className="w-3.5 h-3.5 text-indigo-300" aria-hidden="true" />
          <span>Zero upfront tuition · Pay after placement</span>
        </div>

        <h2 className="heading-section text-white mb-5 text-balance">{CTA_BAND.title}</h2>

        <p className="text-lead text-slate-300/90 max-w-2xl mx-auto mb-9 font-body">
          {CTA_BAND.subtext}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={() => handleEnroll()}
            className="shine group w-full sm:w-auto px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-600 text-white font-heading font-bold shadow-[0_10px_30px_-8px_rgba(79,70,229,0.65)] ring-1 ring-inset ring-white/20 active:scale-[0.99] transition-all"
          >
            <span>{CTA_BAND.applyBtn}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5] arrow-nudge" aria-hidden="true" />
          </button>

          <Link
            href={CTA_BAND.exploreHref}
            className="group w-full sm:w-auto px-7 py-4 rounded-xl text-base flex items-center justify-center gap-2 cursor-pointer bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/15 backdrop-blur-md transition-all font-heading font-semibold"
          >
            <span>{CTA_BAND.exploreBtn}</span>
            <ChevronRight className="w-4 h-4 text-slate-300 arrow-nudge" aria-hidden="true" />
          </Link>
        </div>

        {/* Reassurance row — reduces CTA anxiety at the decision point */}
        <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-slate-400 font-body">
          {["No upfront payment", "No lock-in", "Free career counselling"].map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400/80"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
