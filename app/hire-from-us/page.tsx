import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CalendarClock,
  ChevronRight,
  FileCheck2,
  Handshake,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import {
  CATEGORIES_CONFIG,
  COURSES,
  HOME_CONTENT,
  PLACEMENT_PAGE_CONTENT,
  SITE_CONFIG,
} from "@/content/site";
import { COURSE_CATEGORY_MAP } from "@/lib/recommendation";
import { StatCard } from "@/components/StatCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/CtaBand";
import { HireFromUsForm } from "@/components/HireFromUsForm";

export const metadata: Metadata = {
  title: "Hire From Us | Karka AI & Tech Academy",
  description:
    "Hire job-ready, AI-first engineers from Karka AI & Tech Academy, Nagercoil. Every graduate ships production code during a 2-month Agile Tribers internship and arrives with an ATS-formatted, verified portfolio. No placement fee.",
  keywords: [
    "hire developers Nagercoil",
    "hire full stack developers Tamil Nadu",
    "recruit AI engineers Nagercoil",
    "campus hiring partner Nagercoil",
    "hire from Karka Academy",
    "fresher hiring Nagercoil",
  ],
  alternates: {
    canonical: "https://www.karka.academy/hire-from-us",
  },
  openGraph: {
    title: "Hire From Us | Karka AI & Tech Academy",
    description:
      "Partner with Karka AI & Tech Academy, Nagercoil, to hire AI-first engineers, designers and analysts who have already shipped production software for live clients.",
    url: "https://www.karka.academy/hire-from-us",
    siteName: "Karka AI Academy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hire From Us | Karka AI & Tech Academy",
    description:
      "Hire verified, portfolio-backed AI-first tech talent from Karka AI & Tech Academy, Nagercoil.",
  },
};

/* -------------------------------------------------------------------------- */
/* Grounded content — every claim below is sourced from content/site.ts        */
/* -------------------------------------------------------------------------- */

const WHY_HIRE = [
  {
    icon: Rocket,
    title: "They have already shipped production code",
    desc: "Every learner completes a 2-month internship at Agile Tribers, our product studio, building and deploying production software for live clients alongside senior developers.",
  },
  {
    icon: BrainCircuit,
    title: "AI-first curriculum, not legacy syntax",
    desc: "Generative AI workflows, prompt engineering and AI automation are natively integrated across every track — so candidates already build software the way modern teams build it.",
  },
  {
    icon: Target,
    title: "Two weeks of dedicated placement training",
    desc: "Before they reach you, candidates complete two weeks of intensive prep: portfolio building, mock technical interviews, group discussions and HR grooming.",
  },
  {
    icon: FileCheck2,
    title: "ATS-formatted, verified portfolios",
    desc: "Our internal placement engine generates ATS-formatted digital portfolios with live project previews and public Git history you can open and test immediately.",
  },
  {
    icon: UserCheck,
    title: "Mentored by an ex-CTO",
    desc: "Training is led by founder Sateesh Kumar — 18+ years in industry, ex-CTO of Flow Global (UK fintech), previously with Wipro and Yatra.com.",
  },
  {
    icon: ShieldCheck,
    title: "A dedicated placement cell behind every hire",
    desc: "A dedicated placement officer coordinates shortlisting and interview scheduling, and supports each graduate for up to three months after they join you.",
  },
];

const HIRING_STEPS = [
  {
    step: "01",
    icon: Building2,
    title: "Share your role",
    desc: "Send us the stack, experience band, location and CTC range using the form below. One short brief is enough to start.",
  },
  {
    step: "02",
    icon: Users,
    title: "We shortlist verified candidates",
    desc: "Our placement cell matches your brief against job-ready graduates and sends ATS-formatted portfolios with live project links.",
  },
  {
    step: "03",
    icon: CalendarClock,
    title: "You interview on your own process",
    desc: "Run your own technical and cultural rounds, unchanged. We handle coordination and target a 48-hour interview scheduling turnaround.",
  },
  {
    step: "04",
    icon: Handshake,
    title: "Onboard with continued support",
    desc: "Make your offer directly. We stay in the loop with monthly mentorship for your new hire during their first three months.",
  },
];

const TALENT_POOLS = CATEGORIES_CONFIG.map((category) => ({
  ...category,
  courses: Object.values(COURSES)
    .filter((course) => COURSE_CATEGORY_MAP[course.slug] === category.slug)
    .slice(0, 2),
}));

/* -------------------------------------------------------------------------- */

export default function HireFromUsPage() {
  const companies = HOME_CONTENT.hero.companies;

  return (
    <div className="w-full flex flex-col">
      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="pt-20 pb-16 sm:pb-20 bg-[#F8FAFC] dark:bg-[#080C17] border-b border-slate-200/80 dark:border-white/10 transition-colors relative overflow-hidden">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <Reveal className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-heading font-semibold uppercase tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              <span>For hiring teams</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Hire job-ready, AI-first engineers from Nagercoil
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl font-body">
              Karka graduates do not arrive with coursework. They arrive having shipped
              production software for live clients during a 2-month internship at Agile
              Tribers, with an ATS-formatted portfolio you can open and test before the
              first call.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                href="#hiring-enquiry"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-base shadow-lg shadow-indigo-600/25 cursor-pointer transition-all"
              >
                <span>Share your hiring requirement</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
              </Link>
              <a
                href={SITE_CONFIG.hireEmail}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200/80 dark:border-white/10 font-heading font-semibold text-base cursor-pointer transition-all"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Email the placement cell</span>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400 font-body">
              <a
                href={SITE_CONFIG.phoneTel}
                className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp us</span>
              </a>
              <a
                href={SITE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{SITE_CONFIG.address}</span>
              </a>
            </div>
          </Reveal>

          {/* Verified placement stats */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PLACEMENT_PAGE_CONTENT.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <StatCard number={stat.number} suffix={stat.suffix} label={stat.label} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* WHY HIRE KARKA GRADUATES                                         */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-white/10 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="The hiring case"
              title="Why hire Karka graduates"
              subtitle="Six things a recruiter can verify before the first interview."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {WHY_HIRE.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="h-full p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-indigo-300/70 dark:hover:border-indigo-700/50 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800/40 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-heading leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-body">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* TALENT POOLS                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] dark:bg-[#080C17] border-b border-slate-200/80 dark:border-white/10 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Talent pools"
              title="Talent pools you can hire from"
              subtitle="Eight specialisation tracks across 26 programs. Each pool below lists live programs whose graduates are interview-ready."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TALENT_POOLS.map((pool, i) => (
              <Reveal key={pool.slug} delay={i * 0.05}>
                <div className="h-full flex flex-col p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-heading leading-snug">
                    {pool.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-body">
                    {pool.desc}
                  </p>

                  {pool.courses.length > 0 && (
                    <ul className="mt-4 space-y-2 flex-1">
                      {pool.courses.map((course) => (
                        <li key={course.slug}>
                          <Link
                            href={`/courses/${course.slug}`}
                            className="group inline-flex items-start gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer font-body"
                          >
                            <ChevronRight
                              className="w-3.5 h-3.5 mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400"
                              aria-hidden="true"
                            />
                            <span className="group-hover:underline">{course.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={`/courses/category/${pool.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline font-heading cursor-pointer"
                  >
                    <span>View this track</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* HIRING PARTNERS                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-white/10 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="Hiring partners"
              title="Companies already hiring from Karka"
              subtitle="Our alumni are building and shipping at these teams today."
            />
          </Reveal>

          <Reveal>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {companies.map((company) => (
                <li
                  key={company.name}
                  className="flex items-center justify-center h-20 px-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-xs hover:border-indigo-300/70 dark:hover:border-indigo-700/50 transition-colors"
                >
                  <div className="relative h-8 w-28">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      sizes="(max-width: 640px) 112px, 128px"
                      className="object-contain dark:brightness-125 dark:contrast-125"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* HOW HIRING WORKS                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] dark:bg-[#080C17] border-b border-slate-200/80 dark:border-white/10 transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal>
            <SectionHeader
              eyebrow="The process"
              title="How hiring works"
              subtitle="Four steps from brief to onboarding, with a 48-hour interview scheduling turnaround."
            />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {HIRING_STEPS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.step} delay={i * 0.08}>
                  <div className="h-full p-6 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-xs hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/60 dark:border-indigo-800/40 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                      </div>
                      <span className="text-2xl font-black text-slate-200 dark:text-white/10 font-mono tabular-nums">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-heading leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-body">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* ENQUIRY FORM                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="hiring-enquiry"
        className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-[#0B1120] transition-colors scroll-mt-24"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Reveal>
            <HireFromUsForm />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
