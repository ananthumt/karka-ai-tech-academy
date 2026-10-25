import { MetadataRoute } from "next";
import { COURSES, CATEGORIES_CONFIG } from "@/content/site";
import { BLOG_POSTS } from "@/content/blog";

const BASE_URL = "https://www.karka.academy";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Priority reflects how central the route is to conversion, not how new it is.
  const staticRoutes: { path: string; priority: number; freq: "daily" | "weekly" | "monthly" }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/courses", priority: 0.9, freq: "weekly" },
    { path: "/course-finder", priority: 0.9, freq: "weekly" },
    { path: "/placement", priority: 0.9, freq: "weekly" },
    { path: "/roadmap", priority: 0.85, freq: "weekly" },
    { path: "/compare", priority: 0.8, freq: "weekly" },
    { path: "/about-us", priority: 0.8, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/hire-from-us", priority: 0.75, freq: "monthly" },
    { path: "/blog", priority: 0.75, freq: "weekly" },
    { path: "/for-school-students", priority: 0.7, freq: "monthly" },
    { path: "/for-college-students", priority: 0.7, freq: "monthly" },
    { path: "/for-graduates", priority: 0.7, freq: "monthly" },
    { path: "/for-professionals", priority: 0.7, freq: "monthly" },
    { path: "/privacy-policy", priority: 0.3, freq: "monthly" },
    { path: "/terms-of-service", priority: 0.3, freq: "monthly" },
  ];

  return [
    ...staticRoutes.map(({ path, priority, freq }) => ({
      url: `${BASE_URL}${path}`,
      lastModified,
      changeFrequency: freq,
      priority,
    })),

    // Category landing pages were missing entirely.
    ...CATEGORIES_CONFIG.map((category) => ({
      url: `${BASE_URL}/courses/category/${category.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),

    ...Object.keys(COURSES).map((slug) => ({
      url: `${BASE_URL}/courses/${slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    // Blog routes were absent from the previous sitemap.
    ...BLOG_POSTS.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
