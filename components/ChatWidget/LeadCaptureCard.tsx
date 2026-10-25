"use client";

import React, { useState } from "react";
import { UserCheck, X, Send, Loader2, MessageCircle } from "lucide-react";
import { CATEGORIES_CONFIG } from "@/content/site";

interface LeadCaptureCardProps {
  onDismiss: () => void;
  onSubmitSuccess: () => void;
}

/**
 * Track options offered in the card. Previously hard-coded to three strings
 * that did not match any real category, so the admissions team could not tell
 * which of the 26 programs a lead actually wanted.
 */
const PROGRAM_OPTIONS = [
  "Not sure yet — need guidance",
  ...CATEGORIES_CONFIG.map((c) => c.name),
];

export const LeadCaptureCard: React.FC<LeadCaptureCardProps> = ({
  onDismiss,
  onSubmitSuccess,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState(PROGRAM_OPTIONS[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappFallback, setWhatsappFallback] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!name.trim() || name.trim().length < 2) {
      setError("Please provide your full name (at least 2 characters).");
      return;
    }

    const cleanDigits = phone.replace(/[^0-9]/g, "");
    if (cleanDigits.length < 8) {
      setError("Please enter a valid phone number with at least 8 digits.");
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("That email address doesn't look right. Leave it blank if you prefer.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setWhatsappFallback(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          // The API accepts an email; the card previously never sent one.
          email: email.trim() || undefined,
          program,
          source: "chatbot_widget",
        }),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        // Surface the server's own copy (rate-limit, validation, storage
        // outage) instead of discarding it behind a generic string.
        setError(
          payload?.error ||
            "Unable to submit right now. Please try calling +91 9487530243."
        );
        if (payload?.whatsappFallback) setWhatsappFallback(payload.whatsappFallback);
        return;
      }

      onSubmitSuccess();
    } catch {
      setError("Network issue — please check your connection or call +91 9487530243.");
      setWhatsappFallback("https://wa.me/919487530243");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-2.5 py-1.5 text-xs rounded-xl bg-white dark:bg-[#0C1230] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-body";

  return (
    <div className="p-3.5 my-2 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40 shadow-sm space-y-2.5">
      <div className="flex items-center justify-between font-heading">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
            <UserCheck className="w-3 h-3" />
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            Want 1-on-1 Mentor Guidance?
          </span>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Skip lead form"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-[11px] text-slate-600 dark:text-slate-400 font-body">
        Leave your contact details to speak directly with an academic mentor. No spam, and
        your details are only used to arrange your counselling call.
      </p>

      {error && (
        <div role="alert" className="space-y-1.5">
          <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium font-body">
            {error}
          </p>
          {whatsappFallback && (
            <a
              href={whatsappFallback}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline font-heading"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Message us on WhatsApp instead</span>
            </a>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2 font-heading">
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            placeholder="Your Name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            aria-label="Your full name"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            aria-label="Your phone number"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email (optional)"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          aria-label="Your email address, optional"
        />

        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          aria-label="Track you are interested in"
        >
          {PROGRAM_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                <span>Request Call</span>
                <Send className="w-3 h-3" />
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
          >
            Skip for now
          </button>
        </div>
      </form>
    </div>
  );
};
