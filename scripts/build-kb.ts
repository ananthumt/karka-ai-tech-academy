import fs from "fs";
import path from "path";
import {
  SITE_CONFIG,
  NAV_LINKS,
  CTA_BAND,
  FOOTER_DATA,
  HOME_CONTENT,
  COURSES_PAGE_CONTENT,
  CATEGORIES_CONFIG,
  COURSES,
  ABOUT_PAGE_CONTENT,
  PLACEMENT_PAGE_CONTENT,
  ROADMAP_PAGE_CONTENT,
  AUDIENCE_DATA,
} from "../content/site";

export interface KBChunk {
  id: string;
  page: string;
  title: string;
  url: string;
  text: string;
}

export function buildKB(): KBChunk[] {
  const chunks: KBChunk[] = [];

  // 1. Academy Overview & Contact Details
  chunks.push({
    id: "general-overview-contact",
    page: "Home / Contact",
    title: "Karka AI & Tech Academy Overview, Location & Contact Details",
    url: "/contact",
    text: `Karka AI & Tech Academy is the one and only exclusive AI Learning Center located in Nagercoil, Tamil Nadu, India.
Contact Details:
- Phone: ${SITE_CONFIG.phone} (${SITE_CONFIG.phoneTel})
- WhatsApp: ${SITE_CONFIG.whatsappLink}
- Email: ${SITE_CONFIG.email}
- Hiring Partnership Inquiries: ${SITE_CONFIG.hireEmail}
- Physical Location: ${SITE_CONFIG.address} (Coordinates: Lat ${SITE_CONFIG.coordinates.lat}, Lng ${SITE_CONFIG.coordinates.lng})
- Google Maps Location: ${SITE_CONFIG.googleMapsUrl}
- Operating Hours: Monday to Saturday 09:00 AM - 06:00 PM.
Mission: Empowering the next generation of developers with GenAI Infused education and placement-focused mentorship.
Social Links: Facebook (${SITE_CONFIG.socials.facebook}), Instagram (${SITE_CONFIG.socials.instagram}), LinkedIn (${SITE_CONFIG.socials.linkedin}).`,
  });

  // 2. Home Hero & Impact
  chunks.push({
    id: "home-hero",
    page: "Home",
    title: "AI-Driven Software Developer Training & Placement Program",
    url: "/",
    text: `Karka AI & Tech Academy tagline: "${HOME_CONTENT.hero.tagline}".
Main Program Focus: AI-Driven Software Developer.
Students start learning with zero upfront tuition fees under the Pay After Placement model.
Key Highlights:
- AI Powered: Industry-first curriculum natively infused with Generative AI and automation.
- 100% Placement: Lifetime dedicated placement assistance.
Where Our Learners are Making an Impact - Hiring Companies:
Graduates work at top regional and multinational tech companies including Amazon, TCS, HCL, Matrimony, Novac, Capecom, Flow, and Sodisys.`,
  });

  // 3. Karka Platforms: Infini AI
  chunks.push({
    id: "platform-infini",
    page: "Home",
    title: "Karka Infini AI - Inter-College Student Competition",
    url: "https://infini.karka.academy/",
    text: `Karka Infini AI is an inter-college student competition organized by Karka Academy.
Total Prize Pool: ₹1,00,000 (One Lakh Rupees).
Motto: "Showcase Your Skills. Compete. Get Recognized. Win Big!"
Contests:
1. PaperPulse - Idea Presentation
2. TechRush - Technical Quiz
3. Bug Hunt - Debugging
4. SiteSprint - Website Building
5. Graphix - Poster Design
6. VibeCut - Video Creation
Competition Rounds:
- Round 1: Campus arena at your college.
- Round 2: District-level grand finale for the top 3 teams.
Rewards: Cash prizes, Karka Rolling Trophy & certificates.
Entry details: Free entry · Join multiple contests · Teams of 1–4 students.
Registration Link: https://infini.karka.academy/`,
  });

  // 4. Karka Platforms: Spike AI
  chunks.push({
    id: "platform-spike",
    page: "Home",
    title: "Spike AI - AI-Powered Learning Platform",
    url: "https://spike.karka.academy/",
    text: `Spike AI is the dedicated AI-powered learning platform created by Karka Academy.
Headline: "The AI-powered learning platform by Karka Academy."
Platform Prompt / Interface: "Ask Spike anything you're learning…"
Core Features:
1. AI-Guided: Learn with AI at your side for contextual code assistance.
2. Hands-On: Practise as you learn with interactive real-time exercises.
3. Progress: Track your growth and skill mastery milestones.
4. Mentor-Backed: Paired with live Karka mentors to review code and debug complex problems.
Access URL: https://spike.karka.academy/`,
  });

  // 5. Why Karka (6 Core Reasons)
  HOME_CONTENT.whyKarka.cards.forEach((card) => {
    chunks.push({
      id: `why-karka-${card.number}`,
      page: "Home",
      title: `Why Karka: ${card.title}`,
      url: "/#why-karka",
      text: `Reason ${card.number} to choose Karka AI Academy in Nagercoil: ${card.title}.
${card.description}`,
    });
  });

  // 6. Voices of Our Learners (Testimonials)
  chunks.push({
    id: "voices-testimonials",
    page: "Home",
    title: "Learner Success Stories & Video Testimonials",
    url: "/#voices",
    text: `Hear directly from our graduates about how Karka transformed their careers and helped them land their dream jobs in tech.
Featured Story: Gabriel Samraj, Frontend Developer at Capecom.
Quote: "Watch how Gabriel Samraj transformed their career directly from our campus to a top tech company."
Video Proof: Gabriel Samraj testimonial video available on site (/videos/gabrielsamraj.mp4).
Playlist Alumni: Gabriel Samraj, Prabin (Fullstack Engineer), Shiju (AI Software Developer), Kishore (React Developer), Sridevi (UI/UX Designer), and REC graduate.`,
  });

  // 7. 4 Pillars of a Job-Ready Tech Career
  chunks.push({
    id: "pillars-job-readiness",
    page: "Home / About Us",
    title: "The 4 Pillars of a Job-Ready Tech Career",
    url: "/about-us",
    text: `We don't just teach code; we build careers. Our holistic curriculum is designed to transform you into a complete professional through four pillars:
Pillar 01 - Master the Language of Business: Listening, Speaking, Reading, Writing corporate communication to engage international clients and teams.
Pillar 02 - Build Scalable Modern Apps: Web / Mobile, Data Analytics, UI/UX Design, Digital Marketing to develop production architectures.
Pillar 03 (Core Pillar) - AI Skills: Prompt Engineering, AI Automation, AI Tools, LLMs to 10x developer productivity.
Pillar 04 - Interview Skills: ATS Friendly Profile, Mock Interview, Group Discussion, Presentation Skills to crack recruitment drives.`,
  });

  // 8. Pay After You Get Hired Model
  chunks.push({
    id: "pay-after-placement-model",
    page: "Home / Roadmap",
    title: "Pay After You Get Hired / Pay After Placement (PAP) System",
    url: "/roadmap",
    text: `Zero Upfront Fees. Zero Risk. We're so confident in our training that we don't get paid until you do.
Steps:
1. Enroll & Learn: Learn from real mentors in live sessions, work on real-world projects.
2. Get Job Ready: Resume building, portfolio creation, and intensive mock interviews.
3. Get Paid, Not Billed: Focus on learning today. Share your success and pay fees only after you land a tech job.
Student Rating: 4.8 out of 5 based on 200 ratings, 190+ enrollments.
What's Included:
- 1:1 Mentorship
- Placement Training
- Resume & LinkedIn Preparation
- Mock Interviews
- Job Referral Support`,
  });

  // 9. Internship at Agile Tribers
  chunks.push({
    id: "internship-agile-tribers",
    page: "Home / Placement",
    title: "Internship Program: Experience Before You Graduate at Agile Tribers",
    url: "/placement",
    text: `Tag: INTERNSHIP - Experience Before You Graduate.
Stop worrying about "0 experience" on your resume. At Karka, every student works on real-time internship projects guided by industry mentors.
Gain the kind of hands-on experience that employers crave — and build a powerhouse portfolio before you even finish.
Key Features:
- Work on real client projects
- Build your project portfolio
- Learn Collaboration and Git workflows
- Receive official Internship Certificate from Agile Tribers product studio.`,
  });

  // 10. 8 Career Tracks
  HOME_CONTENT.careerTracks.tracks.forEach((track, i) => {
    chunks.push({
      id: `career-track-${i}`,
      page: "Home",
      title: `Career Track: ${track.category}`,
      url: "/courses",
      text: `Career Track: ${track.category} (${track.sub}).
${track.badge ? `Status: ${track.badge}.` : ""}
Programs included in this track: ${track.courses.join(", ")}.
Specialized internships and training pathways designed to launch your career.`,
    });
  });

  // 11. FAQ Chunks
  HOME_CONTENT.faqs.items.forEach((faq, idx) => {
    chunks.push({
      id: `faq-${idx}`,
      page: "Home / FAQs",
      title: `FAQ: ${faq.q}`,
      url: "/#faq",
      text: `Question: ${faq.q}
Answer: ${faq.a}`,
    });
  });

  // 12. Lead Form & Career Counseling
  chunks.push({
    id: "career-counseling-lead-form",
    page: "Home / Contact",
    title: "Free Career Counseling & Schedule Strategy Call",
    url: "/contact",
    text: `Let's Talk About Your Future: Schedule a free career call with our mentors. Fastest way to get answers to your doubts.
Available preferred programs for counseling: Full Stack Development, Data Science, UI/UX Design.
Motivation Quote: "Future belongs to those who never stop learning." (Karka Motivation).
Admissions Desk Phone: +91 9487530243.`,
  });

  // 13. Placement Records & Statistics
  chunks.push({
    id: "placement-records-stats",
    page: "Placement",
    title: "Karka Placement Records, Highest Package & Support Statistics",
    url: "/placement",
    text: `Our Placement Records: 100% Lifetime Placement Support. We don't just teach technology; we launch careers.
Verified Placement Statistics:
- Highest Package: 24 LPA
- Placement Rate: 100%
- Hiring Partners: 50+ hiring companies
- Average Salary Hike: 120%
Action Channels: Placement Assistance, Browse Courses (/courses), Job Openings (+91 9487530243).
Preparation Chips: Mock Interviews, HR Grooming, Resume & LinkedIn Building, Daily Placement Calls, 100% Job Assistance.
Interview & Placement Benefits: Dedicated Placement Officer, Two Weeks Placement Training, Portfolio Creation, Learn till job placement (LTP), Pay after job placement (PAP), Internship @AgileTribers, AI First Product Studio.
After Job Support: Up to 3 Months Support, Monthly Mentorship Sessions, Dedicated One-to-One Sessions.
Why After-Support?: We ensure you settle comfortably in your new role, helping you navigate corporate challenges and accelerate your initial growth.`,
  });

  // 14. Roadmap & Schedule
  chunks.push({
    id: "roadmap-steps-schedule",
    page: "Roadmap",
    title: "Roadmap: 8-Step Path to Success & Schedule Commitments",
    url: "/roadmap",
    text: `Your Path to Success: A transparent, step-by-step journey from learning to earning.
The 8 Steps:
1. Join Foundation: Gain experience with industry tools.
2. Expert Learning: Intensive Project Training.
3. Shared Success: Pay only after placement.
4. Placement Training: 2 Weeks Intensive Prep.
5. Free Internship: At Agile Tribers.
6. Interview Schedule: We line up interviews.
7. Success: Job Placement Achieved!
8. Payment: Pay ₹40,000 only after placement. (You only pay the fee of ₹40,000 once you secure a job).
Schedule & Commitment:
- Full-Time Program: Immersive Career Transformation, 30hrs/week = 10hr Live Sessions + 10hr Classroom Practice + 10hr Home Assignments (Dedicated 5 Days/Week Schedule).
- Part-Time Program: Flexible Upskilling for Working Professionals & College Students, 15hrs/week = 6hr Weekend Sessions + 5hr Self-Paced Practice + 4hr Mentor Reviews (Weekend & Evening Schedule).
Why Choose Pay After Placement?: We believe in our training quality so much that we only ask for the tuition fee once you secure a job. This model aligns our success with yours.`,
  });

  // 15. About Us: Founder & Story & Infrastructure
  chunks.push({
    id: "about-founder-mentor",
    page: "About Us",
    title: "Founder Sateesh Kumar, Mission, Vision & Infrastructure",
    url: "/about-us",
    text: `About Karka AI Academy: Redefining Tech Education.
Intro: ${ABOUT_PAGE_CONTENT.intro}
Our Story: ${ABOUT_PAGE_CONTENT.story.join(" ")}
Our Mission: ${ABOUT_PAGE_CONTENT.mission}
Our Vision: ${ABOUT_PAGE_CONTENT.vision}
Meet The Mentor:
Founder: Sateesh Kumar (Founder, Karka Software Academy | Agile Tribers).
Bio: With over 18+ years of experience in the tech industry, Sateesh has led engineering teams across the globe.
Credentials:
- Ex-CTO of Flow Global (UK Fintech)
- Worked with Wipro & Yatra.com
- Specialized in building AI-powered Web & Mobile Products
- LinkedIn: https://www.linkedin.com/in/ssateeshk/
Our Infrastructure:
- Cutting-Edge Tech Stack: Seamless online learning portals, interactive live-session frameworks, and high-performance LMS.
- Collaborative Spaces: Modern physical training labs built to foster peer interaction, experimentation, and collaborative problem-solving.`,
  });

  // 16. The Karka Advantage Comparison Matrix
  chunks.push({
    id: "about-karka-advantage",
    page: "About Us",
    title: "The Karka Advantage vs Traditional Institutes",
    url: "/about-us",
    text: `The Karka Advantage ("We've dismantled the traditional education model and rebuilt it around your success"):
Comparison breakdown:
- AI-Based Curriculum: Karka AI = Yes (Native across all tracks) vs Others = Rarely / Basic Overview
- AI Tools: Karka AI = Yes (Integrated daily) vs Others = No
- AI Bootcamp: Karka AI = Yes (Included) vs Others = No
- Exercises & Tasks: Karka AI = 200+ Hands-on Tasks vs Others = Limited / Homework only
- Mini Projects: Karka AI = Up to 5 Real-world Projects vs Others = 1-2 Basic Projects
- Capstone Projects: Karka AI = Production-grade Deployments vs Others = Academic Style
- Learn Till Job Placement: Karka AI = Yes (Ongoing mentoring) vs Others = Fixed duration only
- Pay After Placement: Karka AI = Yes (₹0 Upfront Tuition) vs Others = Strict Upfront Fees
- Full-time / Part-time: Karka AI = Flexible Modes Available vs Others = Rigid Timings
- Industry Driven Curriculum: Karka AI = Curated by Tech CTOs & Leads vs Others = Outdated Textbook Syllabus
- Free Program Switch: Karka AI = Supported within initial trial vs Others = No
- Repeat Course Option: Karka AI = Free Refresher Access vs Others = Pay Again`,
  });

  // 17. Audience Pages (Graduates, School, College, Professionals)
  chunks.push({
    id: "audience-graduates",
    page: "For Graduates",
    title: "Programs For Graduates",
    url: "/for-graduates",
    text: `For Graduates: Kickstart your career with job-ready skills.
Badges: 100% Placement Support, Hands-on Capstone Projects, 1:1 Industry Mentorship.
Curricula include Fullstack Web Development, Generative AI Mastery, Data Science & Machine Learning, UI/UX Design, Digital Marketing, Cloud DevOps, and Business Analysis.`,
  });

  chunks.push({
    id: "audience-school-students",
    page: "For School Students",
    title: "Programs For School Students & Kids",
    url: "/for-school-students",
    text: `For School Students: Start your coding journey while in school.
Description: Coding is the new literacy. Learning to code in school improves logical thinking, problem-solving abilities, and prepares students for the high-tech careers of the future.
Featured Program: Python for Kids (Interactive introduction to programming logic, building games and animations).
Badges: Foundations of Logic, Creative Coding & Games, Future-Ready Skills.`,
  });

  chunks.push({
    id: "audience-college-students",
    page: "For College Students",
    title: "Programs For College Students",
    url: "/for-college-students",
    text: `For College Students: Learn from the best, with industry aligned programs.
Badges: Industry Aligned Projects, AgileTribers Internship, Weekend & Evening Slots.
Offers semester-compatible internships, fullstack development, backend APIs, and campus placement prep.`,
  });

  chunks.push({
    id: "audience-professionals",
    page: "For Professionals",
    title: "Programs For Working Professionals & Career Switchers",
    url: "/for-professionals",
    text: `For Professionals: Upskill and switch to your dream tech career.
Badges: Flexible Weekend Batches, Advanced Tech Stack, Professional Networking.
Designed for working professionals looking to transition into software engineering, Generative AI, cloud infrastructure, or data analytics with evening and weekend flexibility.`,
  });

  // 18. All 26 Individual Course Chunks
  Object.values(COURSES).forEach((c) => {
    const modulesText = c.curriculum
      ? c.curriculum
          .map((m, i) => `Module ${i + 1}: ${m.module} (${m.topics.join(", ")})`)
          .join(". ")
      : "";

    const whyText = c.whyLearn
      ? c.whyLearn.map((w) => `${w.title}: ${w.desc}`).join(". ")
      : "";

    const faqsText = c.faqs
      ? c.faqs.map((f) => `Q: ${f.q} A: ${f.a}`).join(" | ")
      : "";

    chunks.push({
      id: `course-${c.slug}`,
      page: `Course: ${c.title}`,
      title: `${c.title} - Duration, Curriculum & Overview`,
      url: `/courses/${c.slug}`,
      text: `Course Name: ${c.title}. URL: /courses/${c.slug}.
Duration: ${c.details?.duration || "6 Months"}. Level: ${c.details?.level || "Beginner to Advanced"}. Total Lessons: ${c.details?.lessons || "48 Lessons"}. Training Mode: ${c.details?.mode || "Offline / Online"}.
Batch Schedule: Batch Starts on Starts Soon.
Hero Overview: ${c.heroDesc}
Program Overview: ${c.overview}
Why Learn ${c.title}: ${whyText}
Curriculum Syllabus: ${modulesText}
Instructor: ${c.instructor?.name || "Senior Industry Mentor"} (${c.instructor?.role || "Staff Software Architect"}, ${c.instructor?.company || "Karka Tech Network"}, ${c.instructor?.exp || "8+ Years"}).
Course FAQs: ${faqsText}
Admission Process: 1. Application, 2. Counseling, 3. Enrollment with Pay After Placement zero upfront fees.`,
    });
  });

  // 19. Self-serve tools on the website (course finder, comparison, calculator)
  chunks.push({
    id: "tools-course-finder",
    page: "Course Finder",
    title: "Course Finder - Free 60-Second Course Recommendation Assessment",
    url: "/course-finder",
    text: `Karka Course Finder is a free assessment at /course-finder that recommends the right program for you.
It asks four questions: your current background (college graduate or final year, current college student, working professional or career switcher, or school student), the domain that interests you (web and fullstack, generative AI and LLMs, data science and ML, UI/UX and web design, video and animation, digital marketing and SEO, DevOps cloud and QA, or business and finance), your main career goal (land a full-time software job, switch careers from non-IT, upskill with Generative AI, or freelance and remote agency work), and your preferred learning format (in-person studio lab at the Nagercoil campus, live interactive online, or flexible either mode).
It then ranks all ${Object.keys(COURSES).length} verified Karka programs and shows your top 3 matches with a match percentage, the reason it fits you, the verified duration, level and mode, and the ₹0 upfront Pay After Placement terms.
It takes about 60 seconds, is completely free, and needs no sign-up or email. The same assessment is also available inside the Karka Assistant chat widget via the "Find Course" button.
Takes you to: /course-finder.`,
  });

  chunks.push({
    id: "tools-course-compare",
    page: "Compare Courses",
    title: "Compare Courses Side by Side - Duration, Level, Mode & Curriculum",
    url: "/compare",
    text: `The Karka course comparison tool at /compare lets you put up to 3 programs side by side.
For each selected course it shows the category, duration, level, number of lessons, training mode, tuition, the number of curriculum modules and their names, and the assigned mentor.
Tuition is identical across every Karka track: ₹0 upfront and a flat ₹40,000 payable only after placement, so you can choose a course on fit rather than price.
You can search all ${Object.keys(COURSES).length} courses by name, filter by one of the 8 category tracks, or start from a popular preset comparison such as MERN Fullstack vs React + Java Fullstack vs React + Python Fullstack, or AI & Data Science vs Data Analytics with AI vs Data Engineering, or UI/UX Design vs Web Designing vs Graphic Designing.
A comparison can be shared by copying the page URL.
Takes you to: /compare.`,
  });

  chunks.push({
    id: "tools-pap-calculator",
    page: "Roadmap",
    title: "Pay After Placement Savings Calculator - Compare the Real Cost of Training",
    url: "/roadmap",
    text: `The Pay After Placement calculator on /roadmap lets you compare the real cost of your training.
You enter the upfront fee another institute has quoted you and your own expected starting salary, and choose a training length of 3, 6 or 8 months.
It then shows the cash you need before you start (₹0 at Karka versus the full upfront fee elsewhere), the total tuition paid (a flat ₹40,000 at Karka, payable only after placement), the amount spread across your chosen training window, and how many months of your expected salary the ₹40,000 fee represents.
The comparison figures are numbers you enter yourself: Karka does not publish or endorse other institutes' pricing. The only Karka figures used are the published model of ₹0 upfront tuition and a flat ₹40,000 after placement. Salary outcomes are never guaranteed.
Takes you to: /roadmap.`,
  });

  // 20. Hire From Us (recruiter-facing)
  chunks.push({
    id: "hire-from-us",
    page: "Hire From Us",
    title: "Hire From Us - Recruiting Karka Graduates",
    url: "/hire-from-us",
    text: `Companies can hire Karka graduates via /hire-from-us.
Karka graduates arrive having shipped production software for live clients during a 2-month internship at Agile Tribers, Karka's in-house product studio, and carry an ATS-formatted verified portfolio with live project previews.
Before reaching a recruiter, candidates complete two weeks of intensive placement training covering portfolio building, mock technical interviews, group discussions and HR grooming.
Placement record: highest package 24 LPA, 100% placement rate, 50+ hiring partners, 120% average salary hike. Companies already hiring from Karka include Amazon, TCS, HCL, Matrimony.com, Novac Technology, Capecom Solutions, Flow Global and Sodisys.
Hiring process: 1. Share your role brief. 2. Karka's placement cell shortlists verified candidates and sends ATS-formatted portfolios. 3. You interview on your own process, with a 48-hour interview scheduling turnaround. 4. You make the offer directly, and Karka continues monthly mentorship for the new hire for up to 3 months.
Hiring partnership contact: ${SITE_CONFIG.hireEmail} or phone ${SITE_CONFIG.phone}.
Takes you to: /hire-from-us.`,
  });

  // 21. Blog / editorial index
  chunks.push({
    id: "blog-insights-index",
    page: "Blog",
    title: "Karka Insights & Guides - Articles on Careers, AI and Pay After Placement",
    url: "/blog",
    text: `Karka publishes career and technology guides at /blog, written by the mentors who run the labs in Nagercoil.
Current articles:
1. "How to Land Your First Tech Job in 2026 Using GenAI Workflows" by founder Sateesh Kumar — what hiring teams now look for in a fresher portfolio, how to use AI tooling without outsourcing your judgement, and how to build three projects a reviewer will actually open. Read at /blog/how-to-land-first-software-job-with-genai.
2. "MERN Stack vs Python Full Stack: Which Bootcamp Fits Your Ambition?" by the Karka Mentorship Team — learning curve, what each role actually looks like day to day, and how to choose. Read at /blog/mern-vs-fullstack-python-comparison.
3. "The Truth Behind Pay After Placement: Why Zero Upfront Fees Align Incentives" by the Academic Advisory Desk — how the model works, why the ordering of payment changes behaviour, and the questions to ask any institute before enrolling. Read at /blog/the-real-truth-about-pay-after-placement.
Takes you to: /blog.`,
  });

  return chunks;
}

// Script entry point
if (require.main === module || process.argv[1]?.includes("build-kb")) {
  const contentDir = path.resolve(__dirname, "../content");
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  const kb = buildKB();
  const destPath = path.join(contentDir, "kb.json");
  fs.writeFileSync(destPath, JSON.stringify(kb, null, 2), "utf-8");
  console.log(`[KB Builder] Successfully generated ${kb.length} chunks into ${destPath}`);
}
