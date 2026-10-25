"use client";

import React, { useId, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { SITE_CONFIG } from "@/content/site";
import { cn } from "@/lib/utils";

const OPENING_OPTIONS = ["1", "2-5", "6-10", "10+"] as const;
type OpeningOption = (typeof OPENING_OPTIONS)[number];

interface FormState {
  company: string;
  contact: string;
  email: string;
  phone: string;
  roles: string;
  openings: OpeningOption;
  message: string;
}

type FieldKey = keyof Omit<FormState, "openings">;
type FieldErrors = Partial<Record<FieldKey, string>>;

const INITIAL_STATE: FormState = {
  company: "",
  contact: "",
  email: "",
  phone: "",
  roles: "",
  openings: "1",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (form.company.trim().length < 2) {
    errors.company = "Please enter your company name (at least 2 characters).";
  }
  if (form.contact.trim().length < 2) {
    errors.contact = "Please enter the contact person's name (at least 2 characters).";
  }
  if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Please enter a valid work email address.";
  }
  // Mirrors the API: phone is reduced to [0-9+] and must keep 8+ characters.
  if (form.phone.replace(/[^0-9+]/g, "").length < 8) {
    errors.phone = "Please enter a valid phone number (at least 8 digits).";
  }
  if (form.roles.trim().length < 2) {
    errors.roles = "Tell us which role or roles you are hiring for.";
  }

  return errors;
}

export const HireFromUsForm: React.FC = () => {
  const uid = useId();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [whatsappFallback, setWhatsappFallback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  const fieldId = (key: string): string => `${uid}-${key}`;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key !== "openings" && fieldErrors[key as FieldKey]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[key as FieldKey];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isSubmitting) return;

    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setFormError("Please correct the highlighted fields and try again.");
      return;
    }

    setFormError(null);
    setWhatsappFallback(null);
    setIsSubmitting(true);

    // The API stores `name` (100 chars) and `program` (100 chars), so build
    // both deliberately rather than letting the server silently truncate.
    const leadName = `${form.contact.trim()} — ${form.company.trim()}`.slice(0, 100);
    const programSummary = [
      `Hiring: ${form.roles.trim()}`,
      `${form.openings} opening${form.openings === "1" ? "" : "s"}`,
      form.message.trim() ? `Note: ${form.message.trim()}` : null,
    ]
      .filter(Boolean)
      .join(" · ")
      .slice(0, 100);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadName,
          phone: form.phone.trim(),
          email: form.email.trim(),
          program: programSummary,
          source: "hire_from_us",
        }),
      });

      const payload = await res.json().catch(() => null);

      if (!res.ok) {
        // Surface the server's own copy for 400 / 429 / 503 instead of a
        // generic message, plus its WhatsApp fallback when one is provided.
        setFormError(
          payload?.error ||
            `Unable to submit your enquiry right now. Please email ${SITE_CONFIG.email} or call ${SITE_CONFIG.phone}.`
        );
        if (payload?.whatsappFallback) {
          setWhatsappFallback(payload.whatsappFallback);
        }
        return;
      }

      setConfirmation(
        payload?.message ||
          "Your hiring enquiry has been received. Our placement cell will be in touch shortly."
      );
      setForm(INITIAL_STATE);
    } catch {
      setFormError(
        `Network issue — your enquiry did not reach us. Please check your connection, or email ${SITE_CONFIG.email} directly.`
      );
      setWhatsappFallback(SITE_CONFIG.whatsappLink);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (key: FieldKey): string =>
    cn(
      "tech-input font-body",
      fieldErrors[key] && "border-rose-500 dark:border-rose-500/70"
    );

  const labelClass =
    "block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 font-heading";

  if (confirmation) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-lg p-8 sm:p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center mb-5">
          <CheckCircle2 className="w-7 h-7 stroke-[2.5]" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
          Enquiry received
        </h3>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-body max-w-xl mx-auto">
          {confirmation}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={SITE_CONFIG.phoneTel}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-sm shadow-lg shadow-indigo-600/25 cursor-pointer transition-all"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>Call {SITE_CONFIG.phone}</span>
          </a>
          <button
            type="button"
            onClick={() => setConfirmation(null)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200/80 dark:border-white/10 font-heading font-semibold text-sm cursor-pointer transition-all"
          >
            Submit another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-lg p-6 sm:p-10">
      <div className="mb-7">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-heading font-semibold uppercase tracking-wider mb-3.5">
          <Building2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <span>Recruiter enquiry</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Share your hiring requirement
        </h2>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-body">
          Tell us the role and we will share a shortlist of verified, portfolio-backed
          candidates. No placement fee, no lock-in.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {formError && (
          <div
            role="alert"
            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-400"
          >
            <TriangleAlert className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
            <div className="text-xs font-semibold font-body space-y-1.5">
              <p>{formError}</p>
              {whatsappFallback && (
                <a
                  href={whatsappFallback}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400 hover:underline font-heading cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Send this on WhatsApp instead</span>
                </a>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor={fieldId("company")} className={labelClass}>
              Company name <span aria-hidden="true">*</span>
            </label>
            <input
              id={fieldId("company")}
              name="company"
              type="text"
              autoComplete="organization"
              required
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              aria-invalid={Boolean(fieldErrors.company)}
              aria-describedby={fieldErrors.company ? fieldId("company-error") : undefined}
              className={inputClass("company")}
            />
            {fieldErrors.company && (
              <p
                id={fieldId("company-error")}
                role="alert"
                className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 font-body"
              >
                {fieldErrors.company}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fieldId("contact")} className={labelClass}>
              Contact person <span aria-hidden="true">*</span>
            </label>
            <input
              id={fieldId("contact")}
              name="contact"
              type="text"
              autoComplete="name"
              required
              value={form.contact}
              onChange={(e) => update("contact", e.target.value)}
              aria-invalid={Boolean(fieldErrors.contact)}
              aria-describedby={fieldErrors.contact ? fieldId("contact-error") : undefined}
              className={inputClass("contact")}
            />
            {fieldErrors.contact && (
              <p
                id={fieldId("contact-error")}
                role="alert"
                className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 font-body"
              >
                {fieldErrors.contact}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fieldId("email")} className={labelClass}>
              Work email <span aria-hidden="true">*</span>
            </label>
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? fieldId("email-error") : undefined}
              className={inputClass("email")}
            />
            {fieldErrors.email && (
              <p
                id={fieldId("email-error")}
                role="alert"
                className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 font-body"
              >
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fieldId("phone")} className={labelClass}>
              Phone <span aria-hidden="true">*</span>
            </label>
            <input
              id={fieldId("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={Boolean(fieldErrors.phone)}
              aria-describedby={fieldErrors.phone ? fieldId("phone-error") : undefined}
              className={inputClass("phone")}
            />
            {fieldErrors.phone && (
              <p
                id={fieldId("phone-error")}
                role="alert"
                className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 font-body"
              >
                {fieldErrors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fieldId("roles")} className={labelClass}>
              Role(s) hiring for <span aria-hidden="true">*</span>
            </label>
            <input
              id={fieldId("roles")}
              name="roles"
              type="text"
              required
              value={form.roles}
              onChange={(e) => update("roles", e.target.value)}
              aria-invalid={Boolean(fieldErrors.roles)}
              aria-describedby={fieldErrors.roles ? fieldId("roles-error") : undefined}
              className={inputClass("roles")}
            />
            {fieldErrors.roles && (
              <p
                id={fieldId("roles-error")}
                role="alert"
                className="mt-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 font-body"
              >
                {fieldErrors.roles}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fieldId("openings")} className={labelClass}>
              Number of openings
            </label>
            <select
              id={fieldId("openings")}
              name="openings"
              value={form.openings}
              onChange={(e) => update("openings", e.target.value as OpeningOption)}
              className="tech-input font-body cursor-pointer"
            >
              {OPENING_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "1" ? "1 opening" : `${opt} openings`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor={fieldId("message")} className={labelClass}>
            Anything else? <span className="font-normal normal-case tracking-normal text-slate-500 dark:text-slate-400">(optional)</span>
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className="tech-input font-body resize-y"
          />
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-body">
            Tech stack, location, CTC band or interview timeline — whatever helps us
            shortlist accurately.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-heading font-extrabold text-base shadow-lg shadow-indigo-600/25 cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#111A2E]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
              <span>Sending your enquiry…</span>
            </>
          ) : (
            <>
              <span>Send hiring enquiry</span>
              <Send className="w-5 h-5" aria-hidden="true" />
            </>
          )}
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-body">
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Used only to contact you about this hiring requirement.</span>
          </p>
          <a
            href={SITE_CONFIG.hireEmail}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline font-heading cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Prefer email? {SITE_CONFIG.email}</span>
          </a>
        </div>
      </form>
    </div>
  );
};
