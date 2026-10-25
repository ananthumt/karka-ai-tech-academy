import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES, CATEGORIES_CONFIG } from "@/content/site";
import { COURSE_CATEGORY_MAP } from "@/lib/recommendation";
import CategoryCoursesView from "@/components/CategoryCoursesView";
import { JsonLd, buildBreadcrumbSchema } from "@/components/JsonLd";

const SITE_URL = "https://www.karka.academy";

interface PageProps {
  params: { category: string };
}

/** Pre-render all 8 category landing pages. */
export function generateStaticParams() {
  return CATEGORIES_CONFIG.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = CATEGORIES_CONFIG.find((c) => c.slug === params.category);

  if (!category) {
    return {
      title: "Category Not Found | Karka AI & Tech Academy",
      robots: { index: false, follow: true },
    };
  }

  const courseCount = Object.values(COURSES).filter(
    (c) => COURSE_CATEGORY_MAP[c.slug] === category.slug
  ).length;

  const url = `${SITE_URL}/courses/category/${category.slug}`;
  const description = `${category.desc}. ${courseCount} ${
    courseCount === 1 ? "program" : "programs"
  } at Karka AI & Tech Academy, Nagercoil — ₹0 upfront tuition under Pay After Placement.`;

  return {
    title: `${category.name} Courses in Nagercoil | Karka AI & Tech Academy`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.name} Courses | Karka AI & Tech Academy`,
      description,
      url,
      siteName: "Karka AI Academy",
      type: "website",
    },
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = CATEGORIES_CONFIG.find((c) => c.slug === params.category);
  if (!category) notFound();

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name: category.name, path: `/courses/category/${category.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${category.name} Courses`,
            description: category.desc,
            url: `${SITE_URL}/courses/category/${category.slug}`,
            isPartOf: { "@type": "WebSite", url: SITE_URL },
            hasPart: Object.values(COURSES)
              .filter((c) => COURSE_CATEGORY_MAP[c.slug] === category.slug)
              .map((c) => ({
                "@type": "Course",
                name: c.title,
                url: `${SITE_URL}/courses/${c.slug}`,
                description: c.metaDesc || c.heroDesc,
                provider: {
                  "@type": "EducationalOrganization",
                  name: "Karka AI & Tech Academy",
                  "@id": `${SITE_URL}/#organization`,
                },
              })),
          },
        ]}
      />
      <CategoryCoursesView categorySlug={category.slug} />
    </>
  );
}
