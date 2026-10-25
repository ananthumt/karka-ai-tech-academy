# Karka AI & Tech Academy — Official Production Platform & AI Assistant

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.14-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.0.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lenis Scroll](https://img.shields.io/badge/Lenis_Scroll-1.3.26-FF4F00?style=for-the-badge)](https://lenis.darkroom.engineering/)
[![Sharp Engine](https://img.shields.io/badge/Sharp-0.33.5-99CC00?style=for-the-badge&logo=sharp&logoColor=white)](https://sharp.pixelplumbing.com/)
[![Build Status](https://img.shields.io/badge/Build-66%20Routes%20Passing-2ea44f?style=for-the-badge&logo=githubactions&logoColor=white)](#-verification--quality-gates)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](#-license--legal)

<br/>

**The official web platform and grounded conversational AI assistant for [Karka AI & Tech Academy](https://www.karka.academy/) — Nagercoil, Tamil Nadu, India.**

<br/>

[⚠️ Drag & Drop Guide](#-drag--drop-github-upload-guide-important) • [Features](#-core-features--interactive-systems) • [All 26 Courses](#-academic-catalog--26-career-tracks) • [API Reference](#-complete-rest-api-reference) • [Architecture](#-architecture--performance) • [Quick Start](#-quick-start--local-setup)

</div>

---

## ⚠️ Drag & Drop GitHub Upload Guide (IMPORTANT)

> [!CAUTION]
> ### 🛑 DO NOT DRAG `node_modules/` OR `.next/` INTO GITHUB!
> GitHub's web interface has strict upload limits:
> - **Max 100 files per upload**
> - **Max 25 MB per single file**
> 
> The `node_modules` folder contains over **25,000 files and 500 MB** of dependencies. If you drag the entire project folder directly onto GitHub, your browser will freeze, throw network errors, and fail to upload.

### ✅ Exactly What to Upload:

Only upload the source code files. Select and drag **ONLY** these folders and files:

```text
📁 app/                     <-- Core Next.js App Router pages and API routes
📁 components/              <-- UI components, hero, quiz, chat drawer, animations
📁 content/                 <-- Course data (site.ts), blog articles, and kb.json
📁 lib/                     <-- BM25 search, scroll store, and recommendation engine
📁 public/                  <-- Optimized WebP assets, logos, and icons
📁 scripts/                 <-- Build, verification, and audit automation scripts
📄 package.json             <-- Project metadata and scripts
📄 package-lock.json        <-- Dependency version lockfile
📄 tsconfig.json            <-- TypeScript strict configuration
📄 tailwind.config.ts       <-- Tailwind CSS styling tokens and theme
📄 postcss.config.mjs       <-- PostCSS configuration
📄 next.config.mjs          <-- Next.js production settings
📄 README.md                <-- This documentation file
📄 .gitignore               <-- Excludes node_modules and .next automatically
📄 .env.example             <-- Environment variable template
```

### ❌ NEVER Upload:
- ❌ `node_modules/` (Automatically re-created by running `npm install`)
- ❌ `.next/` (Build output folder, re-created by running `npm run build`)
- ❌ `.env.local` or `.env` (Contains private API keys)
- ❌ `data/leads.json` (Local student enquiry submissions)

---

### 🖱️ Step-by-Step Drag & Drop Instructions:

1. **Create an Empty Repository on GitHub**:
   - Go to **[github.com/new](https://github.com/new)**.
   - Set **Repository name** (e.g., `karka-academy-platform`).
   - Choose **Public** or **Private**.
   - **IMPORTANT**: Leave *"Add a README file"*, *"Add .gitignore"*, and *"Choose a license"* **UNCHECKED**.
   - Click **Create repository**.

2. **Open the Web Uploader**:
   - On the empty repository page, look for the text:
     > *"Get started by creating a new file or **uploading an existing file**."*
   - Click **"uploading an existing file"**.

3. **Drag and Drop the Source Files**:
   - Open your file manager (`c:\Users\VICTUS\Downloads\KARKA_AI_Claude_Upload`).
   - Select all the **allowed items** listed in the green checklist above.
   - Drag and drop them directly into the GitHub browser window.

4. **Commit the Files**:
   - Scroll down to the **Commit changes** box.
   - Enter a commit message: `feat: initial release of Karka AI Academy platform`.
   - Select **Commit directly to the `main` branch**.
   - Click **Commit changes**.

---

### 💡 Alternative: 1-Click Publishing via VS Code (Easiest)

If you have **Visual Studio Code** installed:
1. Open this folder in VS Code (`File > Open Folder...`).
2. Press `Ctrl + Shift + G` (or click the **Source Control** icon on the left bar).
3. Click the blue **"Publish to GitHub"** button.
4. Choose **Public** or **Private**.
5. VS Code will automatically upload the clean project without touching `node_modules`.

---

## 📌 Executive Summary & Academy Background

**Karka AI & Tech Academy** is an exclusive, industry-immersive software training institute headquartered in **Nagercoil, Kanyakumari District, Tamil Nadu, India**. 

The academy bridges the critical gap between academic university education and modern tech company expectations. Karka empowers students through hands-on project building, Generative AI tooling, and a disruptive **₹0 Upfront Pay-After-Placement (PAP)** financial model.

### Academy Coordinates & Official Channels
- **Headquarters**: Academy HQ, Nagercoil, Tamil Nadu 629001, India
- **Coordinates**: Latitude `8.1801487° N`, Longitude `77.4311084° E`
- **Phone / Admissions**: `+91 9487530243`
- **Direct WhatsApp**: [wa.me/919487530243](https://wa.me/919487530243)
- **General Inquiries**: `contact@karka.academy`
- **Official Website**: [https://www.karka.academy/](https://www.karka.academy/)
- **Social Media**:
  - [LinkedIn: Karka Academy](https://www.linkedin.com/company/karka-academy/)
  - [Instagram: @karka.ai](https://www.instagram.com/karka.ai/)
  - [Facebook: karka.academy](https://www.facebook.com/karka.academy)

---

## ⚡ Performance Highlights & Engineering Standards

```text
┌────────────────────────────────────────────────────────────────────────┐
│  ENGINEERING HIGHLIGHTS & QUALITY METRICS                              │
├────────────────────────────────────────────────────────────────────────┤
│  ⚡ Prerendered Pages       : 66 static HTML/JSON routes (0ms TTFB)    │
│  🚀 Momentum Scrolling     : 60 FPS hardware RAF sync via Lenis       │
│  🎯 Style Invalidation     : 0 DOM recalculations (direct GPU trans.) │
│  🛡️ Adversarial Security   : 45-case adversarial prompt injection gate│
│  🤖 Grounded Assistant     : 34-case deterministic BM25 test suite    │
│  🔍 SEO & Structured Data  : Full Schema.org JSON-LD (Org, Course, FAQ)│
│  🌓 Theme Transitions      : Zero-flicker instant light/dark render   │
│  📱 Mobile Responsiveness  : Touch gesture passthrough & safe areas   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Core Features & Interactive Systems

### 1. 🎓 Academic Catalog & Detailed Course Pages
- **26 Comprehensive Career Tracks**: Dedicated prerendered pages (`/courses/[slug]`) featuring syllabus modules, tools learned, prerequisite checks, career paths, instructor biographies, and course-specific FAQs.
- **Unified Typed Data Model**: Single source of truth in `content/site.ts` guaranteeing 100% data consistency between the website, JSON-LD schemas, and AI assistant search chunks.

### 2. 🧭 Interactive 60-Second Course Finder (`/course-finder`)
- **Dynamic Assessment Engine**: An interactive 4-step quiz evaluating:
  1. *Current Academic/Career Background* (Non-IT, CS Graduate, Working Professional, High Schooler).
  2. *Primary Career Ambition* (High-Salary Full-Stack, AI Engineering, Visual Design, Cloud/DevOps).
  3. *Preferred Learning Style* (Visual Project-Based, Backend Logic, Mathematical/Analytical).
  4. *Weekly Commitment Hours* (Full-time Bootcamp vs Part-time Weekend).
- **Matching Algorithm**: Uses weighted category matrices in `lib/recommendation.ts` to compute match scores and deliver personalized course recommendations with immediate enrollment CTAs.

### 3. ⚖️ Side-by-Side Course Comparator (`/compare`)
- **Multi-Program Analysis**: Compare up to 3 programs simultaneously across:
  - Duration & Total Lessons
  - Difficulty Level & Prerequisites
  - Delivery Mode (Online / Offline Classroom)
  - Core Tech Stack & Frameworks
  - Career Roles & Average Placement Packages
  - Pay-After-Placement Eligibility
- **Stateful URL Sharing**: Comparison configurations serialize directly to URL search parameters (`/compare?courses=mern-fullstack,react-python-fullstack`), allowing counselors to share customized comparison sheets with prospective students.

### 4. 💰 Pay-After-Placement (PAP) Financial Calculator (`/roadmap`)
- **Transparent ₹0 Upfront Tuition**: Students learn with zero upfront financial burden and pay a fixed fee of ₹40,000 only after securing a qualifying tech job.
- **Dynamic ROI Calculator**: Compares traditional up-front coaching institutes with Karka's PAP model, detailing net earnings, payback thresholds, and risk-free job security.

### 5. 🤖 Grounded Conversational AI Counselor
- **Zero-Dependency BM25 Engine**: Sub-millisecond vector retrieval over 68 curated curriculum knowledge chunks (`content/kb.json`) with BM25 title weighting, phrase boosting, and token scoring.
- **Swappable LLM Cascade**: Connects to Google Gemini (with automatic fallback across `gemini-3.8-flash`, `gemini-3.5-flash-lite`, and `gemini-2.5-flash`), Anthropic Claude 3.5 Sonnet, or OpenAI GPT-4o.
- **Deterministic Offline Fallback**: If no API key is provided or external services are unreachable, the assistant synthesizes grounded responses directly from local KB data.
- **Voice STT & TTS**: Web Speech API speech-to-text recognition with live mic input and browser voice playback.
- **Direct WhatsApp Handoff**: One-click transfer of user queries to human academic advisors via WhatsApp with pre-filled context.

### 6. 🛡️ 5-Stage Adversarial Scope Gate
- Built-in filter protecting against:
  - System prompt extraction and jailbreaks ("Ignore previous instructions...")
  - Malicious SQL, code execution, or bash scripts
  - Competitor comparisons and pricing speculation
  - Off-topic general trivia, homework, or medical/legal advice
  - Abusive language and profanity

### 7. 📈 Lead Generation & Webhook Dispatcher
- **Serverless Resilience**: Collects student admissions inquiries via `/api/leads`. On serverless platforms (Vercel, Netlify) with ephemeral read-only file systems, leads are automatically dispatched to external webhooks (Slack, Zapier, Make, HubSpot, Google Sheets) with fallback to direct WhatsApp engagement.

### 8. 🏎️ Ultra-Smooth 60 FPS Momentum Scrolling
- **Lenis Engine Integration**: Tuned smooth scrolling (`duration: 0.75`, `wheelMultiplier: 1.0`, `touchMultiplier: 0`).
- **Elimination of Scroll Fighting**: Enforced `scroll-behavior: auto !important` on `.lenis.lenis-smooth` to prevent conflicts between CSS smooth scrolling and JavaScript frame updates.
- **Compositor-Layer Progress Bar**: Scroll reading progress updates directly via DOM transform refs, avoiding whole-document CSS style invalidation.
- **Gesture Isolation**: Horizontal touch sliders isolated using `data-lenis-prevent`.

---

## 📚 Academic Catalog — 26 Career Tracks

| Category | Slug | Program Title | Duration | Delivery Mode |
|---|---|---|---|---|
| **Coding & Full Stack** | `mern-fullstack` | MERN Fullstack Development | 6 Months | Offline / Online |
| | `react-java-fullstack` | React & Java Fullstack Development | 6 Months | Offline / Online |
| | `react-python-fullstack` | React & Python Fullstack Development | 6 Months | Offline / Online |
| **Generative AI & LLMs** | `genai-foundations` | Generative AI Foundations | 2 Months | Offline / Online |
| | `genai-mastery` | Generative AI Mastery | 4 Months | Offline / Online |
| | `genai-llm-developer` | GenAI & LLM Application Developer | 4 Months | Offline / Online |
| **Data, ML & AI** | `ai-data-science` | Artificial Intelligence & Data Science | 6 Months | Offline / Online |
| | `data-analytics-ai` | Data Analytics with AI | 4 Months | Offline / Online |
| | `data-engineering` | Big Data & Data Engineering | 6 Months | Offline / Online |
| **Design & UI/UX** | `ui-ux-design` | UI/UX Product Design & Figma | 3 Months | Offline / Online |
| | `web-designing` | Responsive Web Design & Webflow | 3 Months | Offline / Online |
| | `graphic-designing` | Professional Graphic Design | 3 Months | Offline / Online |
| **Digital Media** | `video-editing` | Video Editing & Motion Graphics | 3 Months | Offline / Online |
| | `graphic-designing-dm` | Graphic Design & Digital Media | 3 Months | Offline / Online |
| | `multimedia-animation`| 3D Multimedia & Animation | 6 Months | Offline / Online |
| **Marketing & Growth** | `digital-marketing` | Digital Marketing & Growth Hacking | 3 Months | Offline / Online |
| | `seo-analyst` | Search Engine Optimization (SEO) | 2 Months | Offline / Online |
| | `storytelling-content-writing` | Storytelling & Content Strategy | 2 Months | Offline / Online |
| **Cloud & Systems** | `cloud-devops` | Cloud Engineering & DevOps (AWS/Docker)| 4 Months | Offline / Online |
| | `automation-testing` | QA Automation Testing (Selenium/Cypress) | 3 Months | Offline / Online |
| | `mobile-app-development` | Cross-Platform Mobile Apps (Flutter/React Native) | 4 Months | Offline / Online |
| **Business & Finance** | `business-analyst` | Business Analyst & Agile Scrum | 3 Months | Offline / Online |
| | `tally` | Tally Prime & Modern Accounting | 2 Months | Offline / Online |
| | `hr-finance` | Human Resources & Financial Systems | 3 Months | Offline / Online |
| **Junior & Internship**| `python-for-kids` | Python Coding & STEM for Kids | 2 Months | Offline Classroom |
| | `fullstack-internship` | Industry Software Engineering Internship | 3 Months | In-Office |

---

## 🔌 Complete REST API Reference

### 1. Conversational AI Assistant — `POST /api/chat`

Handles student inquiries using BM25 semantic retrieval and swappable LLM synthesis.

- **Endpoint**: `/api/chat`
- **Method**: `POST`
- **Rate Limit**: 60 requests per 10-minute window per IP.

#### Request Headers:
```http
Content-Type: application/json
```

#### Request Body Schema:
```json
{
  "userQuery": "What is the duration and fee structure of the MERN fullstack course?",
  "history": [
    { "role": "user", "content": "Hi" },
    { "role": "assistant", "content": "Hello! Welcome to Karka AI & Tech Academy. How can I help you today?" }
  ],
  "provider": "gemini",
  "model": "gemini-3.5-flash-lite"
}
```

#### Response Body Schema (Success - `200 OK`):
```json
{
  "answer": "Karka's MERN Fullstack Development program runs for 6 Months. Under our Pay After Placement model, you learn with ₹0 upfront tuition fees and pay ₹40,000 only after securing a tech job. Learn more at /courses/mern-fullstack or /roadmap.",
  "intent": "course_info",
  "confidence": 0.95,
  "references": [
    { "title": "MERN Fullstack Development", "slug": "mern-fullstack", "url": "/courses/mern-fullstack" },
    { "title": "Pay After Placement Model", "slug": "roadmap", "url": "/roadmap" }
  ],
  "suggestedActions": [
    { "label": "View Syllabus", "action": "navigate", "url": "/courses/mern-fullstack" },
    { "label": "Chat on WhatsApp", "action": "link", "url": "https://wa.me/919487530243" }
  ]
}
```

---

### 2. Anonymous AI Answer Feedback — `POST /api/chat-feedback`

Logs thumbs up/down satisfaction ratings to refine answer quality.

- **Endpoint**: `/api/chat-feedback`
- **Method**: `POST`
- **Privacy Assurance**: Collects zero PII, zero cookies, and zero user transcripts.

#### Request Body Schema:
```json
{
  "rating": "helpful",
  "messageId": "msg_1729845123",
  "answer": "Karka provides 100% dedicated placement support with career mentorship..."
}
```

#### Response (`200 OK`):
```json
{ "success": true }
```

---

### 3. Student Lead & Admission Capture — `POST /api/leads`

Submits admissions inquiries from consultation forms, landing modals, and course sidebars.

- **Endpoint**: `/api/leads`
- **Method**: `POST`
- **Rate Limit**: 10 submissions per 10-minute window per IP.

#### Request Body Schema:
```json
{
  "name": "Arun Kumar",
  "phone": "+91 9876543210",
  "email": "arun.kumar@example.com",
  "program": "mern-fullstack",
  "source": "Course Detail Sticky CTA"
}
```

#### Response Schema (`200 OK`):
```json
{
  "success": true,
  "message": "Thank you for reaching out! Our academic admissions team will contact you within 24 hours.",
  "leadId": "lead_1729845981245"
}
```

---

## 🛠 Tech Stack Architecture

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | `14.2.15` | Hybrid Server/Client Components, static export generation |
| **Language** | TypeScript | `5.6.3` | Strict type safety across content models and components |
| **Styling** | Tailwind CSS | `3.4.14` | High-performance atomic CSS with custom design tokens |
| **Post-Processing** | PostCSS + Autoprefixer| `8.4.47` | Cross-browser CSS prefixes and syntax validation |
| **Motion** | Framer Motion | `14.0.0` | GPU-accelerated micro-interactions and enter transitions |
| **Scrolling** | Lenis Scroll | `1.3.26` | Hardware-synchronized momentum scroll orchestration |
| **Iconography** | Lucide React | `0.453.0` | Tree-shakable, accessible SVG vector icons |
| **Image Engine** | Sharp | `0.33.5` | Automated WebP compression and dimension audits |
| **TypeScript CLI** | tsx | `4.23.15` | Fast zero-config execution of TypeScript scripts |

---

## ⚡ Quick Start & Local Setup

### System Prerequisites
- **Node.js**: `v18.17.0` or `v20.x` or higher
- **npm**: `v9.x` or higher

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/karka-academy.git
cd karka-academy
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser. All 26 courses, the course finder, comparator, and offline AI counselor work immediately.

### 3. Run Production Build & Verification
```bash
# Builds the production bundle and executes all automated test suites
npm run check

# Serve the production build locally
npm run start
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in your root directory (template provided in `.env.example`):

```ini
# =====================================================================
# LLM Provider Configuration (Optional)
# If unset, the AI assistant runs locally in deterministic BM25 offline mode
# =====================================================================
LLM_PROVIDER="gemini"
LLM_API_KEY="your-gemini-api-key"
LLM_MODEL="gemini-3.5-flash-lite"

# =====================================================================
# Lead Capture Webhooks (Optional)
# Recommended for serverless deployments (Vercel, Netlify)
# =====================================================================
LEADS_WEBHOOK_URL="https://hooks.slack.com/services/T00/B00/XXXXX"
CHAT_FEEDBACK_WEBHOOK_URL="https://hooks.slack.com/services/T00/B00/YYYYY"

# =====================================================================
# Canonical Site URL
# =====================================================================
NEXT_PUBLIC_SITE_URL="https://www.karka.academy"
```

---

## 📜 All Available Scripts

| Script | Command Line | Description |
|---|---|---|
| `npm run dev` | `next dev` | Starts local Next.js dev server on port 3000 |
| `npm run dev:clean` | `node scripts/ensure-clean-next.mjs force && next dev` | Flushes `.next` chunk cache and starts dev server |
| `npm run build` | `npm run build:kb && npm run build:assets && next build` | Compiles KB index, generates brand assets, and builds static app |
| `npm run start` | `next start` | Runs the production Next.js server |
| `npm run typecheck` | `tsc --noEmit` | Validates TypeScript across all files with strict compiler checks |
| `npm run check` | `npm run build && npm run verify:all` | **Recommended CI check**: Runs full build and all test suites |
| `npm run verify:all` | `node scripts/verify-all.mjs` | Executes routes, chatbot, and adversarial scope-gate test suites |
| `npm run test:chat` | `tsx scripts/test-chatbot.ts` | Runs 34-case deterministic validation of AI assistant |
| `npm run test:scope` | `node scripts/test-scope.mjs` | Runs 45-case prompt injection and jailbreak scope-gate suite |
| `npm run check:css` | `node scripts/check-css.mjs` | Validates PostCSS syntax and Tailwind token compilation |
| `npm run images:audit` | `node scripts/audit-images.mjs` | Audits image dimensions and byte weights in `public/assets` |
| `npm run images:optimize` | `node scripts/optimize-images.mjs` | Losslessly recompresses images using Sharp |
| `npm run build:kb` | `tsx scripts/build-kb.ts` | Rebuilds `content/kb.json` from typed data in `content/site.ts` |

---

## 📂 Directory & File Architecture

```text
karka-academy/
├── app/
│   ├── layout.tsx                 # Root layout, Google Font fallbacks, dark mode script, metadata
│   ├── page.tsx                   # Server-rendered homepage with JSON-LD schema
│   ├── template.tsx               # Instant-paint layout wrapper (eliminates blank-screen flash)
│   ├── globals.css                # Tailwind directives, custom color tokens, Lenis scroll rules
│   ├── not-found.tsx              # Custom 404 page with course discovery recommendations
│   ├── error.tsx                  # Global error boundary with recovery action buttons
│   ├── api/
│   │   ├── chat/route.ts          # Grounded AI assistant endpoint (BM25 + LLM cascade)
│   │   ├── chat-feedback/route.ts # Anonymous thumbs up/down rating analytics
│   │   └── leads/route.ts         # Student enquiry capture and webhook dispatcher
│   ├── courses/                   # Prerendered course catalog and individual course pages
│   ├── course-finder/             # Interactive 60-second course recommendation quiz
│   ├── compare/                   # Side-by-side multi-course comparison engine
│   ├── roadmap/                   # Learning journey & Pay After Placement calculator
│   └── placement/                 # Placement statistics, hiring partners, alumni outcomes
├── components/
│   ├── HomeView.tsx               # Client homepage layout & section coordinator
│   ├── HeroSection.tsx            # Cinematic hero with editorial typography & CTAs
│   ├── AlumniOutcomesGrid.tsx     # Verified alumni hiring wall
│   ├── CourseFinderQuiz.tsx       # Multi-step recommendation engine
│   ├── CourseComparisonView.tsx   # Interactive 3-way course comparison matrix
│   ├── ChatWidget/                # Conversational AI assistant with voice STT/TTS
│   └── motion/                    # SmoothScroll, ScrollToTop, StickyStory primitives
├── content/
│   ├── site.ts                    # Single source of truth: courses, academy info, tracks
│   ├── blog.ts                    # Career guides and technical articles
│   └── kb.json                    # Pre-indexed knowledge base for the AI assistant
├── lib/
│   ├── scroll-store.ts            # High-performance passive RAF scroll manager
│   ├── recommendation.ts          # Course matching algorithm for quiz
│   └── kb.ts                      # BM25 vector search and ranking algorithm
├── public/
│   ├── assets/                    # Optimized WebP images, banners, and partner logos
│   └── videos/                    # Academy campus media
└── scripts/
    ├── ensure-clean-next.mjs      # Cache cleaner preventing dev/prod chunk collision
    ├── build-kb.ts                # BM25 knowledge base builder
    ├── verify-routes.mjs          # Route status & content assertion runner
    ├── verify-all.mjs             # Unified testing orchestrator (all suites)
    ├── test-chatbot.ts            # Deterministic AI chat test suite
    ├── test-scope.mjs             # Adversarial scope gate test suite
    └── check-css.mjs              # PostCSS CSS parsing validator
```

---

## 🌐 Deployment (Vercel, Netlify, Self-Hosted)

### Deploying to Vercel (1-Click)
1. Fork or push this repository to GitHub.
2. Sign in to **[Vercel](https://vercel.com/)** and select **"Add New" > "Project"**.
3. Import your GitHub repository.
4. Next.js is detected automatically. No build adjustments are necessary.
5. In **Environment Variables**, optionally set:
   - `LLM_PROVIDER`: `gemini`
   - `LLM_API_KEY`: *(Your Google AI Studio API key)*
   - `LEADS_WEBHOOK_URL`: *(Your Slack or CRM webhook URL)*
6. Click **Deploy**. The site will build and deploy to a global CDN in under 90 seconds.

---

## ❓ Frequently Asked Questions (FAQ)

<details>
<summary><b>1. Can I deploy and run this site without any paid LLM API keys?</b></summary>
<br/>
<b>Yes, absolutely!</b> If no <code>LLM_API_KEY</code> is provided, the conversational AI assistant operates in deterministic local mode. It searches the 68 curated curriculum chunks in <code>content/kb.json</code> using the BM25 algorithm and returns accurate, grounded answers at zero cost.
</details>

<details>
<summary><b>2. Why does smooth scrolling feel lag-free compared to standard websites?</b></summary>
<br/>
Standard websites often apply CSS <code>scroll-behavior: smooth</code> which conflicts with JavaScript-driven momentum libraries, causing stutter. We tuned Lenis to handle momentum scrolling natively, enforced <code>scroll-behavior: auto !important</code>, and hooked progress bars directly to GPU compositor transforms via <code>subscribeScrollProgress</code>, preventing expensive document-wide style recalculations.
</details>

<details>
<summary><b>3. How do I update or add a new course?</b></summary>
<br/>
Simply add your new course object to <code>COURSES</code> in <code>content/site.ts</code>. Then run <code>npm run build:kb</code> to automatically re-index the AI assistant knowledge base and <code>npm run build</code> to generate the new static page.
</details>

---

## 📄 License & Legal

This software and all associated educational material, branding, course curricula, and design assets are **Proprietary & Confidential**.

Copyright © 2026 **Karka AI & Tech Academy**. All rights reserved.

Unauthorized copying, distribution, decompilation, public display, or reproduction of any part of this repository without written authorization from Karka AI & Tech Academy administration is strictly prohibited.

---

<div align="center">

Made with ❤️ by the engineering and mentorship team at **Karka AI & Tech Academy**

📍 Nagercoil, Kanyakumari District, Tamil Nadu, India • [karka.academy](https://www.karka.academy/)

</div>
