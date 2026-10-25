"use client";

import React from "react";
import { MessageCircle, Phone, ArrowUpRight } from "lucide-react";

export const HandoffButtons: React.FC = () => {
  return (
    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-2 font-heading">
      <a
        href="https://wa.me/919487530243?text=Hi,%20I%20have%20a%20few%20questions%20about%20Karka%20Academy."
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all active:scale-95"
        aria-label="Talk to Our Team on WhatsApp"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>Talk to Our Team</span>
        <ArrowUpRight className="w-3 h-3 opacity-80" />
      </a>
      <a
        href="tel:+919487530243"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-all active:scale-95"
        aria-label="Call Karka Admissions Team"
      >
        <Phone className="w-3.5 h-3.5" />
        <span>Call (+91 9487530243)</span>
      </a>
    </div>
  );
};
