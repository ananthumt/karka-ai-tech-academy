import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Calendar, User, ArrowRight, Clock } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { BLOG_POSTS } from "@/content/blog";

const PAGE_DESCRIPTION =
  "Practical guides on breaking into tech from Karka AI & Tech Academy, Nagercoil — GenAI workflows for freshers, stack comparisons, and an honest look at the Pay After Placement model.";

export const metadata: Metadata = {
  title: "Insights & Guides | Karka AI & Tech Academy",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "https://www.karka.academy/blog" },
  openGraph: {
    title: "Insights & Guides | Karka AI & Tech Academy",
    description: PAGE_DESCRIPTION,
    url: "https://www.karka.academy/blog",
    siteName: "Karka AI Academy",
    type: "website",
  },
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="w-full flex flex-col">
      {/* HERO */}
      <section className="pt-20 pb-16 bg-[#F8FAFC] dark:bg-[#080C17] text-slate-900 dark:text-white border-b border-slate-200/80 dark:border-white/10 transition-colors relative overflow-hidden">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 dark:bg-indigo-600/20 rounded-full blur-[140px] deco"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-10 w-80 h-80 bg-violet-500/10 rounded-full blur-[120px] deco"
          aria-hidden="true"
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-heading font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Insights &amp; Guides</span>
          </div>

          <h1 className="heading-hero text-slate-900 dark:text-white text-balance">
            Straight answers about starting a tech career
          </h1>

          <p className="text-lead text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-body">
            Written by the mentors who run the labs in Nagercoil. No listicles, no
            guaranteed-success claims — just what we see work across our cohorts.
          </p>
        </div>
      </section>

      {/* FEATURED POST */}
      {featured && (
        <section className="py-14 lg:py-20 bg-white dark:bg-[#0B1120] border-b border-slate-200/80 dark:border-white/10 transition-colors">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <Reveal>
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <Link
                  href={`/blog/${featured.slug}`}
                  className="group relative aspect-[16/10] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-lg"
                >
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 dark:bg-[#0B1120]/95 text-xs font-heading font-bold text-indigo-700 dark:text-indigo-300 shadow-sm">
                    {featured.category}
                  </span>
                </Link>

                <div className="space-y-4">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                    Latest
                  </span>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-slate-900 dark:text-white leading-tight text-balance">
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {featured.title}
                    </Link>
                  </h2>

                  <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-body prose-readable">
                    {featured.snippet}
                  </p>

                  <PostMeta
                    dateLabel={featured.dateLabel}
                    date={featured.date}
                    author={featured.author}
                    readMinutes={featured.readMinutes}
                  />

                  <Link
                    href={`/blog/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
                  >
                    <span>Read the article</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </section>
      )}

      {/* REMAINING POSTS */}
      {rest.length > 0 && (
        <section className="py-16 lg:py-24 bg-[#F8FAFC] dark:bg-[#080C17] transition-colors">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="heading-section text-slate-900 dark:text-white mb-10">
              More reading
            </h2>

            <Reveal staggerChildren={0.08}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rest.map((post) => (
                  <RevealItem key={post.slug}>
                    <article className="h-full p-6 rounded-3xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-sm flex flex-col justify-between gap-4 card-hover">
                      <div className="space-y-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group relative block aspect-video rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900"
                        >
                          <Image
                            src={post.image}
                            alt={post.imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 dark:bg-[#0B1120]/95 text-xs font-heading font-bold text-indigo-700 dark:text-indigo-300">
                            {post.category}
                          </span>
                        </Link>

                        <PostMeta
                          dateLabel={post.dateLabel}
                          date={post.date}
                          author={post.author}
                          readMinutes={post.readMinutes}
                        />

                        <h3 className="text-xl font-bold font-heading text-slate-900 dark:text-white leading-snug">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-body">
                          {post.snippet}
                        </p>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-heading font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        <span>Read full article</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </article>
                  </RevealItem>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand />
    </div>
  );
}

function PostMeta({
  dateLabel,
  date,
  author,
  readMinutes,
}: {
  dateLabel: string;
  date: string;
  author: string;
  readMinutes: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-body">
      <span className="flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
        <time dateTime={date}>{dateLabel}</time>
      </span>
      <span aria-hidden="true">·</span>
      <span className="flex items-center gap-1.5">
        <User className="w-3.5 h-3.5" aria-hidden="true" />
        {author}
      </span>
      <span aria-hidden="true">·</span>
      <span className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
        {readMinutes} min read
      </span>
    </div>
  );
}
