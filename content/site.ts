// Karka AI Academy - Centralized Typed Content Source
// HARD RULE APPLIED: 100% VERBATIM TEXT FROM LIVE SITE https://www.karka.academy/

export interface NavItem {
  label: string;
  href: string;
}

export interface CourseDetail {
  slug: string;
  title: string;
  heroDesc: string;
  metaDesc: string;
  overview: string;
  category?: string;
  image?: string;
  details: {
    duration: string;
    level: string;
    lessons: string;
    mode: string;
  };
  whyLearn: { title: string; desc: string }[];
  curriculum: { module: string; topics: string[] }[];
  whyChoose: { title: string; desc: string }[];
  instructor: {
    name: string;
    role: string;
    company: string;
    exp: string;
  };
  faqs: { q: string; a: string }[];
}

export const SITE_CONFIG = {
  name: "Karka AI & Tech Academy",
  tagline: "The one and only exclusive AI Learning Center in Nagercoil",
  address: "Academy HQ, Nagercoil, Tamil Nadu, India",
  googleMapsUrl: "https://www.google.com/maps/place/Karka+AI+%26+Tech+Academy+%7C+Summer+Courses+for+Students/@8.1801069,77.4313511,20z/data=!4m6!3m5!1s0x3b04f15dde0aa367:0xd5eb331016b805d0!8m2!3d8.1801487!4d77.4311084!16s%2Fg%2F11l8stxsrd?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
  coordinates: { lat: 8.1801487, lng: 77.4311084 },
  phone: "+91 9487530243",
  phoneTel: "tel:+919487530243",
  email: "contact@karka.academy",
  hireEmail: "mailto:contact@karka.academy?subject=Hiring%20Partnership%20Inquiry",
  socials: {
    facebook: "https://www.facebook.com/karka.academy",
    instagram: "https://www.instagram.com/karka.ai/",
    linkedin: "https://www.linkedin.com/company/karka-academy/",
  },
  whatsappLink: "https://wa.me/919487530243?text=Hi%2C%20I%20have%20a%20few%20questions%20about%20Karka%20Academy.",
  whatsappCourseLink: (courseName: string) => `https://wa.me/919487530243?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(courseName)}%20at%20Karka%20Academy.`,
};

export const NAV_LINKS: NavItem[] = [
  { label: "School Students", href: "/for-school-students" },
  { label: "College Students", href: "/for-college-students" },
  { label: "Graduates", href: "/for-graduates" },
  { label: "Professionals", href: "/for-professionals" },
];

export const CTA_BAND = {
  title: "Ready to Future-Proof Your Career?",
  subtext: "Join the AI revolution with Karka Academy today and start your journey with industry mentors.",
  applyBtn: "Apply for Admission",
  exploreBtn: "Explore Courses",
  exploreHref: "/courses",
};

export const FOOTER_DATA = {
  blurb: "Empowering the next generation of developers with GenAI Infused education and placement-focused mentorship.",
  programsLinks: [
    { label: "Home", href: "/" },
    { label: "All Courses", href: "/courses" },
    { label: "Course Finder", href: "/course-finder" },
    { label: "Compare Courses", href: "/compare" },
    { label: "Placement", href: "/placement" },
    { label: "Free Roadmap", href: "/roadmap" },
  ],
  academyLinks: [
    { label: "About Us", href: "/about-us" },
    { label: "Our Mentors", href: "/about-us#mentor" },
    { label: "Success Stories", href: "/placement" },
    { label: "Insights & Guides", href: "/blog" },
    // Was a bare mailto:, which gave recruiters nothing to read first.
    { label: "Hire From Us", href: "/hire-from-us" },
    { label: "Contact", href: "/contact" },
  ],
  bottomBar: {
    copyright: "© 2026 Karka Academy. All rights reserved.",
    privacy: { label: "Privacy Policy", href: "/privacy-policy" },
    terms: { label: "Terms of Service", href: "/terms-of-service" },
    credit: "Built with Passion by Karka",
  },
};

export const HOME_CONTENT = {
  hero: {
    tagline: "The one and only exclusive AI Learning Center in Nagercoil",
    h1Line1: "AI-Driven",
    h1Line2: "Software Developer",
    startBtn: "Start Your Transformation",
    stripTitle: "Where Our Learners are Making an Impact",
    badges: ["AI Powered", "100% Placement"],
    companies: [
      { name: "Amazon", logo: "/assets/amazon.webp" },
      { name: "TCS", logo: "/assets/tcs.webp" },
      { name: "HCL", logo: "/assets/hcl.webp" },
      { name: "Matrimony", logo: "/assets/matrimony.webp" },
      { name: "Novac", logo: "/assets/novac.webp" },
      { name: "Capecom", logo: "/assets/capecom.webp" },
      { name: "Flow", logo: "/assets/flow.webp" },
      { name: "Sodisys", logo: "/assets/sodisys.webp" },
    ],
  },

  platforms: {
    eyebrow: "Beyond the classroom",
    title: "Explore Karka Platforms",
    subtitle: "Compete with students across the district or level up with AI-powered learning.",
    infini: {
      name: "Karka Infini AI",
      category: "Inter-college student competition",
      prizePool: "₹1,00,000",
      prizeLabel: "Total prize pool",
      tagline: "Showcase Your Skills. Compete. Get Recognized. Win Big!",
      contests: [
        { title: "PaperPulse", desc: "Idea Presentation", icon: "presentation" },
        { title: "TechRush", desc: "Technical Quiz", icon: "brain" },
        { title: "Bug Hunt", desc: "Debugging", icon: "bug" },
        { title: "SiteSprint", desc: "Website Building", icon: "globe" },
        { title: "Graphix", desc: "Poster Design", icon: "palette" },
        { title: "VibeCut", desc: "Video Creation", icon: "video" },
      ],
      rounds: [
        { title: "Round 1", desc: "Campus arena at your college", icon: "school" },
        { title: "Round 2", desc: "District-level grand finale for the top 3 teams", icon: "map-pin" },
        { title: "Rewards", desc: "Cash prizes, Karka Rolling Trophy & certificates", icon: "award" },
      ],
      buttonText: "Register for Infini",
      link: "https://infini.karka.academy/",
      badge: "Free entry · Join multiple contests · Teams of 1–4",
    },
    spike: {
      name: "Spike AI",
      category: "Learning platform",
      headline: "The AI-powered learning platform by Karka Academy",
      inputPlaceholder: "Ask Spike anything you're learning…",
      features: [
        { title: "AI-Guided", desc: "Learn with AI at your side", icon: "bot" },
        { title: "Hands-On", desc: "Practise as you learn", icon: "code" },
        { title: "Progress", desc: "Track your growth", icon: "trending-up" },
        { title: "Mentor-Backed", desc: "Paired with Karka mentors", icon: "users" },
      ],
      buttonText: "Open Spike",
      link: "https://spike.karka.academy/",
    },
  },

  whyKarka: {
    title: "Why Karka?",
    subtitle: "Six reasons ambitious learners in Nagercoil choose Karka over every other institute.",
    cards: [
      {
        number: 1,
        title: "Pay After You Get Hired",
        description: "Traditional institutes demand heavy upfront fees regardless of your job outcome. At Karka, you start learning with ₹0 upfront tuition because we carry the financial risk—you only pay your course fees after you successfully secure a tech job.",
      },
      {
        number: 2,
        title: "An \"AI-First\" Future-Proof Curriculum",
        description: "Instead of wasting time on decade-old coding syntax, Karka natively integrates Generative AI workflows, Prompt Engineering, and AI Automation across all our tracks. You will learn how to build software and design interfaces with AI, exactly how modern tech companies build today.",
      },
      {
        number: 3,
        title: "Live Internships Over Paper Certificates",
        description: "Employers ignore generic print certificates; they hire proof. Karka functions as a hands-on, AI-powered internship platform where you work on real client projects, graduating with a live, deployable portfolio and an official Internship Certificate.",
      },
      {
        number: 4,
        title: "Continuous On-Site Expert Mentorship",
        description: "You gain daily access to fully equipped physical labs and direct, face-to-face guidance from industry mentors who track your progress and solve your technical bugs in real time, ensuring you never get stuck or lose learning momentum.",
      },
      {
        number: 5,
        title: "Direct Regional & Global Hiring Pipelines",
        description: "We completely bypass crowded online job portals by sending your completed portfolio directly to our network of hiring partners, local tech companies, and startup ecosystems that look to us to fill their open roles immediately.",
      },
      {
        number: 6,
        title: "The 4-Pillar Job Readiness System",
        description: "We transform you into a complete professional by systematically building your core technical stack, optimizing your speed using AI tools, training you in corporate business communication, and mastering technical mock interviews.",
      },
    ],
  },

  voices: {
    title: "Voices of Our Learners",
    subtitle: "Hear directly from our graduates about how Karka transformed their careers and helped them land their dream jobs in tech.",
    videoSrc: "/videos/gabrielsamraj.mp4",
    poster: "/assets/testimonial_poster.webp",
    playlist: [
      {
        id: "gabriel",
        name: "Gabriel Samraj",
        role: "Frontend Developer",
        company: "Capecom Solutions",
        companyLogo: "/assets/capecom.webp",
        package: "7.2 LPA",
        tag: "ON-CAMPUS VIDEO INTERVIEW",
        quote: "The hands-on environment and real software deployment at Karka transformed my career. I moved straight from college in Nagercoil to a high-growth tech role.",
        avatar: "/assets/gabriel-avatar.webp",
        videoSrc: "/videos/gabrielsamraj.mp4",
        poster: "/assets/testimonial_poster.webp",
        hasVideo: true,
        skills: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
      },
      {
        id: "prabin",
        name: "Prabin Kumar",
        role: "Fullstack Engineer",
        company: "Novac Technology",
        companyLogo: "/assets/novac.webp",
        package: "8.5 LPA",
        tag: "CAREER ACCELERATION",
        quote: "Working on real client modules during the Agile Tribers internship gave me production confidence that textbook courses could never match.",
        avatar: "/assets/prabin-avatar.webp",
        hasVideo: false,
        skills: ["Node.js", "Express", "MongoDB", "Next.js"],
      },
      {
        id: "shiju",
        name: "Shiju Raj",
        role: "AI Software Engineer",
        company: "Sodisys Infotech",
        companyLogo: "/assets/sodisys.webp",
        package: "6.8 LPA",
        tag: "GENAI MASTERY",
        quote: "Learning to build with LLMs, prompt pipelines, and modern fullstack frameworks gave me a massive edge in technical rounds.",
        avatar: "/assets/shiju-avatar.webp",
        hasVideo: false,
        skills: ["Python", "LangChain", "OpenAI APIs", "FastAPI"],
      },
      {
        id: "kishore",
        name: "Kishore M",
        role: "React Developer",
        company: "Flow Global",
        companyLogo: "/assets/flow.webp",
        package: "7.5 LPA",
        tag: "PAY AFTER PLACEMENT",
        quote: "The ₹0 upfront tuition model allowed me to study without stress. Mentors stayed with me until I cleared every round and signed my offer.",
        avatar: "/assets/kishore-avatar.webp",
        hasVideo: false,
        skills: ["React 19", "Redux Toolkit", "TypeScript", "Vite"],
      },
      {
        id: "sridevi",
        name: "Sridevi S",
        role: "UI/UX Designer",
        company: "HCL Tech",
        companyLogo: "/assets/hcl.webp",
        package: "6.5 LPA",
        tag: "PRODUCT DESIGN",
        quote: "From beginner wireframes to production design systems in Figma, Karka mentors coached me into an enterprise-ready product designer.",
        avatar: "/assets/sridevi-avatar.webp",
        hasVideo: false,
        skills: ["Figma", "Design Systems", "Prototyping", "User Research"],
      },
      {
        id: "anand",
        name: "Anand R",
        role: "Backend Architect",
        company: "TCS Digital",
        companyLogo: "/assets/tcs.webp",
        package: "9.0 LPA",
        tag: "HIGH CTC PLACEMENT",
        quote: "Karka's direct hiring pipeline connected me directly with top tech companies. Landed a 9.0 LPA offer right out of our cohort.",
        avatar: "/assets/anand-avatar.webp",
        hasVideo: false,
        skills: ["Java Spring Boot", "Microservices", "Docker", "PostgreSQL"],
      },
    ],
  },

  featuredPrograms: {
    title: "Explore Our Programs",
    subtitle: "Accelerate your career with industry-focused bootcamps designed to equip you with the practical skills needed to lead in tech.",
    courses: [
      {
        name: "MERN Fullstack Development",
        slug: "mern-fullstack",
        enrollments: "800+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Master Full-Stack web development using MongoDB, Express, React, and Node.js. Build scalable web applications from scratch.",
        image: "/assets/mern-fullstack.webp",
      },
      {
        name: "AI & Data Science",
        slug: "ai-data-science",
        enrollments: "650+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Comprehensive study of AI and Data Science concepts. Master the tools and machine learning models that drive the AI revolution.",
        image: "/assets/ai-data-science.webp",
      },
      {
        name: "UI/UX Design",
        slug: "ui-ux-design",
        enrollments: "450+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Master the art of designing intuitive, beautiful user interfaces and experiences using industry-standard design tools.",
        image: "/assets/ui-ux-design.webp",
      },
      {
        name: "Python for Kids",
        slug: "python-for-kids",
        enrollments: "200+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Interactive introduction to programming logic using Python. Build games and animations while learning core coding concepts.",
        image: "/assets/stem-kids.webp",
      },
      {
        name: "Full Stack Developer Internship",
        slug: "fullstack-internship",
        enrollments: "800+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Rigorous MERN stack training for students. Master DevOps, System Design, and Production best practices on large-scale apps.",
        image: "/assets/fullstack-internship.webp",
      },
      {
        name: "Generative AI Foundations",
        slug: "genai-foundations",
        enrollments: "900+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Master the basics of Generative AI, prompt engineering, and fundamental AI concepts. Start your journey into the tech future.",
        image: "/assets/genai-foundations.webp",
      },
    ],
  },

  pillars: {
    title: "4 Pillars of a Job-Ready Tech Career",
    subtitle: "We don't just teach code; we build careers. Our holistic curriculum is designed to transform you into a complete professional.",
    items: [
      {
        number: "01",
        title: "Master the Language of Business",
        skills: ["Listening", "Speaking", "Reading", "Writing"],
        desc: "Express technical ideas clearly to international clients and team members with executive confidence.",
      },
      {
        number: "02",
        title: "Build Scalable Modern Apps",
        skills: ["Web / Mobile", "Data Analytics", "UI/UX Design", "Digital Marketing"],
        desc: "Develop production-ready digital architectures designed to handle high concurrency and real-world scale.",
      },
      {
        number: "03",
        title: "AI Skills",
        tag: "Core Pillar",
        skills: ["Prompt Engineering", "AI Automation", "AI Tools", "LLM"],
        desc: "Leverage artificial intelligence to 10x development velocity, automate tasks, and ship modern software faster.",
      },
      {
        number: "04",
        title: "Interview Skills",
        skills: ["ATS Friendly Profile", "Mock Interview", "Group Discussion", "Presentation Skills"],
        desc: "Master technical problem solving and behavioral communication to crack competitive recruitment drives.",
      },
    ],
  },

  payAfterHired: {
    title: "Pay After You Get Hired",
    subtitle: "Zero Upfront Fees. Zero Risk. We're so confident in our training that we don't get paid until you do.",
    ratingCard: {
      enrollments: "190+ Enrollments",
      rating: "4.8",
      basedOn: "Based on 200 ratings",
      stars: 4,
    },
    steps: [
      {
        number: 1,
        title: "Enroll & Learn",
        desc: "Learn from Real Mentors. Join live sessions, work on real-world projects, and get mentored by industry experts.",
      },
      {
        number: 2,
        title: "Get Job Ready",
        desc: "We help you build your resume, portfolio, and prep for interviews.",
      },
      {
        number: 3,
        title: "Get Paid, Not Billed",
        desc: "Focus on learning today. Share your success once you are placed.",
      },
    ],
    whatsIncluded: [
      "1:1 Mentorship",
      "Placement Training",
      "Resume & LinkedIn Preparation",
      "Mock Interviews",
      "Job Referral Support",
    ],
    enrollBtn: "Enroll Now",
  },

  internship: {
    tag: "INTERNSHIP",
    title: "Experience Before You Graduate.",
    para1: "Stop worrying about \"0 experience\" on your resume. At Karka, every student works on real-time internship projects guided by industry mentors.",
    para2: "Gain the kind of hands-on experience that employers crave — and build a powerhouse portfolio before you even finish.",
    points: [
      "Work on real client projects",
      "Build your project portfolio",
      "Learn Collaboration",
      "Receive Internship Certificate",
    ],
    image: "/assets/intern.webp",
  },

  careerTracks: {
    title: "Choose Your Career Track",
    subtitle: "Specialized internships and training pathways designed to launch your career.",
    tracks: [
      {
        category: "Fullstack Courses",
        badge: "MOST POPULAR",
        sub: "Master modern web ecosystems and full-lifecycle engineering",
        skills: ["React.js", "Node.js", "Express", "MongoDB", "Next.js", "REST APIs"],
        roles: "Fullstack Developer · Frontend Engineer · API Specialist",
        salary: "4.5 – 12 LPA",
        courses: ["MERN Fullstack", "React + Java Fullstack", "React + Python Fullstack"],
      },
      {
        category: "Gen AI Courses",
        badge: "AI REVOLUTION",
        sub: "Build autonomous agents, prompt workflows & LLM apps",
        skills: ["Prompt Engineering", "OpenAI APIs", "LangChain", "Vector DBs", "RAG"],
        roles: "GenAI Engineer · LLM Application Developer · AI Specialist",
        salary: "6.0 – 16 LPA",
        courses: ["Generative AI Foundations", "Generative AI Mastery", "Gen AI (LLM) Developer"],
      },
      {
        category: "Data & ML Courses",
        sub: "Extract business intelligence & train predictive models",
        skills: ["Python", "Pandas", "Scikit-Learn", "Data Pipelines", "Power BI"],
        roles: "Data Analyst · Machine Learning Engineer · BI Developer",
        salary: "5.0 – 14 LPA",
        courses: ["AI & Data Science", "Data Analytics with AI", "Data Engineering"],
      },
      {
        category: "Design Courses",
        sub: "Design intuitive interfaces, wireframes & component systems",
        skills: ["Figma", "Design Systems", "User Research", "Wireframing", "Prototyping"],
        roles: "UI/UX Designer · Product Designer · Visual Designer",
        salary: "4.0 – 10 LPA",
        courses: ["UI/UX Design", "Web Designing", "Graphic Designing"],
      },
      {
        category: "Cloud & DevOps",
        sub: "Architect scalable cloud systems and automated pipelines",
        skills: ["AWS", "Docker", "Kubernetes", "CI/CD Actions", "Linux"],
        roles: "Cloud Engineer · DevOps Specialist · Platform Engineer",
        salary: "5.5 – 15 LPA",
        courses: ["Cloud & DevOps", "Data Engineering", "Data Analytics with AI"],
      },
      {
        category: "Digital Media Courses",
        sub: "Produce high-impact visual narratives and video edits",
        skills: ["Video Editing", "Motion Graphics", "After Effects", "Storyboarding"],
        roles: "Video Editor · Motion Designer · Multimedia Creator",
        salary: "3.5 – 8 LPA",
        courses: ["Video Editing", "Graphic Designing", "Multimedia & Animation"],
      },
      {
        category: "Content & Marketing",
        sub: "Drive organic search visibility, conversion & campaigns",
        skills: ["SEO Strategies", "Social Campaigns", "Copywriting", "Google Analytics"],
        roles: "SEO Strategist · Digital Marketer · Growth Specialist",
        salary: "3.5 – 8 LPA",
        courses: ["Digital Marketing", "SEO Analyst", "Storytelling & Content Writing"],
      },
      {
        category: "Non Tech Courses",
        sub: "Operational excellence, finance management & analytics",
        skills: ["Business Analysis", "Tally ERP", "Financial Modeling", "Excel"],
        roles: "Business Analyst · Finance Operations · Accounting Specialist",
        salary: "3.5 – 7.5 LPA",
        courses: ["HR & Finance", "Tally", "Business Analyst"],
      },
    ],
  },

  realProjects: [
    {
      id: "spike",
      title: "Spike AI Learning Platform",
      category: "EdTech & AI Developer Tools",
      tag: "LIVE PRODUCTION APP",
      problem: "Students learning complex programming lack immediate 24/7 debugging and real-time conceptual hints outside mentor hours.",
      solution: "Engineered an AI-augmented learning platform with live code playground, contextual debugging hints, milestone tracking, and mentor code ticketing.",
      techStack: ["Next.js", "FastAPI", "PostgreSQL", "OpenAI API", "Docker"],
      demoUrl: "https://spike.karka.academy/",
      githubUrl: "https://github.com/karka-academy",
      outcome: "Actively used across all Karka bootcamps for daily practical coding & review.",
      image: "/assets/project-spike-ai.webp",
    },
    {
      id: "infini",
      title: "Karka Infini AI Arena",
      category: "Tournament Platform & Live Leaderboard",
      tag: "DISTRICT COMPETITION",
      problem: "Managing tournament registrations, project submissions, and evaluation across 60+ engineering and arts colleges was highly fragmented.",
      solution: "Built a centralized competition management portal supporting 6 contest tracks (TechRush, Bug Hunt, SiteSprint, PaperPulse) with live scoreboards.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      demoUrl: "https://infini.karka.academy/",
      githubUrl: "https://github.com/karka-academy",
      outcome: "Successfully processed 500+ participant submissions and multi-round evaluations.",
      image: "/assets/project-infini-arena.webp",
    },
    {
      id: "fintech",
      title: "Flow Global Fintech Integration",
      category: "Fintech Microservices & Dashboards",
      tag: "INCUBATION PROJECT",
      problem: "International financial operations required automated transaction tracking, payment status webhooks, and secure audit logging.",
      solution: "Developed secure REST API microservices, webhook receivers, and real-time reconciliation dashboards under ex-CTO supervision.",
      techStack: ["Node.js", "TypeScript", "PostgreSQL", "REST APIs", "Docker"],
      demoUrl: "https://karka.academy/placement",
      outcome: "Deployed into commercial staging pipelines with high concurrency support.",
      image: "/assets/project-fintech-flow.webp",
    },
    {
      id: "placement-portal",
      title: "Karka Talent & ATS Placement Engine",
      category: "Internal Enterprise Tool",
      tag: "HIRING PIPELINE",
      problem: "Connecting 650+ job-ready graduates with 50+ hiring partners without passing through slow third-party recruitment agencies.",
      solution: "Engineered an internal candidate verification portal generating ATS-formatted digital portfolios with live project previews for recruiters.",
      techStack: ["React", "Next.js", "Tailwind CSS", "REST APIs"],
      demoUrl: "https://karka.academy/placement",
      outcome: "Accelerated interview scheduling turnaround from 2 weeks down to 48 hours.",
      image: "/assets/project-placement-portal.webp",
    },
  ],

  graduatesWork: {
    title: "Where Our Karka Graduates Work",
    subtitle: "From classrooms in Nagercoil to careers across India, our students are making their mark at leading tech companies.",
  },

  faqs: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Still have questions? We've answered the most common ones below.",
    items: [
      {
        q: "What is Pay After Placement?",
        a: "We want you to focus entirely on your learning without worrying about upfront costs. You only share your success (and the fees) after you land a tech job with a guaranteed minimum salary. It's our way of saying we're in this together.",
      },
      {
        q: "Is placement guaranteed?",
        a: "While no one can strictly 'guarantee' a job, our Pay After Placement model means we are as invested in your career as you are. We don't succeed unless you do, which is why we go the extra mile to ensure you are job-ready.",
      },
      {
        q: "Who are the mentors at Karka?",
        a: "Our mentors are industry veterans from top tech companies. They bring real-world experience, ensuring the curriculum is relevant and up-to-date with current industry standards.",
      },
      {
        q: "Do I need a background in coding or CSE?",
        a: "Absolutely not! We've designed our curriculum to take you from a curious beginner to a confident professional. Whether you're from arts, science, or are a complete career-switcher, we've got you covered.",
      },
      {
        q: "How long does the course take?",
        a: "The duration varies by course but typically ranges from 6 to 8 months. This includes intensive training, project work, and internship periods to ensure you are job-ready.",
      },
      {
        q: "Will I get internship or project experience?",
        a: "Yes! A significant part of our curriculum involves working on live projects and simulations. You will gain hands-on experience that mimics a real corporate environment.",
      },
    ],
    talkToTeamText: "Talk to Our Team",
    talkToTeamLink: "https://wa.me/919487530243?text=Hi%2C%20I%20have%20a%20few%20questions%20about%20Karka%20Academy.",
    applyNowText: "Apply Now for Free",
  },

  contactSection: {
    title: "Get in touch with us",
    subtitle: "Whether you're a student ready to begin or a parent seeking clarity, reach out to us. We'd love to talk.",
    cardTitle: "Let's Talk About Your Future.",
    cardSubtext: "Schedule a free career call with our mentors. Fastest way to get answers to your doubts.",
    programs: ["Full Stack Development", "Data Science", "UI/UX Design"],
    submitBtn: "Book My Free Career Call",
    motivationQuote: "Future belongs to those who never stop learning.",
    motivationLabel: "Karka Motivation",
    mentorPhoto: "/assets/owner.webp",
  },
};

export const COURSES_PAGE_CONTENT = {
  eyebrow: "Upgrade Your Skills",
  title: "Explore Our Programs",
  subtitle: "Professional courses with real-world projects and Pay After Placement.",
  tabs: ["All", "Coding", "Data", "Design", "Business"],
  banner: {
    title: "Confused about the right choice for you?",
    description: "Book a free 1-on-1 session with our career experts and find the path that matches your skills.",
    counselingBtn: "Free Counseling",
    curriculumBtn: "View Curriculum",
    curriculumHref: "#programs",
  },
};

export const ABOUT_PAGE_CONTENT = {
  eyebrow: "Establish. Execute. Evolve.",
  title: "Redefining Tech Education",
  intro: "Karka is an exclusive training ecosystem designed to transform ambitious freshers into industry-ready software engineers through rigorous, holistic mentorship.",
  story: [
    "Every great journey begins with a spark of curiosity. Karka was founded with a singular, powerful vision: to bridge the gap between traditional learning and real-world excellence. We saw passionate minds eager to grow, but held back by outdated resources and disconnected guidance.",
    "We believe in practical mastery over rote memorization. Through project-driven sprints and expert mentorship, we empower learners to transform their aspirations into thriving technology careers.",
  ],
  mission: "To bridge the massive gap between academic learning and industry requirements. We don't just teach coding; we engineer careers by instilling professional discipline, problem-solving mindsets, and effective communication skills.",
  vision: "To be the most trusted hub for producing high-caliber tech talent that companies desire, creating a ripple effect of innovation and economic growth in our community.",
  advantage: {
    eyebrow: "Why Students Choose Karka",
    title: "The Karka Advantage",
    subtitle: "We've dismantled the traditional education model and rebuilt it around your success.",
    features: [{"feature": "AI-Based Curriculum", "karka": "Yes (Native across all tracks)", "others": "Rarely / Basic Overview"}, {"feature": "AI Tools", "karka": "Yes (Integrated daily)", "others": "No"}, {"feature": "AI Bootcamp", "karka": "Yes (Included)", "others": "No"}, {"feature": "Exercises & Tasks", "karka": "200+ Hands-on Tasks", "others": "Limited / Homework only"}, {"feature": "Mini Projects", "karka": "Up to 5 Real-world Projects", "others": "1-2 Basic Projects"}, {"feature": "Capstone Projects", "karka": "Production-grade Deployments", "others": "Academic Style"}, {"feature": "Learn Till Job Placement", "karka": "Yes (Ongoing mentoring)", "others": "Fixed duration only"}, {"feature": "Pay After Placement", "karka": "Yes (₹0 Upfront Tuition)", "others": "Strict Upfront Fees"}, {"feature": "Full-time / Part-time", "karka": "Flexible Modes Available", "others": "Rigid Timings"}, {"feature": "Industry Driven Curriculum", "karka": "Curated by Tech CTOs & Leads", "others": "Outdated Textbook Syllabus"}, {"feature": "Free Program Switch", "karka": "Supported within initial trial", "others": "No"}, {"feature": "Repeat Course Option", "karka": "Free Refresher Access", "others": "Pay Again"}],
  },
  mentor: {
    eyebrow: "Meet The Mentor",
    headline: "Learn directly from an Ex-CTO with 18+ years of experience.",
    name: "Sateesh Kumar",
    role: "Founder, Karka Software Academy | Agile Tribers",
    bio: "With over18+ yearsof experience in the tech industry, Sateesh has led engineering teams across the globe.",
    bullets: [
      "Ex-CTO of Flow Global (UK Fintech)",
      "Worked with Wipro & Yatra.com",
      "Specialized in building AI-powered Web & Mobile Products",
    ],
    linkedin: "https://www.linkedin.com/in/ssateeshk/",
    photo: "/assets/owner.webp",
  },
  team: {
    title: "Meet The Team",
    subtitle: "The people working behind the scenes to power your learning experience.",
  },
  infrastructure: {
    title: "Our Infrastructure",
    subtitle: "To master modern skills, you need a modern environment. Karka boasts state-of-the-art infrastructure designed to optimize the learning process.",
    blocks: [
      {
        title: "Cutting-Edge Tech Stack",
        desc: "Seamless online learning portals, interactive live-session frameworks, and high-performance learning management systems.",
      },
      {
        title: "Collaborative Spaces",
        desc: "Modern, fully equipped physical training labs built to foster peer-to-peer interaction, hands-on experimentation, and collaborative problem-solving.",
      },
    ],
  },
};

export const PLACEMENT_PAGE_CONTENT = {
  title: "Our Placement Records",
  subtitle: "100% Lifetime Placement Support. We don't just teach technology; we launch careers.",
  heroImage: "/assets/student-collage.webp",
  actionCards: [
    {
      title: "Placement Assistance",
      desc: "Direct support from our placement cell for your career growth.",
      btnText: "Get Placement Assistance",
      btnHref: "/contact",
    },
    {
      title: "Explore Courses",
      desc: "Check out our job-oriented programs and master new skills.",
      btnText: "Browse Our Courses",
      btnHref: "/courses",
    },
    {
      title: "Job Openings",
      desc: "Apply to current vacancies with our 50+ hiring partners.",
      btnText: "Call About Job Openings",
      btnHref: "tel:+919487530243",
    },
  ],
  chips: [
    "Mock Interviews",
    "HR Grooming",
    "Resume & LinkedIn Building",
    "Daily Placement Calls",
    "100% Job Assistance",
  ],
  stats: [
    { label: "Highest Package", number: "24", suffix: " LPA" },
    { label: "Placement Rate", number: "100", suffix: "%" },
    { label: "Hiring Partners", number: "50", suffix: "+" },
    { label: "Average Hike", number: "120", suffix: "%" },
  ],
  supportSection: {
    title: "Complete Career Support",
    subtitle: "From your first interview to your first promotion, we stand by you with comprehensive placement assistance and continued mentorship.",
    interviewBenefits: [
      "Dedicated Placement Officer",
      "Two Weeks Placement Training",
      "Portfolio Creation",
      "Learn till job placement (LTP)",
      "Pay after job placement (PAP)",
      "Internship @AgileTribers",
      "AI First Product Studio",
    ],
    afterJobSupport: [
      "Up to 3 Months Support",
      "Monthly Mentorship Sessions",
      "Dedicated One-to-One Sessions",
    ],
    whyAfterSupport: {
      title: "Why After-Support?",
      desc: "We ensure you settle comfortably in your new role, helping you navigate corporate challenges and accelerate your initial growth.",
    },
  },
  mapsLink: "https://www.google.com/maps/place/Karka+AI+%26+Tech+Academy+%7C+Summer+Courses+for+Students/@8.1801069,77.4313511,20z/data=!4m6!3m5!1s0x3b04f15dde0aa367:0xd5eb331016b805d0!8m2!3d8.1801487!4d77.4311084!16s%2Fg%2F11l8stxsrd?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
};

export const ROADMAP_PAGE_CONTENT = {
  title: "Your Path to Success",
  subtitle: "A transparent, step-by-step journey from learning to earning.",
  steps: [
    { step: 1, title: "Join Foundation", desc: "Gain experience with industry tools" },
    { step: 2, title: "Expert Learning", desc: "Intensive Project Training" },
    { step: 3, title: "Shared Success", desc: "Pay only after placement" },
    { step: 4, title: "Placement Training", desc: "2 Weeks Intensive Prep" },
    { step: 5, title: "Free Internship", desc: "At Agile Tribers" },
    { step: 6, title: "Interview Schedule", desc: "We line up interviews" },
    { step: 7, title: "Success", desc: "Job Placement Achieved!" },
    { step: 8, title: "Payment", desc: "Pay ₹40,000 only after placement" },
  ],
  schedule: {
    title: "Schedule & Commitment",
    subtitle: "Flexible options designed for your lifestyle.",
    fullTime: {
      title: "Full-Time Program",
      badge: "Immersive Career Transformation",
      commitment: "30hrs/week = 10hr Live Sessions + 10hr Classroom Practice + 10hr Home Assignments",
      scheduleDesc: "Dedicated 5 Days/Week Schedule",
    },
    partTime: {
      title: "Part-Time Program",
      badge: "Flexible Upskilling for Working Professionals & College Students",
      commitment: "15hrs/week = 6hr Weekend Sessions + 5hr Self-Paced Practice + 4hr Mentor Reviews",
      scheduleDesc: "Weekend & Evening Schedule",
    },
  },
  whyPayAfterPlacement: {
    title: "Why Choose Pay After Placement?",
    desc: "We believe in our training quality so much that we only ask for the tuition fee once you secure a job. This model aligns our success with yours.",
  },
};

export const AUDIENCE_DATA = {
  graduates: {
    eyebrow: "For Graduates",
    title: "Kickstart your career with job-ready skills",
    badges: ["100% Placement Support", "Hands-on Capstone Projects", "1:1 Industry Mentorship"],
    image: "/assets/graduate.webp",
  },
  school: {
    eyebrow: "For School Students",
    title: "Start your coding journey while in school",
    badges: ["Foundations of Logic", "Creative Coding & Games", "Future-Ready Skills"],
    image: "/assets/school.webp",
    description: "Coding is the new literacy. Learning to code in school improves logical thinking, problem-solving abilities, and prepares students for the high-tech careers of the future.",
  },
  college: {
    eyebrow: "For College Students",
    title: "Learn from the best, with industry aligned programs",
    badges: ["Industry Aligned Projects", "AgileTribers Internship", "Weekend & Evening Slots"],
    image: "/assets/college-students.webp",
  },
  professionals: {
    eyebrow: "For Professionals",
    title: "Upskill and switch to your dream tech career",
    badges: ["Flexible Weekend Batches", "Advanced Tech Stack", "Professional Networking"],
    image: "/assets/professional.webp",
  },
};

export const COURSE_IMAGE_MAP: Record<string, string> = {
  "mern-fullstack": "/assets/mern-fullstack.webp",
  "react-java-fullstack": "/assets/java-fullstack.webp",
  "react-python-fullstack": "/assets/python-fullstack.webp",
  "genai-foundations": "/assets/genai-foundations.webp",
  "genai-mastery": "/assets/genai-mastery.webp",
  "genai-llm-developer": "/assets/genai-developer.webp",
  "ai-data-science": "/assets/ai-data-science.webp",
  "data-analytics-ai": "/assets/data-analytics.webp",
  "data-engineering": "/assets/data-engineering.webp",
  "ui-ux-design": "/assets/ui-ux-design.webp",
  "web-designing": "/assets/web-designing.webp",
  "graphic-designing": "/assets/graphic-designing.webp",
  "video-editing": "/assets/video-editing.webp",
  "graphic-designing-dm": "/assets/digital-media-design.webp",
  "multimedia-animation": "/assets/multimedia-animation.webp",
  "digital-marketing": "/assets/digital-marketing.webp",
  "seo-analyst": "/assets/seo-analyst.webp",
  "storytelling-content-writing": "/assets/content-writing.webp",
  "cloud-devops": "/assets/cloud-devops.webp",
  "automation-testing": "/assets/automation-testing.webp",
  "mobile-app-development": "/assets/mobile-app.webp",
  "fullstack-internship": "/assets/fullstack-internship.webp",
  "python-for-kids": "/assets/stem-kids.webp",
  "hr-finance": "/assets/hr-finance.webp",
  "tally": "/assets/tally-accounting.webp",
  "business-analyst": "/assets/business-analyst.webp",
};

export function getCourseImage(slug: string): string {
  return COURSE_IMAGE_MAP[slug] || "/assets/mern-fullstack.webp";
}

export const CATEGORIES_CONFIG = [
  { slug: "coding", name: "Coding & Development", desc: "Master full-stack web and backend engineering" },
  { slug: "gen-ai", name: "Generative AI", desc: "Lead the AI revolution with LLMs and prompt systems" },
  { slug: "data", name: "Data, ML & AI", desc: "Master data intelligence, machine learning and big data pipelines" },
  { slug: "design", name: "Design & Creatives", desc: "Create stunning UI/UX, graphics and web designs" },
  { slug: "digital-media", name: "Digital Media & Animation", desc: "Visual storytelling, video editing and 3D animation" },
  { slug: "content-marketing", name: "Content & Digital Marketing", desc: "Drive growth with digital strategies, SEO and copywriting" },
  { slug: "other-tech", name: "Advanced Tech & DevOps", desc: "Cloud computing, QA automation and mobile app development" },
  { slug: "business", name: "Business & Management", desc: "Essential enterprise skills, financial systems and analysis" },
];

// All 26 structured courses
export const COURSES: Record<string, CourseDetail> = {
  "mern-fullstack": {
    "slug": "mern-fullstack",
    "title": "MERN Fullstack Development",
    "heroDesc": "Master Full-Stack web development using MongoDB, Express, React, and Node.js. Build scalable web applications from scratch.",
    "metaDesc": "Master Full-Stack web development using MongoDB, Express, React, and Node.js. Build scalable web applications from scratch.",
    "overview": "Master MongoDB, Express.js, React, and Node.js. Build high-performance, dynamic web applications from scratch and launch a high-earning software engineering career with our 100% placement-supported bootcamp in Nagercoil.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "High Market Demand",
        "desc": "The MERN stack is the absolute industry standard for modern startups and global tech companies looking for fast, scalable web ecosystems."
      },
      {
        "title": "Unified Language Power",
        "desc": "Learning JavaScript for both frontend and backend makes you highly efficient, allowing you to develop entire applications solo."
      },
      {
        "title": "Premium Tech Salaries",
        "desc": "Fullstack web developers command exceptionally high packages and remote freelance roles due to their end-to-end building capabilities."
      },
      {
        "title": "Rapid Career Growth",
        "desc": "Mastering a complete stack allows you to transition into product management, system architecture, or tech lead positions much faster."
      }
    ],
    "curriculum": [
      {
        "module": "Frontend Mastery",
        "topics": [
          "React Hooks & Context API",
          "State Management with Redux",
          "Responsive UI with Tailwind CSS"
        ]
      },
      {
        "module": "Backend Architecture",
        "topics": [
          "Node.js Runtime",
          "Express.js REST APIs",
          "Middleware & Routing",
          "Authentication with JWT"
        ]
      },
      {
        "module": "Database Design",
        "topics": [
          "MongoDB Schema Design",
          "Aggregation Framework",
          "Mongoose Modeling"
        ]
      },
      {
        "module": "Deployment & Scaling",
        "topics": [
          "Docker Basics",
          "CI/CD Pipelines",
          "AWS/Heroku Deployment"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "John Doe",
      "role": "Sr. Fullstack Developer",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What is the course duration and mode?",
        "a": "This bootcamp spans 3 to 6 months and is available via immersive offline training at our Nagercoil campus or live interactive online tracks."
      },
      {
        "q": "What modules are covered in this curriculum?",
        "a": "You will master frontend UI design with React, backend systems using Node.js and Express, database management with MongoDB, and modern cloud deployment pipelines."
      },
      {
        "q": "Is prior coding experience required to join?",
        "a": "No. We start from absolute programming fundamentals and progress systematically into complex production system design."
      },
      {
        "q": "What placement support do you provide after graduation?",
        "a": "We offer a dedicated placement cell providing 1-on-1 industry mentoring, rigorous portfolio reviews, ATS-optimized resume building, and direct interviews with our network of hiring partners."
      }
    ]
  },
  "react-java-fullstack": {
    "slug": "react-java-fullstack",
    "title": "React + Java Full Stack Development",
    "heroDesc": "Build enterprise-grade applications with React and Spring Boot. Learn engineering best practices for scalable backends.",
    "metaDesc": "Build enterprise-grade applications with React and Spring Boot. Learn engineering best practices for scalable backends.",
    "overview": "Master React Frontend Ecosystems & Enterprise Java Architecture. Build secure, massive corporate web applications and enter the global enterprise software domain with our 100% placement-supported bootcamp in Nagercoil.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Enterprise Dominance",
        "desc": "Major banking systems, healthcare networks, and multinational corporations run almost entirely on Java backend frameworks."
      },
      {
        "title": "High Job Stability",
        "desc": "Corporate institutions constantly recruit developers who understand robust Java systems coupled with fluid React web interfaces."
      },
      {
        "title": "Long-Term Career Value",
        "desc": "Mastering Java opens doors to high-level system architect positions and secure enterprise technology careers globally."
      },
      {
        "title": "Unmatched Security Standards",
        "desc": "Java’s robust architecture makes it the gold standard for high-security, high-traffic transactional platforms."
      }
    ],
    "curriculum": [
      {
        "module": "Java Foundations",
        "topics": [
          "Advanced Java 17+",
          "Lambdas & Streams",
          "Multithreading Basics"
        ]
      },
      {
        "module": "Spring Boot Microservices",
        "topics": [
          "Spring Data JPA",
          "Spring Security",
          "Microservices Architecture"
        ]
      },
      {
        "module": "Modern Frontend",
        "topics": [
          "React Ecosystem",
          "TypeScript Integration",
          "Unit Testing with Jest"
        ]
      },
      {
        "module": "Persistence Layer",
        "topics": [
          "Relational DB Schema",
          "Hibernate ORM",
          "Transaction Management"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Alice Smith",
      "role": "Backend Architect",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What are the main modules taught in this course?",
        "a": "Modern UI design with React, backend systems using Java and Spring Boot, SQL databases, and automated testing frameworks."
      },
      {
        "q": "Why pair React with Java?",
        "a": "React handles the highly interactive consumer layout, while Java provides the incredibly secure, fast database engine required by large corporate systems."
      },
      {
        "q": "What is the duration of this bootcamp?",
        "a": "This program runs for 3 to 6 months with flexible options for offline training at our Nagercoil center or interactive online learning."
      },
      {
        "q": "Do you offer mock interview preparation?",
        "a": "Yes. We host rigorous mock technical rounds, code reviews, system design practices, and direct interview scheduling with enterprise partners."
      }
    ]
  },
  "react-python-fullstack": {
    "slug": "react-python-fullstack",
    "title": "React + Python Full Stack Development",
    "heroDesc": "Develop modern, high-performance web applications with React and Django/FastAPI. Focus on rapid development cycles.",
    "metaDesc": "Develop modern, high-performance web applications with React and Django/FastAPI. Focus on rapid development cycles.",
    "overview": "Master Modern React Frameworks & Advanced Python Data-Driven Backend Systems. Build intelligent, lightning-fast web applications and bridge the gap between frontend interfaces and AI/Data engines via our placement-backed Nagercoil bootcamp.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "The Language of AI & Tech",
        "desc": "Python is the fastest-growing backend language, powering data systems, automation, and modern tech applications."
      },
      {
        "title": "Versatile Career Paths",
        "desc": "A Python fullstack developer can jump between core software development, web application engineering, and data pipeline management effortlessly."
      },
      {
        "title": "High-Growth Startups Ecosystem",
        "desc": "Modern technology startups prefer Python frameworks (like Django or FastAPI) due to their rapid development speed and simple scaling."
      },
      {
        "title": "Excellent Developer Experience",
        "desc": "Python's clean syntax allows developers to write less code and build powerful, readable applications much faster."
      }
    ],
    "curriculum": [
      {
        "module": "Python for Web",
        "topics": [
          "Asynchronous Python",
          "Pydantic Models",
          "FastAPI Framework"
        ]
      },
      {
        "module": "Fullstack Integration",
        "topics": [
          "RESTful API Design",
          "WebSockets with Django Channels",
          "React State Management"
        ]
      },
      {
        "module": "Security & Auth",
        "topics": [
          "OAuth2 Implementation",
          "Secure Coding Practices",
          "CORS & Headers"
        ]
      },
      {
        "module": "Infrastructure",
        "topics": [
          "PostgreSQL Optimization",
          "Nginx Configuration",
          "AWS Deployment"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Bob Johnson",
      "role": "Fullstack Engineer",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What frameworks are covered in this course?",
        "a": "Frontend UI design with React, backend architecture with Python (Django / FastAPI), database management, and cloud platform hosting."
      },
      {
        "q": "Do I need a strong math background?",
        "a": "No. While Python is great for data, this course focuses on logical structure, application building, and practical system design."
      },
      {
        "q": "Is this course available online or offline?",
        "a": "You can attend this bootcamp as a premium offline course at our Nagercoil campus or join through our interactive online tracks."
      },
      {
        "q": "How does the Pay After Placement system work?",
        "a": "You can enroll, complete the training, and transition into your internship with zero upfront tuition. You only start paying us once you land a job."
      }
    ]
  },
  "genai-foundations": {
    "slug": "genai-foundations",
    "title": "Generative AI Foundations",
    "heroDesc": "Master the basics of Generative AI, prompt engineering, and fundamental AI concepts. Start your journey into the tech future.",
    "metaDesc": "Master the basics of Generative AI, prompt engineering, and fundamental AI concepts. Start your journey into the tech future.",
    "overview": "Unlock the Absolute Basics of Prompt Engineering & AI Automation. Learn how to use, configure, and integrate cutting-edge generative AI models into everyday business, marketing, and design tasks at our Nagercoil academy.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Essential Modern Skill Set",
        "desc": "Knowledge of generative AI tools is rapidly becoming a standard requirement for all modern corporate, marketing, and creative jobs."
      },
      {
        "title": "Exponential Productivity",
        "desc": "Learning to use AI effectively allows you to finish copywriting, graphics work, and research up to 10 times faster than average."
      },
      {
        "title": "Future-Proof Career",
        "desc": "Understanding AI ensures you stay relevant and highly competitive as automation sweeps through standard office environments."
      },
      {
        "title": "Accessible Technical Transition",
        "desc": "This course allows professionals from non-technical backgrounds to adopt advanced technologies without writing a single line of code."
      }
    ],
    "curriculum": [
      {
        "module": "Introduction to Gen AI",
        "topics": [
          "History of AI",
          "Transformers & LLMs",
          "Ethical AI Practices"
        ]
      },
      {
        "module": "Prompt Engineering",
        "topics": [
          "Zero-shot & Few-shot Prompting",
          "Chain of Thought",
          "Effective Context Setting"
        ]
      },
      {
        "module": "AI Tooling",
        "topics": [
          "ChatGPT Mastery",
          "Midjourney & Stable Diffusion",
          "Productivity AI Tools"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Dr. Alan Turing Jr.",
      "role": "AI Ethicist",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "Who is this course designed for?",
        "a": "Students, professionals, marketers, and business owners looking to maximize their efficiency using cutting-edge automation tools."
      },
      {
        "q": "Is coding required for this program?",
        "a": "No. This foundational track focuses on structuring logical inputs, mastering software interfaces, and configuring automated workflows."
      },
      {
        "q": "How long is this program and what is the learning mode?",
        "a": "The course runs for 3 to 6 months and is available offline at our Nagercoil campus or via interactive online classes."
      },
      {
        "q": "Will I get a certificate after completion?",
        "a": "Yes. You will receive an official certification in Generative AI Foundations alongside a portfolio of your automated workflows."
      }
    ]
  },
  "genai-mastery": {
    "slug": "genai-mastery",
    "title": "Generative AI Mastery",
    "heroDesc": "Advanced Generative AI techniques, including fine-tuning and complex AI integration. Drive innovation with customized AI.",
    "metaDesc": "Advanced Generative AI techniques, including fine-tuning and complex AI integration. Drive innovation with customized AI.",
    "overview": "Master AI Agents, Workflow Orchestration, and Automated Business Systems. Go beyond basic prompting to build custom automated workflows, connect AI engines to custom corporate systems, and automate complete operational processes.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "High Industry Value",
        "desc": "Organizations are actively seeking specialists who can connect isolated AI models into cohesive, automated corporate workflows."
      },
      {
        "title": "Automation Leadership",
        "desc": "Master the strategic skills required to advise, build, and deploy custom internal tools that lower company operational costs."
      },
      {
        "title": "Lucrative Consulting Options",
        "desc": "Businesses pay premium retainer fees to independent AI implementation consultants who can automate their backend offices."
      },
      {
        "title": "Career Differentiation",
        "desc": "Standing out as an AI workflow master places you ahead of traditional developers in modern tech-forward corporate environments."
      }
    ],
    "curriculum": [
      {
        "module": "Advanced LLMs",
        "topics": [
          "Fine-tuning Techniques",
          "Parameter Efficient Tuning (PEFT)",
          "Model Evaluation"
        ]
      },
      {
        "module": "Custom AI Solutions",
        "topics": [
          "AI Agents",
          "Function Calling",
          "Multi-modal AI Integration"
        ]
      },
      {
        "module": "Enterprise AI",
        "topics": [
          "Scaling AI Workloads",
          "Data Privacy in Gen AI",
          "Cost Management"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Sarah Reed",
      "role": "Sr. AI Engineer",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What is covered in this course?",
        "a": "Building complex automated agent chains, connecting AI systems to local business spreadsheets, custom memory systems, and automation software suites."
      },
      {
        "q": "What career paths open up after this course?",
        "a": "You can target roles such as AI Operations Manager, Automation Specialist, and Corporate Workflow Consultant."
      },
      {
        "q": "What is the duration of this program?",
        "a": "The Generative AI Mastery course spans 3 to 6 months and is delivered offline at Nagercoil and through our premium online system."
      },
      {
        "q": "Do I need a strong programming background?",
        "a": "While some basic logical mapping or low-code familiarity is helpful, we teach you everything needed to build advanced agent systems."
      }
    ]
  },
  "genai-llm-developer": {
    "slug": "genai-llm-developer",
    "title": "Gen AI & LLM Developer",
    "heroDesc": "Build production-ready LLM applications, RAG systems, and AI-powered agents. Become an architect of intelligent systems.",
    "metaDesc": "Build production-ready LLM applications, RAG systems, and AI-powered agents. Become an architect of intelligent systems.",
    "overview": "Program, Fine-Tune, and Deploy Custom Large Language Models & RAG Architectures. Become an elite AI developer by coding intelligent software solutions using Python, vector databases, and custom model weights via our Nagercoil bootcamp.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "The Highest-Paying Tech Tier",
        "desc": "AI and LLM developers command some of the highest salaries and contract rates in the global technology space today."
      },
      {
        "title": "Critical Competitive Edge",
        "desc": "Companies want proprietary, secure AI engines that run on their internal data without exposing it to public clouds."
      },
      {
        "title": "Unmatched Innovation Potential",
        "desc": "Gain the technical power to build next-generation applications, intelligent search platforms, and autonomous software tools."
      },
      {
        "title": "Pioneering Tech Role",
        "desc": "Be at the forefront of the AI revolution, designing systems that are actively reshaping how humanity interacts with computers."
      }
    ],
    "curriculum": [
      {
        "module": "LLM Orchestration",
        "topics": [
          "LangChain & LlamaIndex",
          "Memory Management",
          "Callback Systems"
        ]
      },
      {
        "module": "RAG Systems",
        "topics": [
          "Vector Database Design",
          "Hybrid Search",
          "Retrieval Optimization"
        ]
      },
      {
        "module": "Production Grade AI",
        "topics": [
          "Monitoring AI Performance",
          "Unit Testing for LLMs",
          "API Deployment"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Kevin Zhang",
      "role": "LLM Architect",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "Is coding required for this track?",
        "a": "Yes. A strong logical baseline or prior familiarity with Python is highly recommended, as you will be programming core application architectures."
      },
      {
        "q": "What tools and technologies will I use?",
        "a": "Python, popular machine learning libraries, vector storage engines, model hosting platforms, and system deployment frameworks."
      },
      {
        "q": "How long does this developer track take?",
        "a": "This program is completed over 3 to 6 months and is available offline at Nagercoil or through live online streaming."
      },
      {
        "q": "How does the Pay After Placement model apply here?",
        "a": "You can complete your entire training and build custom models for zero upfront tuition. You only pay once you secure a job in the field."
      }
    ]
  },
  "ai-data-science": {
    "slug": "ai-data-science",
    "title": "AI & Data Science",
    "heroDesc": "Comprehensive study of AI and Data Science concepts. Master the tools and machine learning models that drive the AI revolution.",
    "metaDesc": "Comprehensive study of AI and Data Science concepts. Master the tools and machine learning models that drive the AI revolution.",
    "overview": "Master Statistical Modeling, Machine Learning Algorithms, and Predictive AI Systems. Transform raw, unorganized corporate information into predictive intelligence engines with our 100% placement-supported bootcamp in Nagercoil.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "The Blueprint of Enterprise",
        "desc": "Every global organization depends entirely on data science to forecast revenue, understand consumer patterns, and outpace market competitors."
      },
      {
        "title": "Incredible Salary Growth",
        "desc": "Experienced data scientists command premium compensation packages due to the direct fiscal value they extract from data assets."
      },
      {
        "title": "Versatile Industry Scope",
        "desc": "From banking risk assessments to automated medical diagnostics, data science skills translate perfectly across any sector worldwide."
      },
      {
        "title": "High Structural Security",
        "desc": "Data-driven roles offer massive long-term stability as modern businesses shift to entirely data-dependent operation workflows."
      }
    ],
    "curriculum": [
      {
        "module": "Statistical Foundations",
        "topics": [
          "Probability Theory",
          "Inferential Statistics",
          "Hypothesis Testing"
        ]
      },
      {
        "module": "Machine Learning",
        "topics": [
          "Supervised Learning",
          "Unsupervised Learning",
          "Deep Learning Foundations"
        ]
      },
      {
        "module": "AI Engineering",
        "topics": [
          "Natural Language Processing",
          "Computer Vision",
          "LLM Fine-tuning"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Dr. Sarah Lee",
      "role": "AI Research Scientist",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What tools are covered in this curriculum?",
        "a": "Python, SQL engines, data cleaning libraries, machine learning frameworks, and interactive enterprise data visualization platforms."
      },
      {
        "q": "I don't have a strong math degree, can I join?",
        "a": "Yes. We introduce foundational statistics and probability concepts intuitively through real, practical business examples."
      },
      {
        "q": "What is the course duration and learning options?",
        "a": "The course lasts 3 to 6 months and is available at our Nagercoil center or via interactive online tracks."
      },
      {
        "q": "What placement support do you guarantee?",
        "a": "We offer full portfolio reviews, ATS resume design, mock interviews, and direct placement opportunities across our corporate partner networks."
      }
    ]
  },
  "data-analytics-ai": {
    "slug": "data-analytics-ai",
    "title": "Data Analytics with AI",
    "heroDesc": "Advanced data analytics techniques powered by AI tools. Learn to turn raw data into strategic, actionable business insights.",
    "metaDesc": "Advanced data analytics techniques powered by AI tools. Learn to turn raw data into strategic, actionable business insights.",
    "overview": "Master Business Intelligence, Interactive Reporting, and Automated Data Parsing. Learn to build beautiful, intelligent analytics dashboards that help companies make profitable, data-driven decisions via our Nagercoil training academy.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Immediate Corporate Openings",
        "desc": "Almost every mid-sized business needs dedicated data analysts to track sales funnels, look at ad spending performance, and optimize costs."
      },
      {
        "title": "Clear Career Growth",
        "desc": "Data analysts work directly with executive leadership teams, creating direct opportunities to move up into strategic management roles."
      },
      {
        "title": "Highly Accessible Tech Track",
        "desc": "Perfect for individuals wanting a respected technology career that focuses heavily on logic and business insights over deep engine coding."
      },
      {
        "title": "Invaluable Decision Power",
        "desc": "Analysts directly influence company profitability, making them highly appreciated and indispensable team members."
      }
    ],
    "curriculum": [
      {
        "module": "Data Visualization",
        "topics": [
          "Power BI Advanced",
          "Narrative Storytelling",
          "Dashboard Optimization"
        ]
      },
      {
        "module": "Predictive Modeling",
        "topics": [
          "Time Series Analysis",
          "Forecasting Techniques",
          "Regression Models"
        ]
      },
      {
        "module": "AI for Data",
        "topics": [
          "Automated Data Prep",
          "Natural Language Queries",
          "Anomaly Detection"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "James Wilson",
      "role": "Lead Data Analyst",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What is the difference between Data Science and Data Analytics?",
        "a": "Analytics looks at historic and current data to guide active business choices; Science focuses on building advanced machine learning models to forecast long-term future trends."
      },
      {
        "q": "What software will I learn during the program?",
        "a": "Advanced relational database management tools (SQL), interactive dashboard platforms, analytical spreadsheet frameworks, and AI data parsing software."
      },
      {
        "q": "How long does this program run?",
        "a": "This course is completed over 3 to 6 months and is held as a premium offline program in Nagercoil as well as online."
      },
      {
        "q": "Do I get real work experience?",
        "a": "Yes. Students transition into a practical internship track, graduating with an official Internship Certificate and a live dashboard portfolio."
      }
    ]
  },
  "data-engineering": {
    "slug": "data-engineering",
    "title": "Data Engineering & Big Data Pipelines",
    "heroDesc": "Master the data architecture and engineering required for big data. Build the pipes that fuel the modern tech industry.",
    "metaDesc": "Master the data architecture and engineering required for big data. Build the pipes that fuel the modern tech industry.",
    "overview": "Build, Secure, and Maintain Large-Scale Enterprise Data Pipelines & Infrastructure. Learn how to engineer the underlying software pipelines that move, store, and process massive data streams for modern enterprise systems via our Nagercoil bootcamp.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Critical Tech Infrastructure",
        "desc": "Data scientists and analysts cannot do their jobs without data engineers building the secure, fast systems that move the actual data."
      },
      {
        "title": "Massive Enterprise Demand",
        "desc": "Tech companies are heavily investing in data pipelines, creating a continuous shortage of certified infrastructure engineers."
      },
      {
        "title": "High Career Premium",
        "desc": "Data engineers often earn higher starting compensation packages than standard developers due to the technical complexity of data pipelines."
      },
      {
        "title": "Future-Proof Skillset",
        "desc": "As data volumes continue to grow exponentially, the systems that organize and clean this data will always remain vital."
      }
    ],
    "curriculum": [
      {
        "module": "Big Data Pipelines",
        "topics": [
          "Apache Spark",
          "Airflow Scheduling",
          "Kafka Streaming"
        ]
      },
      {
        "module": "Cloud Architecture",
        "topics": [
          "AWS Redshift",
          "Snowflake Data Warehouse",
          "Cloud Security"
        ]
      },
      {
        "module": "Data Modeling",
        "topics": [
          "Star Schema",
          "Data Lakes vs Warehouses",
          "SQL Query Optimization"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "David Chen",
      "role": "Data Architect",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What are the primary modules covered?",
        "a": "Advanced relational databases, big data pipeline creation, automated cloud integration systems, data cleaning processes, and pipeline monitoring."
      },
      {
        "q": "Is this course code-heavy?",
        "a": "Yes. This track involves programming data logic and managing systems infrastructure, making it ideal for those who enjoy backend structures and architecture."
      },
      {
        "q": "What is the duration and mode of learning?",
        "a": "The program is completed over 3 to 6 months and is available offline at Nagercoil or via live online tracks."
      },
      {
        "q": "Do you help with job placement?",
        "a": "Yes. Our dedicated cell helps you build a strong GitHub portfolio, optimizes your resume for ATS, and schedules interviews directly with our hiring partners."
      }
    ]
  },
  "ui-ux-design": {
    "slug": "ui-ux-design",
    "title": "UI/UX Design",
    "heroDesc": "Master the art of designing intuitive, beautiful user interfaces and experiences using industry-standard design tools.",
    "metaDesc": "Master the art of designing intuitive, beautiful user interfaces and experiences using industry-standard design tools.",
    "overview": "Master User Research, Wireframing, and High-Fidelity Interface Prototyping. Learn user psychology and digital design to build beautiful, intuitive mobile applications and website layouts with our 100% placement-backed Nagercoil bootcamp.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "The Core of Product Success",
        "desc": "A digital application's success depends entirely on its usability. Companies hire UI/UX designers to keep users happy and engaged."
      },
      {
        "title": "No-Code Creative Tech Career",
        "desc": "Ideal for creative individuals who want to work in premium software companies without writing complex backend programming code."
      },
      {
        "title": "Exceptional Career Freedom",
        "desc": "UI/UX designers can jump between corporate product design roles, startup consulting, or high-paying global freelance design contracts."
      },
      {
        "title": "High Financial Upside",
        "desc": "Skilled product designers command exceptional compensation packages as they directly influence a brand's customer conversion metrics."
      }
    ],
    "curriculum": [
      {
        "module": "Design Thinking",
        "topics": [
          "Empathize & Define",
          "Ideation Techniques",
          "User Persona Mapping"
        ]
      },
      {
        "module": "UI Components",
        "topics": [
          "Visual Hierarchy",
          "Typography & Color Theory",
          "Auto-layout in Figma"
        ]
      },
      {
        "module": "UX Research",
        "topics": [
          "Usability Testing",
          "Information Architecture",
          "Wireframing Basics"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Elena Rossi",
      "role": "Sr. Product Designer",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What software tools will I master?",
        "a": "Industry-standard vector prototyping suites, interactive design workflow managers, digital whiteboards, and component libraries."
      },
      {
        "q": "Do I need an art background?",
        "a": "No. UI/UX design is based on structural logic, grid frameworks, design principles, and user behavior data—all of which we teach systematically."
      },
      {
        "q": "What is the course duration and mode of learning?",
        "a": "The program is 3 to 6 months long and is delivered offline at our Nagercoil center and via flexible online tracks."
      },
      {
        "q": "Do you support freelance portfolio building?",
        "a": "Yes. Our program includes modules on pitching freelance clients, preparing design proposals, and launching an independent studio."
      }
    ]
  },
  "web-designing": {
    "slug": "web-designing",
    "title": "Web Designing",
    "heroDesc": "Learn modern web design principles and tools to create stunning websites. Master layouts, typography, and responsiveness.",
    "metaDesc": "Learn modern web design principles and tools to create stunning websites. Master layouts, typography, and responsiveness.",
    "overview": "Master Responsive Web Layouts, Landing Page Optimization, and Front-End Interface Design. Learn to design visually stunning, responsive business websites that adapt perfectly across mobile, desktop, and tablet screens via our Nagercoil academy.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Continuous Corporate Demand",
        "desc": "Every business globally requires an online presence. Millions of websites are built or redesigned monthly, keeping skilled design talent busy."
      },
      {
        "title": "Rapid Freelance Monetization",
        "desc": "Web designing is one of the easiest skills to monetize quickly through independent freelance projects for local or international business owners."
      },
      {
        "title": "Perfect Bridge to Tech",
        "desc": "This track serves as the ideal baseline for entering the technology sector, pairing visual design execution with foundational front-end programming."
      },
      {
        "title": "Dynamic Creative Satisfaction",
        "desc": "Combine logical coding frameworks with fluid aesthetic designs to bring interactive concepts to life."
      }
    ],
    "curriculum": [
      {
        "module": "Web Layouts",
        "topics": [
          "Box Model Mastery",
          "CSS Grid & Flexbox",
          "Semantic HTML"
        ]
      },
      {
        "module": "Visual Design",
        "topics": [
          "Responsive Typography",
          "SVG Icons & Graphics",
          "Aesthetics for Web"
        ]
      },
      {
        "module": "Optimization",
        "topics": [
          "Web Performance",
          "Accessibility (a11y)",
          "SEO Basics for Designers"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Mark Peterson",
      "role": "Web Designer",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What is covered in this curriculum?",
        "a": "Visual layout design systems, modern front-end styling structures, responsive web formatting grids, and production site components."
      },
      {
        "q": "How does this differ from Fullstack courses?",
        "a": "Web Designing focuses heavily on visual experience, styling setups, layout design, and landing page presentation, rather than database architecture and application logic."
      },
      {
        "q": "How long is this program?",
        "a": "This web design bootcamp spans 3 to 6 months and is available as an offline course in Nagercoil or online."
      },
      {
        "q": "How does Pay After Placement help me?",
        "a": "It completely removes tuition risks. You learn, complete your internship, build a portfolio, and only pay us once you secure a job in the industry."
      }
    ]
  },
  "graphic-designing": {
    "slug": "graphic-designing",
    "title": "Graphic Designing & Branding",
    "heroDesc": "Master visual communication and corporate branding through professional graphic design. Create impact through visuals.",
    "metaDesc": "Master visual communication and corporate branding through professional graphic design. Create impact through visuals.",
    "overview": "Master Visual Branding, Corporate Identity Design, and Marketing Asset Creation. Learn the principles of composition, color psychology, and professional layout systems to build high-end marketing campaigns at our Nagercoil academy.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "The Core of Brand Identity",
        "desc": "From logos to promotional banners, every company requires professional visuals to attract clients and maintain authority."
      },
      {
        "title": "Diverse Industry Placement",
        "desc": "Graphic designers find immediate placement across advertising agencies, corporate branding teams, publisher units, and media houses."
      },
      {
        "title": "Thriving Independent Career",
        "desc": "Graphic layout design offers immense scope for independent freelancing, remote agency contracts, and design template creation."
      },
      {
        "title": "Highly Adaptable Skill",
        "desc": "Good visual design skills transfer easily across social media marketing, user interface styling, and print publication industries."
      }
    ],
    "curriculum": [
      {
        "module": "Branding Foundations",
        "topics": [
          "Logo Design Principles",
          "Brand Identity Systems",
          "Color Psychology"
        ]
      },
      {
        "module": "Vector Illustration",
        "topics": [
          "Pen Tool Mastery",
          "Pathfinder Operations",
          "Digital Arts"
        ]
      },
      {
        "module": "Print & Media",
        "topics": [
          "Layout for Print",
          "Typography in Media",
          "Exporting for Production"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Sofia Garcia",
      "role": "Art Director",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What application suites will I master?",
        "a": "Industry-standard vector illustration software, raster digital image manipulation tools, and publication layout programs."
      },
      {
        "q": "What career paths are available after this course?",
        "a": "Brand Identity Designer, Creative Director, Marketing Layout Artist, and Independent Visual Consultant."
      },
      {
        "q": "How long is this course and what is the mode?",
        "a": "This professional program is 3 to 6 months long and is available at our Nagercoil campus and online."
      },
      {
        "q": "Is prior art experience needed?",
        "a": "No. We teach design rules, grid structures, color theory, and software techniques systematically from the ground up."
      }
    ]
  },
  "video-editing": {
    "slug": "video-editing",
    "title": "Video Editing",
    "heroDesc": "Master professional video editing with Premiere Pro and After Effects. Learn to create cinematic digital experiences.",
    "metaDesc": "Master professional video editing with Premiere Pro and After Effects. Learn to create cinematic digital experiences.",
    "overview": "Become a professional video editor by mastering cinematic editing, storytelling, motion graphics, color grading, visual effects, YouTube editing, commercial editing, and AI-powered editing workflows. Learn industry-standard software and production techniques used by agencies, filmmakers, YouTubers, and content creators at Karka AI & Tech Academy, Nagercoil.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Content is King",
        "desc": "Every brand, influencer, YouTuber, filmmaker, and company needs engaging video content to reach millions of viewers."
      },
      {
        "title": "Massive Creator Economy Demand",
        "desc": "Video editors are among the highest-demand creative professionals across agencies, production houses, startups, and social media platforms."
      },
      {
        "title": "Creative & High-Paying Career",
        "desc": "Build a career as a Video Editor, Motion Graphics Designer, Reels Editor, YouTube Editor, or Commercial Editor."
      },
      {
        "title": "Freelance & Remote Opportunities",
        "desc": "Work with international clients, YouTubers, agencies, and brands from anywhere in the world."
      }
    ],
    "curriculum": [
      {
        "module": "Video Fundamentals",
        "topics": [
          "Storyboarding",
          "Cutting Techniques",
          "Audio Synchronization"
        ]
      },
      {
        "module": "Visual Effects",
        "topics": [
          "Color Grading",
          "Green Screen Mastery",
          "After Effects Compositing"
        ]
      },
      {
        "module": "Output & Optimization",
        "topics": [
          "Encoding for Web",
          "Social Media Formats",
          "Sound Design"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Lucas Vance",
      "role": "Lead Editor",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What career opportunities are available?",
        "a": "You can become a Professional Video Editor, Motion Graphics Designer, YouTube Video Editor, Social Media Video Editor, Reels Editor, Content Creator, Post Production Editor, or Freelance Video Editor."
      },
      {
        "q": "Will I learn AI editing tools?",
        "a": "Yes. The curriculum includes AI-powered editing, automatic subtitles, voice enhancement, background removal, AI video generation, motion tracking, and smart editing workflows alongside Premiere Pro, After Effects, and DaVinci Resolve."
      },
      {
        "q": "How long is the course?",
        "a": "The Video Editing course runs for 3-6 months and is available Offline (Nagercoil Campus) and Online."
      },
      {
        "q": "Do I need editing experience?",
        "a": "No. This course starts from the fundamentals and gradually advances to professional-level editing, cinematic storytelling, motion graphics, and commercial video production."
      }
    ]
  },
  "graphic-designing-dm": {
    "slug": "graphic-designing-dm",
    "title": "Social Media Graphic Design",
    "heroDesc": "Learn visual storytelling and creative design principles for digital media. Create impactful designs for every platform.",
    "metaDesc": "Learn visual storytelling and creative design principles for digital media. Create impactful designs for every platform.",
    "overview": "Master Social-First Visual Content, Thumbnail Design, and Digital Ad Creatives. Learn to design scroll-stopping graphics for Instagram, YouTube, and social ad campaigns as part of our Digital Media track in Nagercoil.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Built for the Feed",
        "desc": "Every reel, post, and thumbnail lives or dies by its first-second visual impact — this track trains you specifically for that fast-scroll, mobile-first audience."
      },
      {
        "title": "Paired With Video & Motion",
        "desc": "Learn graphic design alongside the video editing and animation skills in this track, so you can design cohesive visuals across a creator's entire content pipeline, not just static posts."
      },
      {
        "title": "Creator Economy Demand",
        "desc": "Influencers, YouTubers, and social-first brands constantly need thumbnail artists and social creative designers — a fast-growing, high-volume freelance market."
      },
      {
        "title": "Rapid Turnaround Skillset",
        "desc": "Master template-driven, high-speed design workflows built for daily content output, not slow campaign cycles."
      }
    ],
    "curriculum": [
      {
        "module": "Design Principles",
        "topics": [
          "Composition Rules",
          "Color Harmonies",
          "Typography Basics"
        ]
      },
      {
        "module": "Social Media Graphics",
        "topics": [
          "Ad Creatives",
          "Instagram Grid Layouts",
          "Post Styles"
        ]
      },
      {
        "module": "Branding",
        "topics": [
          "Logo Design",
          "Style Guides",
          "Brand Assets Implementation"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Mia Wong",
      "role": "Creative Director",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "How is this different from the Graphic Designing course in the Design track?",
        "a": "This track focuses on fast, social-first visual content — thumbnails, reel covers, Instagram/YouTube creatives, and ad graphics — designed to pair with our video editing and animation courses. The Design track's Graphic Designing course instead covers brand identity, print, and corporate marketing collateral."
      },
      {
        "q": "What software tools will I use?",
        "a": "Photoshop and Illustrator, focused on social media templates, thumbnail design, and quick-turnaround ad creative workflows."
      },
      {
        "q": "Do I need prior design experience?",
        "a": "No. We teach composition, color, and typography fundamentals from scratch, applied directly to social and video-adjacent design work."
      },
      {
        "q": "What is the course duration and mode?",
        "a": "This course runs for 3 months and is available offline at our Nagercoil campus or online."
      }
    ]
  },
  "multimedia-animation": {
    "slug": "multimedia-animation",
    "title": "Multimedia & Animation",
    "heroDesc": "Explore the world of 2D/3D animation and multimedia production. Breathe life into your imagination with practical projects.",
    "metaDesc": "Explore the world of 2D/3D animation and multimedia production. Breathe life into your imagination with practical projects.",
    "overview": "Master Motion Graphics, Visual Effects, and Dynamic 2D/3D Animation Sequences. Learn to build premium title animations, kinetic typography, and complex visual effects sequences with our 100% placement-supported bootcamp in Nagercoil.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Premium Creative Career",
        "desc": "Motion graphic designers and animators are among the highest-paid professionals in the creative media and tech fields."
      },
      {
        "title": "High Industry Versatility",
        "desc": "Your assets will power mobile application animations, corporate videos, explanatory advertisements, UI interactions, and streaming titles."
      },
      {
        "title": "Immense Competitive Value",
        "desc": "Adding motion elements to standard design work multiplies your professional capability and hourly freelance billing rates significantly."
      },
      {
        "title": "Lucrative Global Markets",
        "desc": "High-end motion graphics and visual effects are heavily outsourced, opening doors to highly lucrative international remote projects."
      }
    ],
    "curriculum": [
      {
        "module": "D Animation",
        "topics": [
          "Traditional vs Digital",
          "Character Rigging",
          "Motion Paths"
        ]
      },
      {
        "module": "D Modeling",
        "topics": [
          "Geometry & Topology",
          "Texturing & Lighting",
          "Rendering Basics"
        ]
      },
      {
        "module": "Special Effects",
        "topics": [
          "Particle Systems",
          "Fluid Dynamics",
          "Final Compositing"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Ethan Hunt",
      "role": "Animation Lead",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What application suites will I learn?",
        "a": "Industry-leading motion design software, compositing programs, vector animation suites, and digital asset manipulation systems."
      },
      {
        "q": "Is this course suitable for beginners?",
        "a": "Yes. We introduce foundational concepts—including timeline physics, keyframing rules, and composition principles—step-by-step from scratch."
      },
      {
        "q": "What is the duration and mode of study?",
        "a": "The animation program takes 3 to 6 months and is available at our Nagercoil training facility or through interactive online modes."
      },
      {
        "q": "Do you offer job placement support?",
        "a": "Yes. We provide direct placement access, resume optimizations, mock interview coaching, and expert portfolio reviews."
      }
    ]
  },
  "digital-marketing": {
    "slug": "digital-marketing",
    "title": "Digital Marketing",
    "heroDesc": "Master SEO, SEM, and social media marketing to drive business growth. Become a highly paid, data-driven marketer.",
    "metaDesc": "Master SEO, SEM, and social media marketing to drive business growth. Become a highly paid, data-driven marketer.",
    "overview": "Master the art of digital growth through SEO, social media marketing, paid advertising, content strategy, email marketing, analytics, and AI-powered marketing automation. Learn how successful brands generate leads, increase sales, and build a strong online presence using modern digital marketing strategies at Karka AI & Tech Academy, Nagercoil.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "The Future of Marketing",
        "desc": "Every business today depends on digital platforms to reach customers. Digital marketing professionals are among the most in-demand experts worldwide."
      },
      {
        "title": "Huge Industry Demand",
        "desc": "Companies, startups, agencies, and e-commerce businesses constantly hire SEO specialists, performance marketers, social media managers, and marketing strategists."
      },
      {
        "title": "High Income Opportunities",
        "desc": "Work as a Digital Marketing Executive, Performance Marketer, SEO Specialist, Google Ads Expert, Meta Ads Specialist, or become a successful freelancer."
      },
      {
        "title": "Business & Freelancing Freedom",
        "desc": "Learn skills that help you build your own agency, grow personal brands, manage client campaigns, or launch your own business."
      }
    ],
    "curriculum": [
      {
        "module": "Marketing Strategy",
        "topics": [
          "Consumer Research",
          "Competitive Analysis",
          "Campaign Planning"
        ]
      },
      {
        "module": "Paid Channels",
        "topics": [
          "Google Search Ads",
          "Facebook Ad Manager",
          "Re-targeting Strategies"
        ]
      },
      {
        "module": "Analytics",
        "topics": [
          "Google Analytics 4",
          "Performance Metrics",
          "Conversion Rate Optimization"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Samantha Bloom",
      "role": "Growth Marketer",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What is the mode of training?",
        "a": "We offer both online and offline training options to suit your convenience."
      },
      {
        "q": "Do you offer placement support?",
        "a": "Yes, we provide 100% placement support including resume building and mock interviews."
      },
      {
        "q": "Can I pay in installments?",
        "a": "Yes, we have flexible EMI options available."
      }
    ]
  },
  "seo-analyst": {
    "slug": "seo-analyst",
    "title": "SEO Analyst",
    "heroDesc": "Become an expert in search engine optimization and data-driven marketing. Rule the search results and drive business growth.",
    "metaDesc": "Become an expert in search engine optimization and data-driven marketing. Rule the search results and drive business growth.",
    "overview": "Master Technical SEO, Semantic Keyword Mapping, and Search Engine Algorithms. Master technical SEO, search algorithms, semantic keyword mapping, and backlink strategy to rank business websites on page one of Google organic search. Learn the engineering and content structures needed to scale organic website traffic predictably via our Nagercoil academy. The Ultimate Marketing Edge: To make you a truly complete marketer, this track now includes comprehensive bonus modules in professional Graphic Designing and Video Editing. You won’t just know how to rank a page—you will master how to design eye-catching search graphics and edit high-retention video content that turns organic traffic into paying customers!",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "High Business Capital Value",
        "desc": "Free organic search traffic is incredibly valuable to businesses. A certified SEO analyst directly saves companies thousands in ad spending."
      },
      {
        "title": "Long-Term Corporate Value",
        "desc": "SEO is an ongoing process, leading to highly stable corporate jobs and long-term consulting retainers for marketing professionals."
      },
      {
        "title": "Data-Driven Strategic Path",
        "desc": "Perfect for individuals who enjoy analytical breakdowns, market research, code structural audits, and semantic content strategy."
      },
      {
        "title": "Excellent Freelance Scope",
        "desc": "Most businesses struggle with SEO and aggressively hire external analysts on stable monthly retainer contracts."
      }
    ],
    "curriculum": [
      {
        "module": "On-Page SEO",
        "topics": [
          "Keyword Strategy",
          "Meta Management",
          "Content Optimization"
        ]
      },
      {
        "module": "Technical SEO",
        "topics": [
          "Indexing & Crawling",
          "Core Web Vitals",
          "Site Auditing"
        ]
      },
      {
        "module": "Off-Page SEO",
        "topics": [
          "Link Building",
          "Domain Authority",
          "Competitor Comparison"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Leo Miller",
      "role": "SEO Specialist",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What software tools are covered in this course?",
        "a": "Enterprise search performance management dashboards, crawl simulation tools, keyword competition analytics engines, and local map data systems."
      },
      {
        "q": "Is this course code-heavy?",
        "a": "No. While you will interact with web structures, layout tags, and speed parameters, it focuses on strategy and analytics rather than deep programming code."
      },
      {
        "q": "What is the duration of this program?",
        "a": "The certification track runs for 3 to 6 months and is delivered as a premium offline course in Nagercoil or via interactive online tracks."
      },
      {
        "q": "How does the Pay After Placement structure help me?",
        "a": "It eliminates financial risk. You learn from experts, build real-world performance case studies, and start payments only when you land an industry role."
      }
    ]
  },
  "storytelling-content-writing": {
    "slug": "storytelling-content-writing",
    "title": "Storytelling & Content Writing",
    "heroDesc": "Craft compelling stories and high-quality content for various platforms. Master the art of the professional written word.",
    "metaDesc": "Craft compelling stories and high-quality content for various platforms. Master the art of the professional written word.",
    "overview": "Master High-Converting Copywriting, Narrative Brand Strategy, and Modern Content Engineering. Learn the psychological triggers of copywriting and narrative content creation to write compelling scripts, blogs, and marketing funnels that drive audience action. Learn the psychological frameworks behind written content that captures attention and reliably drives customer conversions at our Nagercoil academy. The Ultimate Marketing Edge: Great writing needs great visuals to stand out online. This program features hands-on bonus modules in Graphic Designing and Video Editing. You will learn how to design stunning layouts for your written pieces and edit highly engaging video reels from your own scripts—giving you the exact multi-media toolkit modern agencies look for!",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "The Engine of Every Campaign",
        "desc": "Every script, ad graphic text, email blast, website landing page, and corporate presentation requires compelling text to succeed."
      },
      {
        "title": "Unmatched Freelance Flexibility",
        "desc": "Professional content writers can secure diverse freelance retainer streams, ranging from scriptwriting to technical corporate content writing."
      },
      {
        "title": "High Modern Demand",
        "desc": "Brands need a consistent voice across digital channels, creating a continuous need for versatile, strategic text content engineers."
      },
      {
        "title": "Low Barrier to Entry",
        "desc": "Start a professional digital career using your logical thinking and language skills without needing any technical software code."
      }
    ],
    "curriculum": [
      {
        "module": "Copywriting",
        "topics": [
          "Headline Analysis",
          "Call-to-Action (CTA)",
          "Sales Copy Techniques"
        ]
      },
      {
        "module": "Long-form Content",
        "topics": [
          "Blogging Strategies",
          "E-book Creation",
          "Whitepapers"
        ]
      },
      {
        "module": "Content Strategy",
        "topics": [
          "Editorial Calendars",
          "Tone of Voice",
          "Content Audits"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Diana Prince",
      "role": "Content Strategist",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What career trajectories are available?",
        "a": "Conversion Copywriter, Brand Storyteller, Script Supervisor, Content Manager, and Corporate Communications Specialist."
      },
      {
        "q": "Will I learn SEO writing in this course?",
        "a": "Yes. A significant portion of this bootcamp focuses on writing highly optimized copy that ranks on search engines while keeping human readers fully engaged."
      },
      {
        "q": "How long is this program and how is it held?",
        "a": "The course spans 3 to 6 months and is available offline at our Nagercoil campus and online."
      },
      {
        "q": "Do I get an official certificate?",
        "a": "Yes. You will graduate with an official Karka Academy Content Writing Certification and a verified portfolio of published copy."
      }
    ]
  },
  "cloud-devops": {
    "slug": "cloud-devops",
    "title": "Cloud & DevOps Engineering",
    "heroDesc": "Master cloud infrastructure and DevOps practices for scalable systems. Put modern cloud infrastructure at your fingertips.",
    "metaDesc": "Master cloud infrastructure and DevOps practices for scalable systems. Put modern cloud infrastructure at your fingertips.",
    "overview": "Master AWS Cloud Architecture, Continuous Integration (CI/CD), and System Automation. Learn how to orchestrate automated deployment architectures, manage cloud server systems, and keep massive software networks running flawlessly via our Nagercoil bootcamp.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Elite Tech Salaries",
        "desc": "Cloud architecture and DevOps are critical to keeping platforms online, making these roles some of the highest-paying tracks in the tech sector."
      },
      {
        "title": "High Operational Value",
        "desc": "Companies prioritize engineers who can deploy code fast, reduce cloud bills, and prevent software crashes under heavy user traffic."
      },
      {
        "title": "Excellent Career Longevity",
        "desc": "As global business ecosystems shift entirely to cloud networks, certified systems infrastructure engineers enjoy massive job security."
      },
      {
        "title": "Global Remote Work Scope",
        "desc": "Cloud systems management is done completely over the internet, making it highly suited for international remote developer contracts."
      }
    ],
    "curriculum": [
      {
        "module": "Cloud Platforms",
        "topics": [
          "AWS Core Services",
          "IAM & Security",
          "Serverless Architecture"
        ]
      },
      {
        "module": "Containerization",
        "topics": [
          "Docker Essentials",
          "Kubernetes Orchestration",
          "Helm Charts"
        ]
      },
      {
        "module": "Automation",
        "topics": [
          "Terraform (IaC)",
          "Jenkins/GitHub Actions",
          "Monitoring & Logging"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "John Cloud",
      "role": "DevOps Engineer",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What are the primary prerequisites?",
        "a": "Foundational understanding of standard networking concepts or basic script logic is helpful; our track introduces advanced operations systematically."
      },
      {
        "q": "What platforms will I master during the course?",
        "a": "Leading public cloud infrastructure providers, container deployment systems, automatic integration frameworks, configuration systems, and monitoring dashboards."
      },
      {
        "q": "How long is this bootcamp?",
        "a": "This intensive systems program takes 3 to 6 months and is available as an offline lab in Nagercoil or via active online paths."
      },
      {
        "q": "Does Karka support mock interview preparation?",
        "a": "Yes. We host technical architecture review sessions, interview coaching, system design questions, and direct scheduling with network partners."
      }
    ]
  },
  "automation-testing": {
    "slug": "automation-testing",
    "title": "QA Automation Testing",
    "heroDesc": "Master software testing and automation frameworks to ensure high-quality software delivery.",
    "metaDesc": "Master software testing and automation frameworks to ensure high-quality software delivery.",
    "overview": "Master Selenium Testing Frameworks, Quality Assurance (QA) Automation, and API Validation. Learn to build automated script suites that test enterprise web and mobile applications for errors before they reach production via our Nagercoil bootcamp.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Flawless Software Priority",
        "desc": "No company launches software without testing. Automated QA engineers ensure platforms run smoothly, making them essential to development teams."
      },
      {
        "title": "High Scalability Demand",
        "desc": "Manual software checking takes too long. Companies aggressively recruit engineers who can write code to test code automatically at scale."
      },
      {
        "title": "Accessible Technical Path",
        "desc": "An ideal tech entry point for those who want a structured coding career focused on logical system diagnostics, bug analysis, and system verification."
      },
      {
        "title": "Strong Career Progression",
        "desc": "Automation testers easily transition into Quality Assurance Lead, Release Manager, and Systems Architecture positions."
      }
    ],
    "curriculum": [
      {
        "module": "Manual Testing",
        "topics": [
          "Test Planning",
          "Test Cases",
          "Bug Tracking"
        ]
      },
      {
        "module": "Automation Frameworks",
        "topics": [
          "Selenium WebDriver",
          "Cypress Essentials",
          "API Testing"
        ]
      },
      {
        "module": "CI/CD Integration",
        "topics": [
          "GitHub Actions",
          "Jenkins integration",
          "Continuous Testing"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Sarah Connor",
      "role": "QA Engineer",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What software frameworks are covered in this track?",
        "a": "Standard automated web testing suites, scripting language setups, API verification dashboards, and production bug tracking portals."
      },
      {
        "q": "How does this compare to Manual Testing?",
        "a": "Manual testing involves clicking through apps by hand; Automation Testing teaches you to write efficient code scripts that check systems automatically, making it faster and more scalable."
      },
      {
        "q": "What is the course duration and mode?",
        "a": "This QA certification runs for 3 to 6 months and is available at our Nagercoil center or via online classrooms."
      },
      {
        "q": "Is prior software development experience required?",
        "a": "No. We teach the logical coding basics, scripting patterns, and testing frameworks completely from scratch."
      }
    ]
  },
  "mobile-app-development": {
    "slug": "mobile-app-development",
    "title": "Mobile App Development",
    "heroDesc": "Build cross-platform iOS and Android apps with React Native and Flutter. Launch real, production-ready apps to the App Store and Play Store.",
    "metaDesc": "Build cross-platform iOS and Android apps with React Native and Flutter. Launch real, production-ready apps to the App Store and Play Store.",
    "overview": "Master Cross-Platform Application Building via Modern Framework Ecosystems. Learn how to design, program, and deploy high-performance mobile apps for both iOS and Android platforms from a single codebase with our Nagercoil training program.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Mobile-First Global Shift",
        "desc": "Consumers spend hours daily on mobile apps. Every modern service business requires an app to engage users and drive revenue."
      },
      {
        "title": "High Innovation Flexibility",
        "desc": "App development provides a direct path to launching your own digital product startup or working as an independent global developer."
      },
      {
        "title": "Premium Tech Positions",
        "desc": "Cross-platform app developers command excellent compensation structures and remote freelance contracts due to their dual iOS and Android output capabilities."
      },
      {
        "title": "Fast Business Realization",
        "desc": "Build fully functional app prototypes quickly and pitch your ideas to startup investors or launch them directly on stores."
      }
    ],
    "curriculum": [
      {
        "module": "UI/UX for Mobile",
        "topics": [
          "Mobile Design Patterns",
          "Responsive Layouts",
          "Navigation"
        ]
      },
      {
        "module": "Cross-Platform",
        "topics": [
          "React Native Basics",
          "Flutter Framework",
          "State Management"
        ]
      },
      {
        "module": "Native Features",
        "topics": [
          "Camera & Location",
          "Push Notifications",
          "App Store Deployment"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Mike Tyson",
      "role": "Mobile Dev",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What core frameworks are covered in this program?",
        "a": "Industry-leading cross-platform application frameworks, cloud data integration components, native hardware interface tools, and app store deployment tracks."
      },
      {
        "q": "Do I need a Mac computer to join this track?",
        "a": "No. Our Nagercoil campus labs feature fully loaded computing hardware setups configured for complete cross-platform app testing and deployment."
      },
      {
        "q": "How long is this developer bootcamp?",
        "a": "The mobile application course takes 3 to 6 months and is delivered offline at our Nagercoil center and online."
      },
      {
        "q": "How does Karka's placement process work?",
        "a": "We offer direct portfolio reviews, app deployment showcases, resume writing, mock technical interview sessions, and direct corporate interviews."
      }
    ]
  },
  "hr-finance": {
    "slug": "hr-finance",
    "title": "HR & Finance Management",
    "heroDesc": "Master the essentials of Human Resources and Financial Management. Build a strong foundation in corporate operations.",
    "metaDesc": "Master the essentials of Human Resources and Financial Management. Build a strong foundation in corporate operations.",
    "overview": "Master Corporate Human Resources Recruiting, Payroll Frameworks, and Business Financial Operations. Learn the administrative strategies and compliance workflows needed to manage corporate talent and finance operations via our Nagercoil training academy.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "The Operational Spine",
        "desc": "Behind every successful tech platform or local business is an operations team that keeps personnel organized and budgets balanced."
      },
      {
        "title": "High Corporate Placement",
        "desc": "Companies across every industry continuously recruit operations managers to handle hiring, employee benefits, and financial tracking."
      },
      {
        "title": "Respected Management Path",
        "desc": "Provides a direct route into corporate leadership, giving you key insights into how corporate networks function internally."
      },
      {
        "title": "Invaluable Cross-Domain Skills",
        "desc": "Understanding both talent management and operational budgets makes you a highly flexible executive in any corporate structure."
      }
    ],
    "curriculum": [
      {
        "module": "HR Management",
        "topics": [
          "Strategic HR Planning",
          "Performance Appraisals",
          "Organizational Behavior"
        ]
      },
      {
        "module": "Financial Literacy",
        "topics": [
          "Corporate Finance",
          "Budgeting & Forecasting",
          "Investment Analysis"
        ]
      },
      {
        "module": "Compliance",
        "topics": [
          "Labor Laws",
          "Financial Regulations",
          "Corporate Ethics"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Robert Green",
      "role": "HR Consultant",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What career paths open up after this course?",
        "a": "You can secure positions such as Corporate HR Generalist, Talent Acquisition Specialist, Payroll Operations Executive, and Business Finance Manager."
      },
      {
        "q": "Does this course cover legal and tax compliance?",
        "a": "Yes. We cover current labor laws, tax rules, standard salary structures, and corporate operational standards extensively."
      },
      {
        "q": "How long is this program and where is it held?",
        "a": "The course spans 3 to 6 months and is available offline at our campus in Nagercoil or via online classes."
      },
      {
        "q": "Is this program open to non-commerce students?",
        "a": "Yes. We introduce foundational corporate administration structures and accounting models systematically from scratch."
      }
    ]
  },
  "tally": {
    "slug": "tally",
    "title": "Tally Prime & Accounting",
    "heroDesc": "Expert training in Tally Prime for accounting and business management. Essential certification for aspiring accountants.",
    "metaDesc": "Expert training in Tally Prime for accounting and business management. Essential certification for aspiring accountants.",
    "overview": "Master Professional Cloud Accounting, GST Filing, and Modern Business Financial Bookkeeping. Learn the precise digital accounting workflows required to manage business financial registers and tax structures with our 100% placement-supported bootcamp in Nagercoil.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Continuous Commercial Need",
        "desc": "Every retail outlet, tech startup, and global corporation must file taxes and track financial entries to stay legally compliant."
      },
      {
        "title": "Immediate Local Placement",
        "desc": "Nagercoil and global businesses constantly seek certified specialists to handle cloud accounting platforms, ledger entries, and tax processing."
      },
      {
        "title": "Excellent Freelance Flexibility",
        "desc": "Certified accounting specialists can manage financial books independently for multiple small business clients simultaneously, securing stable freelance revenues."
      },
      {
        "title": "Indispensable Business Asset",
        "desc": "Clear financial compliance and bookkeeping protect businesses from errors, making experienced accountants highly valued assets."
      }
    ],
    "curriculum": [
      {
        "module": "Accounting Basics",
        "topics": [
          "Journal Entries",
          "Ledger Management",
          "Financial Statements"
        ]
      },
      {
        "module": "GST & Taxation",
        "topics": [
          "GST Filing",
          "Tax Deducted at Source (TDS)",
          "Compliance Workflow"
        ]
      },
      {
        "module": "Inventory Control",
        "topics": [
          "Stock Management",
          "Purchase & Sales Orders",
          "Reporting"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Priya Sharma",
      "role": "Accounting Specialist",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What software tools are covered in this curriculum?",
        "a": "Industry-standard local accounting software suites, modern cloud accounting platforms, data spreadsheets, and corporate payroll tools."
      },
      {
        "q": "Is this program suitable for non-commerce students?",
        "a": "Yes. We introduce financial accounting basics—including debits, credits, asset formatting, and ledger balancing—systematically from scratch."
      },
      {
        "q": "What is the duration and mode of study?",
        "a": "This certification track takes 3 to 6 months and is available as an offline course in Nagercoil and online."
      },
      {
        "q": "How does the placement support system work?",
        "a": "We optimize your financial portfolio, build accounting-ready resumes, and schedule placement interviews directly with retail and corporate firms."
      }
    ]
  },
  "business-analyst": {
    "slug": "business-analyst",
    "title": "Business Analyst",
    "heroDesc": "Bridge the gap between business and technology with data-driven insights. Learn to drive strategic change in organizations.",
    "metaDesc": "Bridge the gap between business and technology with data-driven insights. Learn to drive strategic change in organizations.",
    "overview": "Master Requirement Gathering, Workflow Mapping, and Corporate Strategy Formulations. Learn to act as the vital strategic bridge between business goals and technical development teams with our placement-backed Nagercoil bootcamp.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [
      {
        "title": "Strategic Corporate Asset",
        "desc": "Business analysts help companies avoid expensive project mistakes by carefully planning software requirements, keeping them in high demand."
      },
      {
        "title": "Prestigious Management Pathway",
        "desc": "BAs collaborate closely with product managers and corporate executives, providing a clear route into senior executive leadership positions."
      },
      {
        "title": "No-Code Technical Domain",
        "desc": "Perfect for individuals who want a strategic tech company role focused on business optimization, logic, and planning over backend programming."
      },
      {
        "title": "High Global Market Mobility",
        "desc": "Analytical and strategic business documentation frameworks are identical worldwide, allowing for excellent international career mobility."
      }
    ],
    "curriculum": [
      {
        "module": "Requirement Analysis",
        "topics": [
          "Business Need Discovery",
          "Backlog Grooming",
          "UML Diagrams"
        ]
      },
      {
        "module": "Agile & Scrum",
        "topics": [
          "Sprint Planning",
          "Product Owner Roles",
          "Velocity Tracking"
        ]
      },
      {
        "module": "Data Insights",
        "topics": [
          "Data Reporting",
          "Excel for Analytics",
          "Business Intelligence Basics"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Michael Wong",
      "role": "Business Architect",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What is the core role of a Business Analyst?",
        "a": "They analyze business processes, document clear software requirements, identify operational issues, and design smart solutions to help technical teams build products efficiently."
      },
      {
        "q": "What tools are taught in this bootcamp?",
        "a": "Project management frameworks, visual layout tools, data analysis spreadsheets, system documentation formats, and collaboration systems."
      },
      {
        "q": "How long is this program and what is the training mode?",
        "a": "The BA program is 3 to 6 months long, delivered at our Nagercoil training center or via flexible online tracks."
      },
      {
        "q": "How does Karka’s Pay After Placement model work here?",
        "a": "You attend classes, complete your live project internship, build a strategic portfolio, and start paying us only after landing a business analyst job."
      }
    ]
  },
  "python-for-kids": {
    "slug": "python-for-kids",
    "title": "Python for Kids",
    "heroDesc": "Interactive introduction to programming logic using Python. Build games and animations while learning core coding concepts.",
    "metaDesc": "Interactive introduction to programming logic using Python. Build games and animations while learning core coding concepts.",
    "overview": "Interactive introduction to programming logic using Python. Build games and animations while learning core coding concepts.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [],
    "curriculum": [
      {
        "module": "Foundations of Logic",
        "topics": [
          "Algorithms & Flowcharts",
          "Variables & Data Types",
          "Input/Output Operations"
        ]
      },
      {
        "module": "Creative Coding",
        "topics": [
          "Turtle Graphics",
          "Coordinate Systems",
          "Loops & Patterns",
          "Event Handling"
        ]
      },
      {
        "module": "Game Development",
        "topics": [
          "Conditional Logic",
          "Nested Loops",
          "Basic Lists",
          "Project: Retro Snake Game"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Michael Park",
      "role": "STEM Instructor",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What is the mode of training?",
        "a": "We offer both online and offline training options to suit your convenience."
      },
      {
        "q": "Do you offer placement support?",
        "a": "Yes, we provide 100% placement support including resume building and mock interviews."
      },
      {
        "q": "Can I pay in installments?",
        "a": "Yes, we have flexible EMI options available."
      }
    ]
  },
  "fullstack-internship": {
    "slug": "fullstack-internship",
    "title": "Full Stack Developer Internship",
    "heroDesc": "Rigorous MERN stack training for students. Master DevOps, System Design, and Production best practices on large-scale apps.",
    "metaDesc": "Rigorous MERN stack training for students. Master DevOps, System Design, and Production best practices on large-scale apps.",
    "overview": "Rigorous MERN stack training for students. Master DevOps, System Design, and Production best practices on large-scale apps.",
    "details": {
      "duration": "6 Months",
      "level": "Beginner to Advanced",
      "lessons": "48 Lessons",
      "mode": "Offline / Online"
    },
    "whyLearn": [],
    "curriculum": [
      {
        "module": "Architecture & System Design",
        "topics": [
          "MVC vs Microservices",
          "Scalability Principles",
          "Load Balancing",
          "Database Indexing"
        ]
      },
      {
        "module": "Full-Stack Mastery",
        "topics": [
          "Advanced React Patterns",
          "Server-Side Rendering (Next.js)",
          "API Rate Limiting",
          "Websockets"
        ]
      },
      {
        "module": "Cloud & DevOps",
        "topics": [
          "Dockerization",
          "CI/CD Pipelines (GitHub Actions)",
          "AWS Deployment (S3/EC2)",
          "Monitoring & Logging"
        ]
      }
    ],
    "whyChoose": [
      {
        "title": "Zero Upfront Fees (Pay After Placement)",
        "desc": "We remove all financial barriers to your education. You can enroll, master cutting-edge tech or creative skills, and complete your training with zero upfront tuition fees—you only pay us once you land a job."
      },
      {
        "title": "AI-First Practical Curriculum",
        "desc": "We don't just teach traditional code and tools. Every course integrates advanced generative AI workflows so you learn to write code, debug, create graphics, and write copy at 10x speed using modern AI assistants."
      },
      {
        "title": "Real-World Agency Projects",
        "desc": "Say goodbye to outdated textbook theory. Our students build live, production-ready applications, manage actual cloud architectures, and design branding campaigns for real business assets."
      },
      {
        "title": "Guaranteed Internship Experience",
        "desc": "Transition smoothly from student to professional. Every program includes a hands-on industry internship where you work alongside senior developers and creators on real client deliverables, graduating with a verified portfolio."
      },
      {
        "title": "Multi-Skill Advantage",
        "desc": "We build versatile professionals. If you enroll in our marketing or content tracks, you also get dedicated training in graphic design, video editing, and digital marketing so you graduate with a highly competitive, multi-media toolkit."
      },
      {
        "title": "End-to-End Placement Support",
        "desc": "Our dedicated placement cell works tirelessly for you. From 1-on-1 industry mentoring and ATS-optimized resume building to rigorous mock technical interviews, we connect you directly with our network of hiring partners."
      }
    ],
    "instructor": {
      "name": "Alex Rivera",
      "role": "Software Architect",
      "company": "Karka Tech Network",
      "exp": "8+ Years Experience"
    },
    "faqs": [
      {
        "q": "What is the mode of training?",
        "a": "We offer both online and offline training options to suit your convenience."
      },
      {
        "q": "Do you offer placement support?",
        "a": "Yes, we provide 100% placement support including resume building and mock interviews."
      },
      {
        "q": "Can I pay in installments?",
        "a": "Yes, we have flexible EMI options available."
      }
    ]
  }
};
