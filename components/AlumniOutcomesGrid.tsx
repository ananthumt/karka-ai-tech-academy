"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  Users,
  CheckCircle2,
} from "lucide-react";

interface AlumniStory {
  name: string;
  role: string;
  company: string;
  companyLogo: string;
  package: string;
  image?: string;
  initials: string;
  tag: string;
  accentBg: string;
  accentText: string;
}

const VERIFIED_ALUMNI: AlumniStory[] = [
  {
    name: "Gabriel Samraj",
    role: "Frontend Developer",
    company: "Capecom Solutions",
    companyLogo: "/assets/capecom.webp",
    package: "7.2 LPA",
    image: "/assets/gabriel-avatar.webp",
    initials: "GS",
    tag: "CAMPUS PLACEMENT",
    accentBg: "from-blue-600 to-indigo-700",
    accentText: "text-blue-400",
  },
  {
    name: "Prabin Kumar",
    role: "Fullstack Engineer",
    company: "Novac Technology",
    companyLogo: "/assets/novac.webp",
    package: "8.5 LPA",
    image: "/assets/prabin-avatar.webp",
    initials: "PK",
    tag: "AGILE TRIBERS ALUM",
    accentBg: "from-emerald-600 to-teal-800",
    accentText: "text-emerald-400",
  },
  {
    name: "Shiju Raj",
    role: "AI Software Engineer",
    company: "Sodisys Infotech",
    companyLogo: "/assets/sodisys.webp",
    package: "6.8 LPA",
    image: "/assets/shiju-avatar.webp",
    initials: "SR",
    tag: "AI TRACK",
    accentBg: "from-purple-600 to-indigo-800",
    accentText: "text-purple-400",
  },
  {
    name: "Kishore M",
    role: "React Developer",
    company: "Flow Global",
    companyLogo: "/assets/flow.webp",
    package: "7.5 LPA",
    image: "/assets/kishore-avatar.webp",
    initials: "KM",
    tag: "PAY AFTER PLACEMENT",
    accentBg: "from-cyan-600 to-blue-800",
    accentText: "text-cyan-400",
  },
  {
    name: "Sridevi S",
    role: "UI/UX Designer",
    company: "HCL Tech",
    companyLogo: "/assets/hcl.webp",
    package: "6.5 LPA",
    image: "/assets/sridevi-avatar.webp",
    initials: "SS",
    tag: "PRODUCT DESIGN",
    accentBg: "from-fuchsia-600 to-pink-800",
    accentText: "text-fuchsia-400",
  },
  {
    name: "Anand R",
    role: "Backend Architect",
    company: "TCS Digital",
    companyLogo: "/assets/tcs.webp",
    package: "9.0 LPA",
    image: "/assets/anand-avatar.webp",
    initials: "AR",
    tag: "ENTERPRISE JAVA",
    accentBg: "from-amber-600 to-orange-800",
    accentText: "text-amber-400",
  },
];

export const AlumniOutcomesGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = React.useState("All");

  const filteredAlumni = React.useMemo(() => {
    if (activeFilter === "All") return VERIFIED_ALUMNI;
    if (activeFilter === "Fullstack") {
      return VERIFIED_ALUMNI.filter(
        (a) =>
          a.role.includes("Frontend") ||
          a.role.includes("Fullstack") ||
          a.role.includes("React")
      );
    }
    if (activeFilter === "AI & Backend") {
      return VERIFIED_ALUMNI.filter(
        (a) => a.role.includes("AI") || a.role.includes("Backend")
      );
    }
    if (activeFilter === "UI/UX Design") {
      return VERIFIED_ALUMNI.filter(
        (a) => a.role.includes("Design") || a.role.includes("UI/UX")
      );
    }
    return VERIFIED_ALUMNI;
  }, [activeFilter]);

  const FILTERS = ["All", "Fullstack", "AI & Backend", "UI/UX Design"];

  return (
    <div className="space-y-10">
      {/* Authentic Karka Placement Celebration Banner */}
      <div className="rounded-2xl bg-white dark:bg-[#0B1120] border border-slate-200/90 dark:border-white/10 p-6 sm:p-8 lg:p-10 shadow-lg dark:shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Authentic Campus Image (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-slate-900 group">
              <Image
                src="/assets/alumni-celebration.webp"
                alt="Karka AI & Tech Academy Real Student Placement and Offer Letter Day Celebrations"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B1120]/90 backdrop-blur-md border border-white/15 text-[11px] font-heading font-bold text-indigo-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Nagercoil Campus Batch</span>
                </span>
                <span className="text-[11px] text-slate-300 font-mono">Real Placement Wall</span>
              </div>
            </div>
          </div>

          {/* Context & Verified Metrics (7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-heading font-semibold text-indigo-700 dark:text-indigo-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>AUTHENTIC GRADUATION COHORTS</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-900 dark:text-white leading-tight">
              Real Students. Real Hiring Letters. Verified Careers.
            </h3>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-body">
              Every graduate showcased here completed rigorous hands-on sprints, production code reviews, and live internship deployments at Agile Tribers before securing their industry placement.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                <div className="text-xl sm:text-2xl font-black font-heading text-indigo-600 dark:text-indigo-400">650+</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Placed Candidates</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                <div className="text-xl sm:text-2xl font-black font-heading text-slate-900 dark:text-white">50+</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Hiring Partners</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10">
                <div className="text-xl sm:text-2xl font-black font-heading text-indigo-600 dark:text-indigo-400">₹0</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Tuition Until Hired</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none font-heading">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeFilter === f
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-105"
                : "bg-white dark:bg-[#111A2E] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10"
            }`}
          >
            {f === "All" ? "All Alumni Records" : f}
          </button>
        ))}
      </div>

      {/* Verified Alumni Outcome Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alumnus, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-[#0B1120] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Header: Tag + Company Logo */}
              <div className="flex items-center justify-between gap-3 mb-5">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10">
                  {alumnus.tag}
                </span>

                <div className="relative h-6 w-20 flex items-center justify-end">
                  <Image
                    src={alumnus.companyLogo}
                    alt={`${alumnus.company} logo`}
                    fill
                    sizes="80px"
                    className="object-contain object-right dark:brightness-125"
                  />
                </div>
              </div>

              {/* Profile Avatar / Verified Monogram + Name */}
              <div className="flex items-center gap-3.5 mb-5">
                {alumnus.image ? (
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-white/15 shrink-0 shadow-sm">
                    <Image
                      src={alumnus.image}
                      alt={`${alumnus.name} - Karka Graduate`}
                      fill
                      sizes="48px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${alumnus.accentBg} text-white flex items-center justify-center font-heading font-black text-sm tracking-wider shrink-0 shadow-md border border-white/20`}
                  >
                    {alumnus.initials}
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white font-heading">
                    {alumnus.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-body">
                    {alumnus.role}
                  </p>
                </div>
              </div>

              {/* Company & Compensation Details */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold font-body">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{alumnus.company}</span>
                </div>

                <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-black font-mono">
                  <span>{alumnus.package}</span>
                </div>
              </div>
            </div>

            {/* Verified Indicator Footer */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Placement
              </span>
              <span className="font-mono text-[10px]">Karka Cohort Alum</span>
            </div>
          </div>
        ))}
      </div>

      {/* Direct link to Full Placement Records */}
      <div className="text-center pt-2">
        <Link
          href="/placement"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 active:scale-[0.99] transition-all cursor-pointer"
        >
          <span>View All Placement Records &amp; Hiring Stats</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </div>
    </div>
  );
};
