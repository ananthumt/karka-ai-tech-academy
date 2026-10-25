"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legal &amp; Compliance</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-heading text-slate-900 dark:text-white leading-tight">
              Privacy Policy
            </h1>

            <div className="space-y-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-body pt-4">
              <p>
                When you submit an enrollment inquiry, contact form, or newsletter signup on this site, we collect the information you provide directly — such as your name, email address, phone/WhatsApp number, and the course or program you&apos;re interested in.
              </p>

              <p>
                We use the details you share to respond to your enquiry, provide course counseling, process admissions, and send relevant updates about our programs, placements, and events. We do not sell your personal information to third parties.
              </p>

              <p>
                Your information may be shared internally with our admissions and placement teams, and — where relevant to your placement support — with hiring partners you&apos;ve consented to be introduced to. We use third-party services (such as email and messaging providers) solely to deliver notifications related to your enquiry.
              </p>

              <p>
                We use Google Analytics to understand how visitors use our site so we can improve it. This may involve cookies that collect anonymized usage data.
              </p>

              <p>
                You can request access to, correction of, or deletion of your personal data at any time by contacting us using the details below.
              </p>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-sm">
                <p>
                  For any privacy-related questions, reach out at{" "}
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
