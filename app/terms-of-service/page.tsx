"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";

export default function TermsOfServicePage() {
  return (
    <div className="w-full flex flex-col">
      <section className="pt-20 pb-20 bg-white dark:bg-[#0C1230] transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white uppercase tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ultramarine/10 text-ultramarine dark:text-mint text-xs font-bold uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Terms &amp; Conditions</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white leading-tight">
              Terms of Service
            </h1>

            <div className="space-y-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-body pt-4">
              <p>
                By accessing this website or submitting an enrollment inquiry, you agree to these Terms of Service. If you do not agree, please discontinue use of the site.
              </p>

              <p>
                Submitting an inquiry through this site does not guarantee a seat in any program. Admission is confirmed only after our counseling and admission process is complete, per the specific program&apos;s requirements.
              </p>

              <p>
                Where offered, the Pay After Placement model is subject to a separate admission agreement signed at enrollment, which specifies eligibility conditions, payment triggers, and program-specific terms. The general description on this website is for informational purposes only.
              </p>

              <p>
                All content on this site — including course curricula, branding, graphics, and text — is the property of Karka AI Academy and may not be reproduced without permission.
              </p>

              <p>
                Placement statistics and hiring partner figures reflect historical outcomes and do not constitute a guarantee of employment for any individual student.
              </p>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm">
                <p>
                  Questions about these terms can be sent to{" "}
                  <a href="mailto:contact@karka.academy" className="text-ultramarine dark:text-mint font-semibold hover:underline">
                    contact@karka.academy
                  </a>{" "}
                  or call{" "}
                  <a href="tel:+919487530243" className="text-ultramarine dark:text-mint font-semibold hover:underline">
                    +91 9487530243
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
