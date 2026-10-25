"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Send, CheckCircle2, Sparkles, MessageSquareQuote, ShieldCheck } from "lucide-react";
import { HOME_CONTENT } from "@/content/site";

export const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    program: "Full Stack Development",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMsg("Please enter your full name (at least 2 characters).");
      return;
    }

    const cleanDigits = formData.phone.replace(/[^0-9]/g, "");
    if (cleanDigits.length < 8) {
      setErrorMsg("Please enter a valid phone number with at least 8 digits.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "homepage_lead_form",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit form. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred. Please try again or WhatsApp us at +91 9487530243.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactData = HOME_CONTENT.contactSection;

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 lg:p-12 items-center">
        {/* Left: Form side (7 cols) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>FREE 1:1 CAREER COUNSELING</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
              {contactData.cardTitle}
            </h3>
            <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-body">
              {contactData.cardSubtext}
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white mx-auto flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                Session Booked Successfully!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-body">
                Our academic mentor will call you at <span className="font-semibold text-slate-900 dark:text-white">{formData.phone}</span> today.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", phone: "", program: "Full Stack Development" });
                  }}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline font-heading cursor-pointer"
                >
                  Book another counseling session
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 font-heading">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 font-heading">
                  Phone / WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9487530243"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-body"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 font-heading">
                  Preferred Program
                </label>
                <select
                  required
                  value={formData.program}
                  onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all font-body"
                >
                  {contactData.programs.map((p) => (
                    <option key={p} value={p} className="bg-slate-900 text-white">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl font-heading font-extrabold text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isSubmitting ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>{contactData.submitBtn}</span>
                      <Send className="w-5 h-5 text-white" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Authentic Mentor Attribution & Guidance Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4 shadow-lg text-center">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-slate-900">
              <Image
                src={contactData.mentorPhoto}
                alt="Sateesh Kumar, Founder and Ex-CTO of Karka Software Academy"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>1:1 Mentorship</span>
                </span>
                <p className="text-white text-xs font-semibold mt-1">Sateesh Kumar · Founder &amp; Ex-CTO</p>
              </div>
            </div>

            <div className="p-3 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 font-heading">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>{contactData.motivationLabel}</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white italic leading-relaxed font-body">
                &ldquo;{contactData.motivationQuote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
