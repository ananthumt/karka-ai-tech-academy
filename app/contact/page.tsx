"use client";

import React from "react";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageCircle,
  Clock,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/content/site";
import { LeadForm } from "@/components/LeadForm";
import { CtaBand } from "@/components/CtaBand";
import { useEnrollModal } from "@/components/EnrollContext";

export default function ContactPage() {
  const { openEnroll } = useEnrollModal();
  return (
    <div className="w-full flex flex-col">
      {/* Hero Header */}
      <section className="pt-20 pb-16 bg-[#0C1230] text-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-ultramarine/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-mint/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-mint text-xs font-bold uppercase tracking-wider border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>We&apos;d Love to Hear From You</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight text-white">
            Contact Us
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Align your ambition with market demand. Whether you&apos;re a student, parent, or corporate partner, our team is ready to help you find the right path.
          </p>
        </div>
      </section>

      {/* Advisory Cards Grid */}
      <section className="py-16 -mt-8 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Career Counselling */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-xl space-y-5 flex flex-col justify-between card-hover">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-ultramarine/10 text-ultramarine dark:bg-mint/10 dark:text-mint flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Free Career Counselling
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  Align your ambition with market demand. Navigating contemporary career trajectories requires data-driven foresight. Schedule an exploratory strategic session with our academic advisors to analyze your profile, review market metrics, and identify optimal learning pathways customized for your trajectory.
                </p>
              </div>

              <div>
                <button
                  onClick={() => openEnroll()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ultramarine hover:bg-ultramarine-600 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
                >
                  <span>Schedule Strategy Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Book a Call */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-xl space-y-5 flex flex-col justify-between card-hover">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-mint/20 text-mint flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Book a Call
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  Synchronize with our advisory team. We invite corporate partners and prospective applicants to schedule a direct advisory phone call at a time of absolute convenience. Let us address your queries regarding batch schedules, tailored curricula, corporate training frameworks, or financial options.
                </p>
              </div>

              <div>
                <a
                  href={SITE_CONFIG.phoneTel}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-navy-950 font-bold text-sm shadow-md transition-all hover:scale-105"
                >
                  <Phone className="w-4 h-4" />
                  <span>Select Date &amp; Time</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 lg:py-24 bg-[#F5F6FB] dark:bg-[#090D1A] transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-slate-900 dark:text-white">
              Get in touch with us
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 text-base">
              Whether you&apos;re a student ready to begin or a parent seeking clarity, reach out to us. We&apos;d love to talk.
            </p>
          </div>

          <LeadForm />
        </div>
      </section>

      {/* WhatsApp Corporate Desk & Regional Offices */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0C1230] transition-colors border-t border-slate-200/60 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* WhatsApp Desk */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-md flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-mint/20 text-mint flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  WhatsApp Corporate Desk
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  Instantaneous support channels. To reach our corporate support desk immediately for operational queries, admissions assistance, or priority technical support, please activate our real-time messaging link.
                </p>
              </div>

              <div>
                <a
                  href={SITE_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-mint hover:bg-mint-600 text-navy-950 font-bold text-sm shadow-md transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect to Support Desk</span>
                </a>
              </div>
            </div>

            {/* Regional Offices & Location */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 dark:bg-[#12193E] border border-slate-200/80 dark:border-white/10 shadow-md flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-ultramarine/10 text-ultramarine dark:bg-mint/10 dark:text-mint flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-slate-900 dark:text-white">
                  Regional Offices &amp; Location
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Corporate headquarters. For physical assessments, admissions registration, or direct engagement with our academic leadership team, you are welcome to visit our primary regional facilities.
                </p>

                <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <p>
                    <strong className="text-slate-900 dark:text-white">Corporate Address:</strong>{" "}
                    Nagercoil, Tamil Nadu, India
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">Inquiry Desk:</strong>{" "}
                    <a href={SITE_CONFIG.phoneTel} className="text-ultramarine dark:text-mint font-semibold hover:underline">
                      +91 9487530243
                    </a>
                  </p>
                  <p>
                    <strong className="text-slate-900 dark:text-white">Corporate Email:</strong>{" "}
                    <a href="mailto:contact@karka.academy" className="text-ultramarine dark:text-mint font-semibold hover:underline">
                      contact@karka.academy
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-navy-950 font-bold text-sm shadow-md transition-all hover:scale-105"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global CTA Band */}
      <CtaBand  />
    </div>
  );
}
