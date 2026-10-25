"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home, Phone, AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Route-level error boundary.
 *
 * The project previously had none, so any render error in a page produced the
 * default Next.js error screen with no way back into the site.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Surfaced in the host's log drain. The digest is the only safe correlation
    // id to show a user — the message itself may contain internal detail.
    console.error("[Karka] Unhandled route error:", error.message, error.digest);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center bg-[#F8FAFC] dark:bg-[#080C17] transition-colors py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl text-center">
        <span className="inline-flex w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 items-center justify-center text-amber-600 dark:text-amber-400">
          <AlertTriangle className="w-7 h-7" aria-hidden="true" />
        </span>

        <h1 className="mt-6 heading-section text-slate-900 dark:text-white text-balance">
          Something went wrong on our side
        </h1>

        <p className="mt-4 text-lead text-slate-600 dark:text-slate-400 font-body">
          This isn&apos;t your fault. Try again — and if it keeps happening, our team can
          help you directly on +91 9487530243.
        </p>

        {error.digest && (
          <p className="mt-3 font-mono text-xs text-slate-400 dark:text-slate-500">
            Reference: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Try again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200/80 dark:border-white/10 font-heading font-semibold text-sm transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Back to home</span>
          </Link>

          <a
            href="tel:+919487530243"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-indigo-600 dark:text-indigo-400 font-heading font-bold text-sm hover:underline cursor-pointer"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>Call us</span>
          </a>
        </div>
      </div>
    </div>
  );
}
