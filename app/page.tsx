import React from "react";
import type { Metadata } from "next";
import { HOME_CONTENT, SITE_CONFIG } from "@/content/site";
import HomeView from "@/components/HomeView";
import { JsonLd, buildOrganizationSchema, buildFaqSchema } from "@/components/JsonLd";

const SITE_URL = "https://www.karka.academy";

const DESCRIPTION =
  "Become an industry-ready software developer at Karka AI & Tech Academy, Nagercoil. 26 AI-first career programs with ₹0 upfront tuition under Pay After Placement, a 2-month production internship at Agile Tribers, and 100% lifetime placement support.";

export const metadata: Metadata = {
  title: "Karka AI & Tech Academy | AI & Software Courses in Nagercoil",
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Karka AI & Tech Academy | Pay After Placement Tech Training in Nagercoil",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Karka AI Academy",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          buildOrganizationSchema(SITE_CONFIG),
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Karka AI & Tech Academy",
            url: SITE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/courses?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          },
          buildFaqSchema(HOME_CONTENT.faqs.items),
        ]}
      />
      <HomeView />
    </>
  );
}
