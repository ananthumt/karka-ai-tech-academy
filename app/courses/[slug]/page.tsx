import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES, CATEGORIES_CONFIG, getCourseImage } from "@/content/site";
import { COURSE_CATEGORY_MAP } from "@/lib/recommendation";
import CourseDetailView from "@/components/CourseDetailView";
import {
  JsonLd,
  buildCourseSchema,
  buildFaqSchema,
  buildBreadcrumbSchema,
} from "@/components/JsonLd";

const SITE_URL = "https://www.karka.academy";

interface PageProps {
  params: { slug: string };
}

/**
 * Statically render all 26 course pages at build time.
 * Previously this route was a client component reading `useParams()`, so none
 * of the course pages were prerendered or indexable with per-page metadata.
 */
export function generateStaticParams() {
  return Object.keys(COURSES).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const course = COURSES[params.slug];

  if (!course) {
    return {
      title: "Course Not Found | Karka AI & Tech Academy",
      robots: { index: false, follow: true },
    };
  }

  const url = `${SITE_URL}/courses/${course.slug}`;
  const image = `${SITE_URL}${getCourseImage(course.slug)}`;
  const description = course.metaDesc || course.heroDesc;

  return {
    title: `${course.title} Course in Nagercoil | Karka AI & Tech Academy`,
    description,
    keywords: [
      `${course.title} course Nagercoil`,
      `${course.title} training`,
      "Pay After Placement Nagercoil",
      "software course Nagercoil",
      course.details.level,
      course.details.mode,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${course.title} | Karka AI & Tech Academy`,
      description,
      url,
      siteName: "Karka AI Academy",
      type: "website",
      images: [{ url: image, alt: course.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.title} | Karka AI & Tech Academy`,
      description,
      images: [image],
    },
  };
}

export default function CourseDetailPage({ params }: PageProps) {
  const course = COURSES[params.slug];
  if (!course) notFound();

  const categorySlug = COURSE_CATEGORY_MAP[course.slug] || "coding";
  const categoryName =
    CATEGORIES_CONFIG.find((c) => c.slug === categorySlug)?.name || "Professional Bootcamp";

  return (
    <>
      <JsonLd
        data={[
          buildCourseSchema(course),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name: categoryName, path: `/courses/category/${categorySlug}` },
            { name: course.title, path: `/courses/${course.slug}` },
          ]),
          ...(course.faqs?.length ? [buildFaqSchema(course.faqs)] : []),
        ]}
      />
      <CourseDetailView slug={course.slug} />
    </>
  );
}
