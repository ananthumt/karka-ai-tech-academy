import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Tag } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { BLOG_POSTS, getBlogPost, getRelatedPosts } from "@/content/blog";

const SITE_URL = "https://www.karka.academy";

interface PageProps {
  params: { id: string };
}

/** Pre-render every article at build time. */
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ id: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPost(params.id);

  if (!post) {
    return {
      title: "Article Not Found | Karka AI & Tech Academy",
      robots: { index: false, follow: true },
    };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | Karka AI & Tech Academy`,
    description: post.snippet,
    keywords: post.tags,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.snippet,
      url,
      siteName: "Karka AI Academy",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: `${SITE_URL}${post.image}`, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.snippet,
      images: [`${SITE_URL}${post.image}`],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.id);

  // Previously this page title-cased whatever slug it was given and rendered
  // the same three placeholder paragraphs, so every unknown URL returned a
  // fake 200. Unknown slugs now 404 properly.
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);
  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <div className="w-full flex flex-col">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.snippet,
          image: `${SITE_URL}${post.image}`,
          datePublished: post.date,
          dateModified: post.date,
          author: { "@type": "Person", name: post.author },
          publisher: {
            "@type": "Organization",
            name: "Karka AI & Tech Academy",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/logo.webp` },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          keywords: post.tags.join(", "),
        }}
      />

      <article className="pt-20 pb-16 bg-white dark:bg-[#0B1120] transition-colors">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-heading font-bold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 uppercase tracking-wider mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Insights</span>
          </Link>

          <header className="space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs font-heading font-semibold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{post.category}</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-slate-900 dark:text-white leading-[1.1] tracking-tight text-balance">
              {post.title}
            </h1>

            <p className="text-lead text-slate-600 dark:text-slate-400 font-body">
              {post.intro}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-6 border-b border-slate-200/80 dark:border-white/10 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-body">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time dateTime={post.date}>{post.dateLabel}</time>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" aria-hidden="true" />
                <span>
                  {post.author}
                  <span className="hidden sm:inline text-slate-400 dark:text-slate-500">
                    {" "}
                    — {post.authorRole}
                  </span>
                </span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {post.readMinutes} min read
              </span>
            </div>
          </header>

          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 dark:border-white/10 mt-8">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          {/* BODY */}
          <div className="pt-10 space-y-10">
            {post.sections.map((section, i) => (
              <section key={i} className="space-y-4">
                {section.heading && (
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">
                    {section.heading}
                  </h2>
                )}

                {section.paragraphs.map((para, j) => (
                  <p
                    key={j}
                    className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-body"
                  >
                    {para}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="space-y-2.5 pl-1">
                    {section.bullets.map((bullet, k) => (
                      <li key={k} className="flex items-start gap-3">
                        <span
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-body">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.quote && (
                  <blockquote className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border-l-4 border-indigo-600 dark:border-indigo-400 text-slate-800 dark:text-slate-200 italic font-semibold font-body">
                    &ldquo;{section.quote}&rdquo;
                  </blockquote>
                )}
              </section>
            ))}
          </div>

          {/* RELATED INTERNAL LINKS */}
          <aside className="mt-12 p-6 rounded-3xl bg-[#F8FAFC] dark:bg-[#080C17] border border-slate-200/80 dark:border-white/10">
            <h2 className="text-sm font-heading font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Go deeper
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {post.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 text-sm font-heading font-semibold text-slate-800 dark:text-white hover:border-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </article>

      {/* KEEP READING */}
      {related.length > 0 && (
        <section className="py-16 bg-[#F8FAFC] dark:bg-[#080C17] border-t border-slate-200/80 dark:border-white/10 transition-colors">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <h2 className="heading-section text-slate-900 dark:text-white mb-8">
              Keep reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((item) => (
                <article
                  key={item.slug}
                  className="p-5 rounded-2xl bg-white dark:bg-[#111A2E] border border-slate-200/80 dark:border-white/10 shadow-sm card-hover space-y-3"
                >
                  <Link
                    href={`/blog/${item.slug}`}
                    className="relative block aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900"
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </Link>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white leading-snug">
                    <Link
                      href={`/blog/${item.slug}`}
                      className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-body leading-relaxed">
                    {item.snippet}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </div>
  );
}
