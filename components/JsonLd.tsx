import React from "react";

interface JsonLdProps {
  /** A schema.org object, or an array of them, to embed as JSON-LD. */
  data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Emit structured data for search engines.
 *
 * Server component by design: the payload is built from trusted local content
 * (`content/site.ts`, `content/blog.ts`) and must be in the initial HTML for
 * crawlers. `<` is escaped so a stray angle bracket in any content string
 * cannot terminate the script element early.
 */
export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // Not user input: serialized from typed local content modules.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

const SITE_URL = "https://www.karka.academy";

/** Organization + LocalBusiness graph for the academy itself. */
export function buildOrganizationSchema(config: {
  name: string;
  phone: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  coordinates: { lat: number; lng: number };
  socials: Record<string, string>;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: config.name,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo.webp`,
    image: `${SITE_URL}/assets/hero-realistic-studio.webp`,
    telephone: config.phone,
    email: config.email,
    description:
      "AI & tech training academy in Nagercoil, Tamil Nadu offering 26 career programs on a Pay After Placement model with ₹0 upfront tuition.",
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address,
      addressLocality: "Nagercoil",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: config.coordinates.lat,
      longitude: config.coordinates.lng,
    },
    hasMap: config.googleMapsUrl,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: Object.values(config.socials),
  };
}

/** FAQPage graph from a list of question/answer pairs. */
export function buildFaqSchema(items: { q: string; a: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** Course graph for a single program page. */
export function buildCourseSchema(course: {
  slug: string;
  title: string;
  metaDesc: string;
  overview: string;
  details: { duration: string; level: string; mode: string };
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.metaDesc || course.overview,
    url: `${SITE_URL}/courses/${course.slug}`,
    educationalLevel: course.details.level,
    provider: {
      "@type": "EducationalOrganization",
      name: "Karka AI & Tech Academy",
      url: SITE_URL,
      "@id": `${SITE_URL}/#organization`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: course.details.mode.toLowerCase().includes("online")
        ? ["Online", "Onsite"]
        : "Onsite",
      courseWorkload: course.details.duration,
      location: {
        "@type": "Place",
        name: "Karka AI & Tech Academy",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nagercoil",
          addressRegion: "Tamil Nadu",
          addressCountry: "IN",
        },
      },
    },
  };
}

/** BreadcrumbList graph. Pass paths without the origin. */
export function buildBreadcrumbSchema(
  crumbs: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
