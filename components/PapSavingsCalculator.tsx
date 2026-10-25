"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  ChevronRight,
  Info,
  Scale,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { clamp, cn, formatInr } from "@/lib/utils";

/**
 * Karka's published Pay After Placement model — the ONLY two Karka figures
 * quoted anywhere in this component:
 *   ₹0 upfront tuition, flat ₹40,000 payable strictly after placement
 *   (Step 8 of the roadmap).
 * Everything else on this screen is a number the learner enters themselves.
 */
const KARKA_UPFRONT = 0;
const KARKA_AFTER_PLACEMENT = 40000;

const FEE_MIN = 25_000;
const FEE_MAX = 300_000;
const FEE_STEP = 5_000;
const FEE_DEFAULT = 120_000;

const SALARY_MIN = 240_000;
const SALARY_MAX = 1_200_000;
const SALARY_STEP = 10_000;
const SALARY_DEFAULT = 450_000;

const TRAINING_MONTHS = [3, 6, 8] as const;
type TrainingMonths = (typeof TRAINING_MONTHS)[number];

/* -------------------------------------------------------------------------- */
/* Animated figure                                                            */
/* -------------------------------------------------------------------------- */

const AnimatedAmount: React.FC<{ value: string; className?: string }> = ({
  value,
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span className={cn("inline-flex overflow-hidden", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* Range field                                                                */
/* -------------------------------------------------------------------------- */

interface RangeFieldProps {
  id: string;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  value: number;
  /** Human-readable value announced to screen readers. */
  valueText: string;
  /** Formatted value rendered next to the label. */
  displayValue: string;
  minLabel: string;
  maxLabel: string;
  onChange: (next: number) => void;
}

const RangeField: React.FC<RangeFieldProps> = ({
  id,
  label,
  hint,
  min,
  max,
  step,
  value,
  valueText,
  displayValue,
  minLabel,
  maxLabel,
  onChange,
}) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <label
          htmlFor={id}
          className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-heading"
        >
          {label}
        </label>
        <span className="text-lg sm:text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-heading tabular-nums">
          {displayValue}
        </span>
      </div>

      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-describedby={`${id}-hint`}
        aria-valuetext={valueText}
        onChange={(e) => onChange(clamp(Number(e.target.value), min, max))}
        style={{
          backgroundImage: `linear-gradient(to right, #4F46E5 ${percent}%, transparent ${percent}%)`,
        }}
        className={cn(
          "w-full h-2.5 appearance-none rounded-full cursor-pointer bg-slate-200 dark:bg-white/10 bg-no-repeat",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#111A2E]",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer",
          "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer"
        )}
      />

      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 font-mono">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>

      <p id={`${id}-hint`} className="text-xs text-slate-600 dark:text-slate-400 font-body">
        {hint}
      </p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Comparison row                                                             */
/* -------------------------------------------------------------------------- */

const CompareRow: React.FC<{
  label: string;
  other: string;
  karka: string;
  karkaAccent?: boolean;
}> = ({ label, other, karka, karkaAccent = false }) => (
  <div className="grid grid-cols-3 items-center gap-2 py-3 border-b border-slate-200/80 dark:border-white/10 last:border-b-0">
    <span className="col-span-1 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 font-body">
      {label}
    </span>
    <span className="col-span-1 text-right text-sm sm:text-base font-bold text-slate-700 dark:text-slate-300 font-heading tabular-nums">
      <AnimatedAmount value={other} />
    </span>
    <span
      className={cn(
        "col-span-1 text-right text-sm sm:text-base font-extrabold font-heading tabular-nums",
        karkaAccent
          ? "text-indigo-600 dark:text-indigo-400"
          : "text-slate-900 dark:text-white"
      )}
    >
      <AnimatedAmount value={karka} />
    </span>
  </div>
);

/* -------------------------------------------------------------------------- */
/* Calculator                                                                 */
/* -------------------------------------------------------------------------- */

export const PapSavingsCalculator: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const [otherFee, setOtherFee] = useState<number>(FEE_DEFAULT);
  const [salary, setSalary] = useState<number>(SALARY_DEFAULT);
  const [months, setMonths] = useState<TrainingMonths>(6);

  const result = useMemo(() => {
    const difference = otherFee - KARKA_AFTER_PLACEMENT;
    const monthlySalary = salary / 12;
    // How many months of the learner's own expected salary the flat
    // ₹40,000 fee represents.
    const breakEvenMonths = Math.round((KARKA_AFTER_PLACEMENT / monthlySalary) * 10) / 10;

    return {
      difference,
      monthlySalary,
      breakEvenMonths,
      /** Karka cheaper in absolute tuition. */
      karkaCheaper: difference > 0,
      /** Karka costs more in absolute tuition — never shown as a "saving". */
      karkaCostsMore: difference < 0,
      savings: Math.max(difference, 0),
      extraCost: Math.max(-difference, 0),
      otherPerMonth: otherFee / months,
      karkaPerMonth: KARKA_AFTER_PLACEMENT / months,
    };
  }, [otherFee, salary, months]);

  const lakhLabel = (value: number): string =>
    `₹${(Math.round((value / 100_000) * 10) / 10).toFixed(1)}L`;

  return (
    <div
      className={cn(
        "w-full rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-lg overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="px-5 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-slate-200/80 dark:border-white/10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-heading font-semibold uppercase tracking-wider mb-3.5">
          <Calculator className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Pay After Placement Calculator</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Compare the real cost of your training
        </h3>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-body max-w-2xl">
          Karka charges {formatInr(KARKA_UPFRONT)} upfront tuition and a flat{" "}
          {formatInr(KARKA_AFTER_PLACEMENT)} only after you land a tech job. Enter the
          numbers you have been quoted elsewhere and see how the two models line up.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Inputs */}
        <div className="p-5 sm:p-8 space-y-7 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-white/10">
          <RangeField
            id="pap-other-fee"
            label="Typical upfront fee at other institutes"
            hint="Whatever another institute quoted you, payable before training starts."
            min={FEE_MIN}
            max={FEE_MAX}
            step={FEE_STEP}
            value={otherFee}
            displayValue={formatInr(otherFee)}
            valueText={`${formatInr(otherFee)} upfront fee`}
            minLabel={formatInr(FEE_MIN)}
            maxLabel={formatInr(FEE_MAX)}
            onChange={setOtherFee}
          />

          <RangeField
            id="pap-salary"
            label="Expected starting salary"
            hint="Your own expectation for a first tech role, per year."
            min={SALARY_MIN}
            max={SALARY_MAX}
            step={SALARY_STEP}
            value={salary}
            displayValue={`${formatInr(salary)} / yr`}
            valueText={`${formatInr(salary)} per year, about ${formatInr(
              salary / 12
            )} per month`}
            minLabel={lakhLabel(SALARY_MIN)}
            maxLabel={lakhLabel(SALARY_MAX)}
            onChange={setSalary}
          />

          {/* Training length */}
          <div className="space-y-2.5">
            <span
              id="pap-months-label"
              className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-heading"
            >
              Months of training
            </span>
            <div
              role="group"
              aria-labelledby="pap-months-label"
              className="inline-flex w-full p-1 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 gap-1"
            >
              {TRAINING_MONTHS.map((m) => {
                const isActive = months === m;
                return (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setMonths(m)}
                    className={cn(
                      "flex-1 px-3 py-2.5 rounded-lg text-sm font-bold font-heading cursor-pointer transition-all",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#111A2E]",
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-white/10"
                    )}
                  >
                    {m} months
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-body">
              Used only to spread each total across the training window.
            </p>
          </div>
        </div>

        {/* Outputs */}
        <div className="p-5 sm:p-8 space-y-5 bg-[#F8FAFC] dark:bg-[#0B1120]">
          {/* Column headers */}
          <div className="grid grid-cols-3 items-end gap-2 pb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500 font-heading">
              What you compare
            </span>
            <span className="text-right text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading">
              Other institutes
            </span>
            <span className="text-right text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-heading">
              Karka PAP
            </span>
          </div>

          <div
            aria-live="polite"
            className="rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 px-4 sm:px-5 py-1 shadow-xs"
          >
            <CompareRow
              label="Cash needed before you start"
              other={formatInr(otherFee)}
              karka={formatInr(KARKA_UPFRONT)}
              karkaAccent
            />
            <CompareRow
              label="Total tuition paid"
              other={formatInr(otherFee)}
              karka={formatInr(KARKA_AFTER_PLACEMENT)}
            />
            <CompareRow
              label={`Spread across ${months} months`}
              other={`${formatInr(result.otherPerMonth)}/mo`}
              karka={`${formatInr(result.karkaPerMonth)}/mo`}
            />
          </div>

          {/* Headline verdict */}
          <div
            aria-live="polite"
            className={cn(
              "rounded-2xl border p-5 shadow-xs",
              result.karkaCostsMore
                ? "bg-amber-50 dark:bg-amber-950/20 border-amber-300/70 dark:border-amber-700/40"
                : "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200/80 dark:border-indigo-800/50"
            )}
          >
            {result.karkaCheaper && (
              <>
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 font-heading">
                  <Wallet className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Total tuition saved with Karka</span>
                </p>
                <p className="mt-1.5 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
                  <AnimatedAmount value={formatInr(result.savings)} />
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-body">
                  Based on the {formatInr(otherFee)} you entered versus Karka&apos;s flat{" "}
                  {formatInr(KARKA_AFTER_PLACEMENT)} after placement — and none of it is
                  due before you start.
                </p>
              </>
            )}

            {result.difference === 0 && (
              <>
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 font-heading">
                  <Scale className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Identical total tuition</span>
                </p>
                <p className="mt-1.5 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
                  <AnimatedAmount value={formatInr(0)} />
                  <span className="text-base font-bold text-slate-500 dark:text-slate-400 ml-2">
                    difference
                  </span>
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-body">
                  Both totals come to {formatInr(otherFee)}. The difference is timing:
                  Karka&apos;s is due only after you are placed.
                </p>
              </>
            )}

            {result.karkaCostsMore && (
              <>
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 font-heading">
                  <Scale className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Karka costs more in absolute tuition</span>
                </p>
                <p className="mt-1.5 text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading tracking-tight">
                  <AnimatedAmount value={`+${formatInr(result.extraCost)}`} />
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-body">
                  At {formatInr(otherFee)} the other institute is the cheaper total. There
                  is no saving to claim here — the honest difference is risk: Karka still
                  asks for {formatInr(KARKA_UPFRONT)} before you start and the{" "}
                  {formatInr(KARKA_AFTER_PLACEMENT)} only becomes payable once you are
                  actually placed.
                </p>
              </>
            )}
          </div>

          {/* Secondary figures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 p-4 shadow-xs">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                <span>Break-even on the fee</span>
              </p>
              <p className="mt-1.5 text-2xl font-extrabold text-slate-900 dark:text-white font-heading tabular-nums">
                <AnimatedAmount value={`${result.breakEvenMonths.toFixed(1)} months`} />
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-body">
                The {formatInr(KARKA_AFTER_PLACEMENT)} fee equals{" "}
                {result.breakEvenMonths.toFixed(1)} months of the{" "}
                {formatInr(result.monthlySalary)} monthly salary you entered.
              </p>
            </div>

            <div className="rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 p-4 shadow-xs">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-heading">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                <span>Cash at risk upfront</span>
              </p>
              <p className="mt-1.5 text-2xl font-extrabold text-slate-900 dark:text-white font-heading tabular-nums">
                <AnimatedAmount value={formatInr(KARKA_UPFRONT)} />
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 font-body">
                You commit nothing before training. The other quote asks for{" "}
                {formatInr(otherFee)} before day one.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 font-body">
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden="true" />
            <span>
              Figures are illustrative. The comparison fee, salary and training length are
              numbers you enter yourself — Karka does not publish or endorse other
              institutes&apos; pricing. The only Karka figures quoted here are our published
              model: {formatInr(KARKA_UPFRONT)} upfront tuition and a flat{" "}
              {formatInr(KARKA_AFTER_PLACEMENT)} payable after placement. Salary outcomes
              are never guaranteed.
            </span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link
              href="/roadmap"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-sm shadow-lg shadow-indigo-600/25 cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <span>See the 8-step roadmap</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
            </Link>
            <Link
              href="/course-finder"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-200/80 dark:border-white/10 font-heading font-semibold text-sm cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <span>Find my course</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
