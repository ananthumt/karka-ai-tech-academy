/**
 * Smoke-check every route and the chat API against a running dev/prod server.
 * Usage: node scripts/verify-routes.mjs [baseUrl]
 */

const BASE = process.argv[2] || "http://localhost:3000";

const ROUTES = [
  ["/", 200],
  ["/courses", 200],
  ["/courses/mern-fullstack", 200],
  ["/courses/python-for-kids", 200],
  ["/courses/category/coding", 200],
  ["/courses/category/gen-ai", 200],
  ["/course-finder", 200],
  ["/compare", 200],
  ["/compare?courses=mern-fullstack,ui-ux-design", 200],
  ["/hire-from-us", 200],
  ["/blog", 200],
  ["/blog/the-real-truth-about-pay-after-placement", 200],
  ["/blog/how-to-land-first-software-job-with-genai", 200],
  ["/roadmap", 200],
  ["/placement", 200],
  ["/about-us", 200],
  ["/contact", 200],
  ["/for-graduates", 200],
  ["/for-school-students", 200],
  ["/privacy-policy", 200],
  ["/terms-of-service", 200],
  ["/sitemap.xml", 200],
  ["/manifest.webmanifest", 200],
  ["/icon.svg", 200],
  ["/opengraph-image.png", 200],
  ["/robots.txt", 200],
  // Unknown slugs must 404 rather than render a fake page.
  ["/blog/not-a-real-post", 404],
  ["/courses/not-a-real-course", 404],
  ["/courses/category/not-a-real-category", 404],
  ["/totally-missing-page", 404],
];

/** Assertions on the rendered HTML of key pages. */
const CONTENT_CHECKS = [
  ["/", ["Become an", "Proven Alumni Outcomes", "@karka.ai", "application/ld+json"]],
  ["/courses/mern-fullstack", ["MERN Fullstack Development", '"@type":"Course"', "og:image"]],
  ["/blog/the-real-truth-about-pay-after-placement", ['"@type":"BlogPosting"', "₹40,000"]],
  ["/course-finder", ["Find the course", "Course Finder"]],
  ["/compare", ["Compare Courses"]],
  ["/hire-from-us", ["Hire job-ready", "Agile Tribers"]],
  ["/roadmap", ["Pay After Placement Calculator"]],
  ["/sitemap.xml", ["/course-finder", "/compare", "/blog/", "/courses/category/"]],
];

/** Chat API probes: question -> substrings the answer must contain. */
const CHAT_CHECKS = [
  ["Can I compare courses side by side?", ["/compare"]],
  ["Which course should I take?", ["/course-finder", "MERN"]],
  ["Do you have a blog?", ["blog"]],
  ["Can my company hire from Karka?", ["hire", "Agile Tribers", "placement"]],
  ["What is Pay After Placement?", ["₹0 upfront", "/roadmap"]],
  ["Who won the IPL?", ["only help with questions about Karka"]],
];

let pass = 0;
let fail = 0;

function report(ok, label, detail = "") {
  if (ok) {
    pass++;
    console.log(`PASS  ${label}`);
  } else {
    fail++;
    console.log(`FAIL  ${label}${detail ? ` -> ${detail}` : ""}`);
  }
}

async function run() {
  console.log(`\n=== Route status (${BASE}) ===`);
  for (const [route, expected] of ROUTES) {
    try {
      const res = await fetch(`${BASE}${route}`, { redirect: "manual" });
      report(res.status === expected, `${route} => ${expected}`, `got ${res.status}`);
    } catch (err) {
      report(false, `${route} => ${expected}`, err.message);
    }
  }

  console.log("\n=== Rendered content ===");
  for (const [route, needles] of CONTENT_CHECKS) {
    try {
      const html = await (await fetch(`${BASE}${route}`)).text();
      for (const needle of needles) {
        report(html.includes(needle), `${route} contains "${needle}"`);
      }
    } catch (err) {
      report(false, `${route} content`, err.message);
    }
  }

  console.log("\n=== Chat API ===");
  for (const [question, needles] of CHAT_CHECKS) {
    try {
      const res = await fetch(`${BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "assistant", content: "Hi! I'm Karka Assistant." },
            { role: "user", content: question },
          ],
        }),
      });
      const text = await res.text();
      const lower = text.toLowerCase();
      const matched = needles.filter((n) => lower.includes(n.toLowerCase()));
      report(
        matched.length > 0,
        `"${question}" -> matched ${matched.length}/${needles.length}`,
        text.slice(0, 120)
      );
    } catch (err) {
      report(false, `chat "${question}"`, err.message);
    }
  }

  console.log("\n=== Chat feedback endpoint ===");
  try {
    const res = await fetch(`${BASE}/api/chat-feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: "helpful", messageId: "verify", answer: "test" }),
    });
    const body = await res.json();
    report(res.ok && body.success === true, "POST /api/chat-feedback accepts a rating");

    const bad = await fetch(`${BASE}/api/chat-feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: "nonsense" }),
    });
    report(bad.status === 400, "POST /api/chat-feedback rejects an invalid rating");
  } catch (err) {
    report(false, "chat-feedback", err.message);
  }

  console.log(`\n=== ${pass} passed / ${fail} failed ===`);
  process.exit(fail > 0 ? 1 : 0);
}

run();
