import { COURSES, CourseDetail, CATEGORIES_CONFIG } from "@/content/site";

export interface RecommendationCriteria {
  educationLevel: "graduate" | "student" | "professional" | "school";
  interest:
    | "web"
    | "ai"
    | "data"
    | "design"
    | "media"
    | "marketing"
    | "devops"
    | "business";
  careerGoal: "job" | "switch" | "freelance" | "upskill" | "kids";
  preferredMode: "offline" | "online" | "any";
}

export interface RecommendedCourse {
  course: CourseDetail;
  /** 0–100, safe to render directly as "{matchScore}% Match". */
  matchScore: number;
  categoryName: string;
  matchReason: string;
  verifiedDuration: string;
  verifiedMode: string;
  verifiedLevel: string;
  url: string;
}

/**
 * Maximum raw score `scoreCourse` can produce:
 *   50 base + 35 category + 25 goal + 15 education + 10 mode
 * Used to normalize into a 0–100 percentage. Previously the raw score was
 * rendered verbatim, so a strong match displayed as "125% Match".
 */
const MAX_RAW_SCORE = 135;

/** Map a raw additive score onto a presentable 55–99 percentage band. */
function toMatchPercent(raw: number): number {
  const ratio = Math.min(1, Math.max(0, raw / MAX_RAW_SCORE));
  // Floor at 55 so a weak-but-listed match never reads as a near-zero fit,
  // and cap at 99 so only the hand-curated kids result shows 99+.
  return Math.round(55 + ratio * 43);
}

// Course to Category mapping
export const COURSE_CATEGORY_MAP: Record<string, string> = {
  // Coding & Development
  "mern-fullstack": "coding",
  "react-java-fullstack": "coding",
  "react-python-fullstack": "coding",

  // Generative AI
  "genai-foundations": "gen-ai",
  "genai-mastery": "gen-ai",
  "genai-llm-developer": "gen-ai",

  // Data, ML & AI
  "ai-data-science": "data",
  "data-analytics-ai": "data",
  "data-engineering": "data",

  // Design & Creatives
  "ui-ux-design": "design",
  "web-designing": "design",
  "graphic-designing": "design",

  // Digital Media & Animation
  "video-editing": "digital-media",
  "graphic-designing-dm": "digital-media",
  "multimedia-animation": "digital-media",

  // Content & Digital Marketing
  "digital-marketing": "content-marketing",
  "seo-analyst": "content-marketing",
  "storytelling-content-writing": "content-marketing",

  // Advanced Tech & DevOps
  "cloud-devops": "other-tech",
  "automation-testing": "other-tech",
  "mobile-app-development": "other-tech",
  "fullstack-internship": "other-tech",
  "python-for-kids": "other-tech",

  // Business & Management
  "hr-finance": "business",
  "tally": "business",
  "business-analyst": "business",
};

/**
 * Intelligent recommendation algorithm that strictly ranks verified courses
 * from the COURSES dataset based on user criteria.
 */
export function rankCourses(
  criteria: RecommendationCriteria
): RecommendedCourse[] {
  const allCourses = Object.values(COURSES);

  // If school student or kids career goal is selected, prioritize python-for-kids
  if (criteria.educationLevel === "school" || criteria.careerGoal === "kids") {
    const kidsCourse = COURSES["python-for-kids"];
    if (kidsCourse) {
      return [
        {
          course: kidsCourse,
          categoryName: "School & Foundation Track",
          matchScore: 99,
          matchReason:
            "Specially tailored for young learners to master interactive Python programming, animations, and computational problem-solving with no prerequisites.",
          verifiedDuration: kidsCourse.details?.duration || "3 Months",
          verifiedMode: kidsCourse.details?.mode || "Online / Offline",
          verifiedLevel: kidsCourse.details?.level || "Beginner",
          url: `/courses/${kidsCourse.slug}`,
        },
      ];
    }
  }

  // Interest to category slug mapping
  const interestCategoryMap: Record<string, string[]> = {
    web: ["coding"],
    ai: ["gen-ai", "data"],
    data: ["data"],
    design: ["design"],
    media: ["digital-media"],
    marketing: ["content-marketing"],
    devops: ["other-tech"],
    business: ["business"],
  };

  const targetCategories = interestCategoryMap[criteria.interest] || ["coding"];

  const scoredCourses: RecommendedCourse[] = allCourses
    .filter((c) => c.slug !== "python-for-kids") // Kids course handled separately
    .map((course) => {
      const catSlug = COURSE_CATEGORY_MAP[course.slug] || "coding";
      const catConfig = CATEGORIES_CONFIG.find((cat) => cat.slug === catSlug);
      const catName = catConfig?.name || "Professional Track";

      let score = 50; // base score
      const reasons: string[] = [];

      // 1. Direct Category Match
      if (targetCategories.includes(catSlug)) {
        score += 35;
        reasons.push(`Directly matches your interest in ${catName}`);
      }

      // 2. Career Goal Match
      if (criteria.careerGoal === "job") {
        if (["mern-fullstack", "react-java-fullstack", "ai-data-science"].includes(course.slug)) {
          score += 20;
          reasons.push("High hiring demand across Karka's 50+ placement partners");
        }
      } else if (criteria.careerGoal === "switch") {
        if (
          ["mern-fullstack", "react-python-fullstack", "ui-ux-design", "digital-marketing"].includes(
            course.slug
          )
        ) {
          score += 20;
          reasons.push("Beginner-friendly ramp-up ideal for non-IT and fresh career transitions");
        }
      } else if (criteria.careerGoal === "freelance") {
        if (
          ["ui-ux-design", "web-designing", "video-editing", "mern-fullstack"].includes(
            course.slug
          )
        ) {
          score += 20;
          reasons.push("Strong potential for independent freelance and client project deliverables");
        }
      } else if (criteria.careerGoal === "upskill") {
        if (catSlug === "gen-ai" || catSlug === "data") {
          score += 25;
          reasons.push("Focuses on cutting-edge generative AI workflows and modern LLM stacks");
        }
      }

      // 3. Education / Experience Level Match
      if (criteria.educationLevel === "graduate") {
        if (course.details?.duration?.includes("6 Month")) {
          score += 10;
          reasons.push("Comprehensive 6-month curriculum with verified internship at Agile Tribers");
        }
      } else if (criteria.educationLevel === "student") {
        if (course.slug === "fullstack-internship" || course.details?.duration?.includes("3 Month")) {
          score += 15;
          reasons.push("Fast-track hands-on sprint aligned with college semester schedules");
        }
      } else if (criteria.educationLevel === "professional") {
        if (course.details?.mode?.toLowerCase().includes("online") || catSlug === "gen-ai") {
          score += 10;
          reasons.push("Flexible scheduling suitable for working engineering professionals");
        }
      }

      // 4. Preferred Mode Match
      if (criteria.preferredMode !== "any") {
        const modeLower = (course.details?.mode || "").toLowerCase();
        if (criteria.preferredMode === "offline" && modeLower.includes("offline")) {
          score += 10;
        } else if (criteria.preferredMode === "online" && modeLower.includes("online")) {
          score += 10;
        }
      }

      const matchReason =
        reasons.length > 0
          ? reasons.slice(0, 2).join(". ") + "."
          : `Aligned with ${catName} and structured with live project sprints.`;

      return {
        course,
        categoryName: catName,
        matchScore: toMatchPercent(score),
        matchReason,
        verifiedDuration: course.details?.duration || "6 Months",
        verifiedMode: course.details?.mode || "Offline / Online",
        verifiedLevel: course.details?.level || "Beginner to Advanced",
        url: `/courses/${course.slug}`,
      };
    });

  // Sort descending by score
  scoredCourses.sort((a, b) => b.matchScore - a.matchScore);

  // Return top 3 recommendations
  return scoredCourses.slice(0, 3);
}
