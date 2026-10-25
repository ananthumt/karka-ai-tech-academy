"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Clock,
  Globe,
  Layers,
  GraduationCap,
  Briefcase,
  Code,
  Database,
  Palette,
  Film,
  TrendingUp,
  Server,
  Baby,
  School,
  ExternalLink,
  ChevronLeft,
  Columns,
  X,
} from "lucide-react";
import {
  rankCourses,
  RecommendationCriteria,
  RecommendedCourse,
} from "@/lib/recommendation";
import { useEnrollModal } from "@/components/EnrollContext";

interface WizardProps {
  onCloseWizard: () => void;
  onSendToChat?: (query: string) => void;
}

export const CourseRecommendationWizard: React.FC<WizardProps> = ({
  onCloseWizard,
  onSendToChat,
}) => {
  const { openEnroll } = useEnrollModal();

  // Wizard step: 1 (Education), 2 (Interest), 3 (Goal), 4 (Mode), 5 (Results)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showComparison, setShowComparison] = useState<boolean>(false);

  const [criteria, setCriteria] = useState<RecommendationCriteria>({
    educationLevel: "graduate",
    interest: "web",
    careerGoal: "job",
    preferredMode: "any",
  });

  const [results, setResults] = useState<RecommendedCourse[]>([]);

  const handleEducationSelect = (level: RecommendationCriteria["educationLevel"]) => {
    setCriteria((prev) => ({
      ...prev,
      educationLevel: level,
      // If school student selected, auto-set interest/goal to kids
      ...(level === "school" ? { careerGoal: "kids", interest: "web" } : {}),
    }));
    if (level === "school") {
      // Auto-compute kids results
      const kidsResults = rankCourses({
        educationLevel: "school",
        interest: "web",
        careerGoal: "kids",
        preferredMode: "any",
      });
      setResults(kidsResults);
      setCurrentStep(5);
    } else {
      setCurrentStep(2);
    }
  };

  const handleInterestSelect = (interest: RecommendationCriteria["interest"]) => {
    setCriteria((prev) => ({ ...prev, interest }));
    setCurrentStep(3);
  };

  const handleGoalSelect = (careerGoal: RecommendationCriteria["careerGoal"]) => {
    setCriteria((prev) => ({ ...prev, careerGoal }));
    setCurrentStep(4);
  };

  const handleModeSelect = (preferredMode: RecommendationCriteria["preferredMode"]) => {
    const updatedCriteria: RecommendationCriteria = {
      ...criteria,
      preferredMode,
    };
    setCriteria(updatedCriteria);
    const ranked = rankCourses(updatedCriteria);
    setResults(ranked);
    setCurrentStep(5);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setShowComparison(false);
    setCriteria({
      educationLevel: "graduate",
      interest: "web",
      careerGoal: "job",
      preferredMode: "any",
    });
    setResults([]);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] dark:bg-[#070B14] text-slate-900 dark:text-white overflow-hidden">
      {/* Wizard Header Bar */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          {currentStep > 1 && currentStep < 5 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 cursor-pointer"
              title="Previous step"
              aria-label="Back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white font-heading">
              Smart Course Recommendation
            </h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-body">
              {currentStep < 5 ? `Step ${currentStep} of 4` : "Personalized Recommendations"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-heading">
          {currentStep === 5 && (
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restart</span>
            </button>
          )}

          <button
            type="button"
            onClick={onCloseWizard}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 cursor-pointer"
            title="Return to chat"
            aria-label="Close Course Recommendation Wizard"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {/* STEP 1: Current Education Level */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-heading">
                Step 01
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-heading">
                What is your current background?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-body">
                Select your education or professional stage to calibrate prerequisites.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-heading">
              <button
                type="button"
                onClick={() => handleEducationSelect("graduate")}
                className="p-3.5 rounded-xl text-left bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all cursor-pointer shadow-xs space-y-1.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  College Graduate / Final Year
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body leading-relaxed">
                  B.E, B.Tech, BCA, B.Sc, or Arts seeking ₹0 upfront placement bootcamps.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleEducationSelect("student")}
                className="p-3.5 rounded-xl text-left bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all cursor-pointer shadow-xs space-y-1.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <School className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Current College Student (1st–3rd Yr)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body leading-relaxed">
                  Looking for verified internships, weekend bootcamps, and semester skill-building.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleEducationSelect("professional")}
                className="p-3.5 rounded-xl text-left bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all cursor-pointer shadow-xs space-y-1.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Working / Career Switcher
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body leading-relaxed">
                  Switching from non-IT, support, or upgrading to modern fullstack &amp; GenAI roles.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleEducationSelect("school")}
                className="p-3.5 rounded-xl text-left bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all cursor-pointer shadow-xs space-y-1.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Baby className="w-4 h-4" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  School Student / Kid
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body leading-relaxed">
                  Interactive programming foundation, animation, and logic games for young minds.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Primary Area of Interest */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-heading">
                Step 02
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-heading">
                What domain excites you most?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-body">
                Select your primary technical or creative passion.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 font-heading text-xs">
              {[
                { key: "web", title: "Web & Fullstack", icon: <Code className="w-4 h-4" />, sub: "React, Node.js, Python, MERN" },
                { key: "ai", title: "Generative AI & LLMs", icon: <Sparkles className="w-4 h-4" />, sub: "Prompt Eng., LLMs, LangChain" },
                { key: "data", title: "Data Science & ML", icon: <Database className="w-4 h-4" />, sub: "Analytics, PowerBI, Python" },
                { key: "design", title: "UI/UX & Web Design", icon: <Palette className="w-4 h-4" />, sub: "Figma, Design Systems, HTML" },
                { key: "media", title: "Video & Animation", icon: <Film className="w-4 h-4" />, sub: "Premiere, After Effects, 3D" },
                { key: "marketing", title: "Digital Marketing & SEO", icon: <TrendingUp className="w-4 h-4" />, sub: "Performance Ads, Content, SEO" },
                { key: "devops", title: "DevOps, Cloud & QA", icon: <Server className="w-4 h-4" />, sub: "AWS, CI/CD, Test Automation" },
                { key: "business", title: "Business & Finance", icon: <Briefcase className="w-4 h-4" />, sub: "Business Analytics, Tally" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleInterestSelect(item.key as RecommendationCriteria["interest"])}
                  className="p-3 rounded-xl text-left bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all cursor-pointer shadow-xs space-y-1.5"
                >
                  <div className="text-indigo-600 dark:text-indigo-400">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-body truncate">
                    {item.sub}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Career Objective */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-heading">
                Step 03
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-heading">
                What is your primary career goal?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-body">
                We use this to align hiring partner criteria and fee terms.
              </p>
            </div>

            <div className="space-y-2 font-heading">
              {[
                {
                  key: "job",
                  title: "Land a Full-Time Software Job (₹0 Upfront Tuition)",
                  desc: "Zero fees during training. Pay a flat ₹40,000 fee strictly after securing a tech offer.",
                },
                {
                  key: "switch",
                  title: "Switch Careers from Non-IT into Tech",
                  desc: "Structured from fundamentals with 1-on-1 daily mentorship in Nagercoil.",
                },
                {
                  key: "upskill",
                  title: "Upskill with Generative AI & Cutting-Edge Stacks",
                  desc: "Master production GenAI agents and advanced engineering workflows.",
                },
                {
                  key: "freelance",
                  title: "High-Value Freelancing & Remote Agency Work",
                  desc: "Build an international portfolio through real Agile Tribers client incubations.",
                },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleGoalSelect(item.key as RecommendationCriteria["careerGoal"])}
                  className="w-full p-3.5 rounded-xl text-left bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all cursor-pointer shadow-xs space-y-1"
                >
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Preferred Learning Format */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-heading">
                Step 04
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-heading">
                Preferred Learning Format
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-body">
                Choose between on-campus lab immersion or live interactive hybrid tracks.
              </p>
            </div>

            <div className="space-y-2.5 font-heading">
              <button
                type="button"
                onClick={() => handleModeSelect("offline")}
                className="w-full p-3.5 rounded-xl text-left bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all cursor-pointer shadow-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>In-Person Studio Lab (Nagercoil Campus)</span>
                  </h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold">
                    Recommended
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body">
                  Full studio access, high-speed workstations, collaborative sprints, and daily mentor feedback.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleModeSelect("online")}
                className="w-full p-3.5 rounded-xl text-left bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all cursor-pointer shadow-xs space-y-1"
              >
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Live Interactive Online Track
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body">
                  Live classes, remote code pairing, recorded archive access, and 1-on-1 virtual mentoring.
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleModeSelect("any")}
                className="w-full p-3.5 rounded-xl text-left bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/60 dark:hover:border-indigo-500/60 transition-all cursor-pointer shadow-xs space-y-1"
              >
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Flexible / Either Mode
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body">
                  Show best matched courses regardless of delivery mode.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: RESULTS & RECOMMENDATIONS */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-white/10">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-heading">
                  Top Recommended {results.length === 1 ? "Program" : "Programs"}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-body">
                  Ranked from verified courses based on your education, interest, and goals.
                </p>
              </div>

              {results.length > 1 && (
                <button
                  type="button"
                  onClick={() => setShowComparison(!showComparison)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-white/10 border border-slate-200/80 dark:border-white/10 text-indigo-600 dark:text-indigo-400 hover:bg-slate-50 cursor-pointer font-heading"
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>{showComparison ? "Show Cards" : "Compare Top 3"}</span>
                </button>
              )}
            </div>

            {/* Side-by-Side Comparison Modal / View */}
            {showComparison && results.length > 1 ? (
              <div className="overflow-x-auto rounded-xl border border-slate-200/80 dark:border-white/10 bg-white dark:bg-[#111A2E]">
                <table className="w-full text-left text-xs font-body">
                  <thead>
                    <tr className="border-b border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 font-heading">
                      <th className="p-3 font-bold text-slate-400 uppercase text-[10px]">Course</th>
                      <th className="p-3 font-bold text-slate-400 uppercase text-[10px]">Duration</th>
                      <th className="p-3 font-bold text-slate-400 uppercase text-[10px]">Level</th>
                      <th className="p-3 font-bold text-slate-400 uppercase text-[10px]">Mode</th>
                      <th className="p-3 font-bold text-slate-400 uppercase text-[10px]">Tuition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                    {results.map((r, i) => (
                      <tr key={r.course.slug} className="hover:bg-slate-50/50 dark:hover:bg-white/5">
                        <td className="p-3 font-bold text-slate-900 dark:text-white font-heading">
                          <Link href={r.url} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                            {r.course.title}
                          </Link>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">{r.verifiedDuration}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">{r.verifiedLevel}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">{r.verifiedMode}</td>
                        <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">₹0 Upfront (PAP)</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Recommendation Cards */
              <div className="space-y-3">
                {results.map((item, idx) => (
                  <div
                    key={item.course.slug}
                    className="p-4 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50 font-heading">
                            {item.categoryName}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                            Top Recommendation
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-heading leading-tight">
                          {item.course.title}
                        </h4>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                          {item.matchScore}% Match
                        </span>
                      </div>
                    </div>

                    {/* Why this matches you */}
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10 text-[11px] text-slate-600 dark:text-slate-300 font-body leading-relaxed">
                      <strong className="text-slate-900 dark:text-white font-heading block mb-0.5">
                        Why this fits you:
                      </strong>
                      {item.matchReason}
                    </div>

                    {/* Meta specs */}
                    <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 font-heading">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>{item.verifiedDuration}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                        <span>{item.verifiedMode}</span>
                      </span>
                      <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                        <span>₹0 Upfront</span>
                      </span>
                    </div>

                    {/* Dual Action CTAs */}
                    <div className="pt-1 flex items-center gap-2 font-heading">
                      <Link
                        href={item.url}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-800 dark:text-white text-xs font-bold text-center border border-slate-200 dark:border-white/10 transition-colors inline-flex items-center justify-center gap-1.5"
                      >
                        <span>View Syllabus</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => openEnroll(item.course.title)}
                        className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold text-center transition-colors cursor-pointer shadow-xs inline-flex items-center justify-center gap-1.5"
                      >
                        <span>Quick Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Return Action */}
      <div className="p-3 bg-white dark:bg-[#0B1120] border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs font-heading flex-shrink-0">
        <button
          type="button"
          onClick={handleRestart}
          className="text-slate-500 dark:text-slate-400 hover:underline cursor-pointer"
        >
          Start Over
        </button>

        <button
          type="button"
          onClick={onCloseWizard}
          className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold cursor-pointer"
        >
          Return to Assistant Chat &rarr;
        </button>
      </div>
    </div>
  );
};
