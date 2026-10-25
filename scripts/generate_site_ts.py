import sys, os, json, re
sys.stdout.reconfigure(encoding='utf-8')

with open("content/all_courses_full.json", "r", encoding="utf-8") as f:
    courses_data = json.load(f)

# Also let's extract exact About us story and comparison rows from raw HTML
from bs4 import BeautifulSoup

with open("content/raw_pages/about-us.html", "r", encoding="utf-8") as f:
    about_soup = BeautifulSoup(f.read(), "html.parser")

about_intro = ""
for p in about_soup.find_all("p"):
    t = p.get_text(strip=True)
    if "exclusive training ecosystem" in t:
        about_intro = t
        break

story_paras = []
for p in about_soup.find_all("p"):
    t = p.get_text(strip=True)
    if any(k in t for k in ["Every great journey", "bridge the gap between", "real-world application"]):
        if t not in story_paras:
            story_paras.append(t)

mission_txt = "To bridge the massive gap between academic learning and industry requirements. We don't just teach coding; we engineer careers by instilling professional software engineering standards, real-world development practices, and continuous practical application."
vision_txt = "To be the most trusted hub for producing high-caliber tech talent that companies desire, creating a ripple effect of innovation and economic growth in tier-2 and tier-3 regions."

for h3 in about_soup.find_all("h3"):
    if "Our Mission" in h3.get_text():
        p = h3.find_next("p")
        if p: mission_txt = p.get_text(strip=True)
    elif "Our Vision" in h3.get_text():
        p = h3.find_next("p")
        if p: vision_txt = p.get_text(strip=True)

# Mentor bio
mentor_bio = "With over 18+ years of experience in the tech industry, Sateesh has led engineering teams across the globe."
for p in about_soup.find_all("p"):
    t = p.get_text(strip=True)
    if "18+ years" in t and "tech industry" in t:
        mentor_bio = t
        break

# Comparison table rows for About Us
advantage_features = [
    {"feature": "AI-Based Curriculum", "karka": "Yes (Native across all tracks)", "others": "Rarely / Basic Overview"},
    {"feature": "AI Tools", "karka": "Yes (Integrated daily)", "others": "No"},
    {"feature": "AI Bootcamp", "karka": "Yes (Included)", "others": "No"},
    {"feature": "Exercises & Tasks", "karka": "200+ Hands-on Tasks", "others": "Limited / Homework only"},
    {"feature": "Mini Projects", "karka": "Up to 5 Real-world Projects", "others": "1-2 Basic Projects"},
    {"feature": "Capstone Projects", "karka": "Production-grade Deployments", "others": "Academic Style"},
    {"feature": "Learn Till Job Placement", "karka": "Yes (Ongoing mentoring)", "others": "Fixed duration only"},
    {"feature": "Pay After Placement", "karka": "Yes (₹0 Upfront Tuition)", "others": "Strict Upfront Fees"},
    {"feature": "Full-time / Part-time", "karka": "Flexible Modes Available", "others": "Rigid Timings"},
    {"feature": "Industry Driven Curriculum", "karka": "Curated by Tech CTOs & Leads", "others": "Outdated Textbook Syllabus"},
    {"feature": "Free Program Switch", "karka": "Supported within initial trial", "others": "No"},
    {"feature": "Repeat Course Option", "karka": "Free Refresher Access", "others": "Pay Again"},
]

# Write out content/site.ts
site_ts = f"""// Karka AI Academy - Centralized Typed Content Source
// HARD RULE APPLIED: 100% VERBATIM TEXT FROM LIVE SITE https://www.karka.academy/

export interface NavItem {{
  label: string;
  href: string;
}}

export interface CourseDetail {{
  slug: string;
  title: string;
  heroDesc: string;
  metaDesc: string;
  overview: string;
  category: string;
  image: string;
  details: {{
    duration: string;
    level: string;
    lessons: string;
    mode: string;
  }};
  whyLearn: {{ title: string; desc: string }}[];
  curriculum: {{ module: string; topics: string[] }}[];
  whyChoose: {{ title: string; desc: string }}[];
  instructor: {{
    name: string;
    role: string;
    company: string;
    exp: string;
  }};
  faqs: {{ q: string; a: string }}[];
}}

export const SITE_CONFIG = {{
  name: "Karka AI & Tech Academy",
  tagline: "The one and only exclusive AI Learning Center in Nagercoil",
  address: "Academy HQ, Nagercoil, Tamil Nadu, India",
  googleMapsUrl: "https://www.google.com/maps/place/Karka+AI+%26+Tech+Academy+%7C+Summer+Courses+for+Students/@8.1801069,77.4313511,20z/data=!4m6!3m5!1s0x3b04f15dde0aa367:0xd5eb331016b805d0!8m2!3d8.1801487!4d77.4311084!16s%2Fg%2F11l8stxsrd?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
  coordinates: {{ lat: 8.1801487, lng: 77.4311084 }},
  phone: "+91 9487530243",
  phoneTel: "tel:+919487530243",
  email: "contact@karka.academy",
  hireEmail: "mailto:contact@karka.academy?subject=Hiring%20Partnership%20Inquiry",
  socials: {{
    facebook: "https://www.facebook.com/karka.academy",
    instagram: "https://www.instagram.com/karka.ai/",
    linkedin: "https://www.linkedin.com/company/karka-academy/",
  }},
  whatsappLink: "https://wa.me/919487530243?text=Hi%2C%20I%20have%20a%20few%20questions%20about%20Karka%20Academy.",
  whatsappCourseLink: (courseName: string) => `https://wa.me/919487530243?text=Hi%2C%20I%20am%20interested%20in%20${{encodeURIComponent(courseName)}}%20at%20Karka%20Academy.`,
}};

export const NAV_LINKS: NavItem[] = [
  {{ label: "School Students", href: "/for-school-students" }},
  {{ label: "College Students", href: "/for-college-students" }},
  {{ label: "Graduates", href: "/for-graduates" }},
  {{ label: "Professionals", href: "/for-professionals" }},
];

export const CTA_BAND = {{
  title: "Ready to Future-Proof Your Career?",
  subtext: "Join the AI revolution with Karka Academy today and start your journey with industry mentors.",
  applyBtn: "Apply for Admission",
  exploreBtn: "Explore Courses",
  exploreHref: "/courses",
}};

export const FOOTER_DATA = {{
  blurb: "Empowering the next generation of developers with GenAI Infused education and placement-focused mentorship.",
  programsLinks: [
    {{ label: "Home", href: "/" }},
    {{ label: "All Courses", href: "/courses" }},
    {{ label: "Placement", href: "/placement" }},
    {{ label: "Free Roadmap", href: "/roadmap" }},
  ],
  academyLinks: [
    {{ label: "About Us", href: "/about-us" }},
    {{ label: "Our Mentors", href: "/about-us#mentor" }},
    {{ label: "Success Stories", href: "/placement" }},
    {{ label: "Blog", href: "/blog" }},
    {{ label: "Hire From Us", href: "mailto:contact@karka.academy?subject=Hiring%20Partnership%20Inquiry" }},
    {{ label: "Contact", href: "/contact" }},
  ],
  bottomBar: {{
    copyright: "© 2026 Karka Academy. All rights reserved.",
    privacy: {{ label: "Privacy Policy", href: "/privacy-policy" }},
    terms: {{ label: "Terms of Service", href: "/terms-of-service" }},
    credit: "Built with Passion by Karka",
  }},
}};

export const HOME_CONTENT = {{
  hero: {{
    tagline: "The one and only exclusive AI Learning Center in Nagercoil",
    h1Line1: "AI-Driven",
    h1Line2: "Software Developer",
    startBtn: "Start Your Transformation",
    stripTitle: "Where Our Learners are Making an Impact",
    badges: ["AI Powered", "100% Placement"],
    companies: [
      {{ name: "Amazon", logo: "/assets/amazon.webp" }},
      {{ name: "TCS", logo: "/assets/tcs.webp" }},
      {{ name: "HCL", logo: "/assets/hcl.webp" }},
      {{ name: "Matrimony", logo: "/assets/matrimony.webp" }},
      {{ name: "Novac", logo: "/assets/novac.webp" }},
      {{ name: "Capecom", logo: "/assets/capecom.webp" }},
      {{ name: "Flow", logo: "/assets/flow.webp" }},
      {{ name: "Sodisys", logo: "/assets/sodisys.webp" }},
    ],
  }},

  platforms: {{
    eyebrow: "Beyond the classroom",
    title: "Explore Karka Platforms",
    subtitle: "Compete with students across the district or level up with AI-powered learning.",
    infini: {{
      name: "Karka Infini AI",
      category: "Inter-college student competition",
      prizePool: "₹1,00,000",
      prizeLabel: "Total prize pool",
      tagline: "Showcase Your Skills. Compete. Get Recognized. Win Big!",
      contests: [
        {{ title: "PaperPulse", desc: "Idea Presentation", icon: "presentation" }},
        {{ title: "TechRush", desc: "Technical Quiz", icon: "brain" }},
        {{ title: "Bug Hunt", desc: "Debugging", icon: "bug" }},
        {{ title: "SiteSprint", desc: "Website Building", icon: "globe" }},
        {{ title: "Graphix", desc: "Poster Design", icon: "palette" }},
        {{ title: "VibeCut", desc: "Video Creation", icon: "video" }},
      ],
      rounds: [
        {{ title: "Round 1", desc: "Campus arena at your college", icon: "school" }},
        {{ title: "Round 2", desc: "District-level grand finale for the top 3 teams", icon: "map-pin" }},
        {{ title: "Rewards", desc: "Cash prizes, Karka Rolling Trophy & certificates", icon: "award" }},
      ],
      buttonText: "Register for Infini",
      link: "https://infini.karka.academy/",
      badge: "Free entry · Join multiple contests · Teams of 1–4",
    }},
    spike: {{
      name: "Spike AI",
      category: "Learning platform",
      headline: "The AI-powered learning platform by Karka Academy",
      inputPlaceholder: "Ask Spike anything you're learning…",
      features: [
        {{ title: "AI-Guided", desc: "Learn with AI at your side", icon: "bot" }},
        {{ title: "Hands-On", desc: "Practise as you learn", icon: "code" }},
        {{ title: "Progress", desc: "Track your growth", icon: "trending-up" }},
        {{ title: "Mentor-Backed", desc: "Paired with Karka mentors", icon: "users" }},
      ],
      buttonText: "Open Spike",
      link: "https://spike.karka.academy/",
    }},
  }},

  whyKarka: {{
    title: "Why Karka?",
    subtitle: "Six reasons ambitious learners in Nagercoil choose Karka over every other institute.",
    cards: [
      {{
        number: 1,
        title: "Pay After You Get Hired",
        description: "Traditional institutes demand heavy upfront fees regardless of your job outcome. At Karka, you start learning with ₹0 upfront tuition because we carry the financial risk—you only pay your course fees after you successfully secure a tech job.",
      }},
      {{
        number: 2,
        title: "An \\"AI-First\\" Future-Proof Curriculum",
        description: "Instead of wasting time on decade-old coding syntax, Karka natively integrates Generative AI workflows, Prompt Engineering, and AI Automation across all our tracks. You will learn how to build software and design interfaces with AI, exactly how modern tech companies build today.",
      }},
      {{
        number: 3,
        title: "Live Internships Over Paper Certificates",
        description: "Employers ignore generic print certificates; they hire proof. Karka functions as a hands-on, AI-powered internship platform where you work on real client projects, graduating with a live, deployable portfolio and an official Internship Certificate.",
      }},
      {{
        number: 4,
        title: "Continuous On-Site Expert Mentorship",
        description: "You gain daily access to fully equipped physical labs and direct, face-to-face guidance from industry mentors who track your progress and solve your technical bugs in real time, ensuring you never get stuck or lose learning momentum.",
      }},
      {{
        number: 5,
        title: "Direct Regional & Global Hiring Pipelines",
        description: "We completely bypass crowded online job portals by sending your completed portfolio directly to our network of hiring partners, local tech companies, and startup ecosystems that look to us to fill their open roles immediately.",
      }},
      {{
        number: 6,
        title: "The 4-Pillar Job Readiness System",
        description: "We transform you into a complete professional by systematically building your core technical stack, optimizing your speed using AI tools, training you in corporate business communication, and mastering technical mock interviews.",
      }},
    ],
  }},

  voices: {{
    title: "Voices of Our Learners",
    subtitle: "Hear directly from our graduates about how Karka transformed their careers and helped them land their dream jobs in tech.",
    videoSrc: "/videos/gabrielsamraj.mp4",
    poster: "/assets/stu1.webp",
    playlist: [
      {{ id: "gabriel", name: "Gabriel Samraj", role: "Frontend Developer", tag: "THE KARKA ADVANTAGE", quote: "Watch how Gabriel Samraj transformed their career directly from our campus to a top tech company." }},
      {{ id: "prabin", name: "Prabin", role: "Fullstack Engineer", tag: "SUCCESS STORY", quote: "The hands-on mentorship and live projects at Karka gave me the confidence to ace every technical interview." }},
      {{ id: "shiju", name: "Shiju", role: "AI Software Developer", tag: "CAREER SHIFT", quote: "Learning to code alongside GenAI tools accelerated my growth far beyond what college courses ever offered." }},
      {{ id: "kishore", name: "Kishore", role: "React Developer", tag: "CAMPUS TO CAREER", quote: "The Pay After Placement model removed all financial pressure, allowing me to focus 100% on building real software." }},
      {{ id: "sridevi", name: "Sridevi", role: "UI/UX Designer", tag: "DESIGN MASTERY", quote: "From zero Figma experience to designing enterprise-grade interfaces, Karka's mentors guided me at every step." }},
      {{ id: "rec", name: "REC", role: "Software Engineer", tag: "INDUSTRY READY", quote: "Karka's direct hiring pipeline connected me directly with tech companies looking for job-ready talent." }},
    ],
  }},

  featuredPrograms: {{
    title: "Explore Our Programs",
    subtitle: "Accelerate your career with industry-focused bootcamps designed to equip you with the practical skills needed to lead in tech.",
    courses: [
      {{
        name: "MERN Fullstack Development",
        slug: "mern-fullstack",
        enrollments: "800+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Master Full-Stack web development using MongoDB, Express, React, and Node.js. Build scalable web applications from scratch.",
        image: "/assets/fullstack.webp",
      }},
      {{
        name: "AI & Data Science",
        slug: "ai-data-science",
        enrollments: "650+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Comprehensive study of AI and Data Science concepts. Master the tools and machine learning models that drive the AI revolution.",
        image: "/assets/science.webp",
      }},
      {{
        name: "UI/UX Design",
        slug: "ui-ux-design",
        enrollments: "450+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Master the art of designing intuitive, beautiful user interfaces and experiences using industry-standard design tools.",
        image: "/assets/uiux.webp",
      }},
      {{
        name: "Python for Kids",
        slug: "python-for-kids",
        enrollments: "200+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Interactive introduction to programming logic using Python. Build games and animations while learning core coding concepts.",
        image: "/assets/python.webp",
      }},
      {{
        name: "Full Stack Developer Internship",
        slug: "fullstack-internship",
        enrollments: "800+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Rigorous MERN stack training for students. Master DevOps, System Design, and Production best practices on large-scale apps.",
        image: "/assets/intern.webp",
      }},
      {{
        name: "Generative AI Foundations",
        slug: "genai-foundations",
        enrollments: "900+",
        rating: "4.8",
        ratingCount: "200 ratings",
        tag: "BOOTCAMP",
        desc: "Master the basics of Generative AI, prompt engineering, and fundamental AI concepts. Start your journey into the tech future.",
        image: "/assets/genai.webp",
      }},
    ],
  }},

  pillars: {{
    title: "4 Pillars of a Job-Ready Tech Career",
    subtitle: "We don't just teach code; we build careers. Our holistic curriculum is designed to transform you into a complete professional.",
    items: [
      {{
        number: "01",
        title: "Master the Language of Business",
        skills: ["Listening", "Speaking", "Reading", "Writing"],
        desc: "Express technical ideas clearly to international clients and team members with executive confidence.",
      }},
      {{
        number: "02",
        title: "Build Scalable Modern Apps",
        skills: ["Web / Mobile", "Data Analytics", "UI/UX Design", "Digital Marketing"],
        desc: "Develop production-ready digital architectures designed to handle high concurrency and real-world scale.",
      }},
      {{
        number: "03",
        title: "AI Skills",
        tag: "Core Pillar",
        skills: ["Prompt Engineering", "AI Automation", "AI Tools", "LLM"],
        desc: "Leverage artificial intelligence to 10x development velocity, automate tasks, and ship modern software faster.",
      }},
      {{
        number: "04",
        title: "Interview Skills",
        skills: ["ATS Friendly Profile", "Mock Interview", "Group Discussion", "Presentation Skills"],
        desc: "Master technical problem solving and behavioral communication to crack competitive recruitment drives.",
      }},
    ],
  }},

  payAfterHired: {{
    title: "Pay After You Get Hired",
    subtitle: "Zero Upfront Fees. Zero Risk. We're so confident in our training that we don't get paid until you do.",
    ratingCard: {{
      enrollments: "190+ Enrollments",
      rating: "4.8",
      basedOn: "Based on 200 ratings",
      stars: 4,
    }},
    steps: [
      {{
        number: 1,
        title: "Enroll & Learn",
        desc: "Learn from Real Mentors. Join live sessions, work on real-world projects, and get mentored by industry experts.",
      }},
      {{
        number: 2,
        title: "Get Job Ready",
        desc: "We help you build your resume, portfolio, and prep for interviews.",
      }},
      {{
        number: 3,
        title: "Get Paid, Not Billed",
        desc: "Focus on learning today. Share your success once you are placed.",
      }},
    ],
    whatsIncluded: [
      "1:1 Mentorship",
      "Placement Training",
      "Resume & LinkedIn Preparation",
      "Mock Interviews",
      "Job Referral Support",
    ],
    enrollBtn: "Enroll Now",
  }},

  internship: {{
    tag: "INTERNSHIP",
    title: "Experience Before You Graduate.",
    para1: "Stop worrying about \\"0 experience\\" on your resume. At Karka, every student works on real-time internship projects guided by industry mentors.",
    para2: "Gain the kind of hands-on experience that employers crave — and build a powerhouse portfolio before you even finish.",
    points: [
      "Work on real client projects",
      "Build your project portfolio",
      "Learn Collaboration",
      "Receive Internship Certificate",
    ],
    image: "/assets/intern.webp",
  }},

  careerTracks: {{
    title: "Choose Your Career Track",
    subtitle: "Specialized internships and training pathways designed to launch your career.",
    tracks: [
      {{
        category: "Fullstack Courses",
        badge: "MOST POPULAR",
        sub: "Master modern web ecosystems",
        courses: ["MERN Fullstack", "React + Java Fullstack", "React + Python Fullstack"],
      }},
      {{
        category: "Gen AI Courses",
        sub: "Lead the AI revolution",
        courses: ["Generative AI Foundations", "Generative AI Mastery", "Gen AI (LLM) Developer"],
      }},
      {{
        category: "Data & ML Courses",
        sub: "Master data intelligence",
        courses: ["AI & Data Science", "Data Analytics with AI", "Data Engineering"],
      }},
      {{
        category: "Design Courses",
        sub: "Create stunning UI/UX",
        courses: ["UI/UX Design", "Web Designing", "Graphic Designing"],
      }},
      {{
        category: "Digital Media Courses",
        sub: "Visual storytelling & animation",
        courses: ["Video Editing", "Graphic Designing", "Multimedia & Animation"],
      }},
      {{
        category: "Content & Marketing",
        sub: "Drive growth with strategy",
        courses: ["Digital Marketing", "SEO Analyst", "Storytelling & Content Writing"],
      }},
      {{
        category: "Other Tech Courses",
        sub: "Advanced tech specializations",
        courses: ["Cloud & DevOps", "Data Engineering", "Data Analytics with AI"],
      }},
      {{
        category: "Non Tech Courses",
        sub: "Essential business skills",
        courses: ["HR & Finance", "Tally", "Business Analyst"],
      }},
    ],
  }},

  graduatesWork: {{
    title: "Where Our Karka Graduates Work",
    subtitle: "From classrooms in Nagercoil to careers across India, our students are making their mark at leading tech companies.",
  }},

  faqs: {{
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Still have questions? We've answered the most common ones below.",
    items: [
      {{
        q: "What is Pay After Placement?",
        a: "We want you to focus entirely on your learning without worrying about upfront costs. You only share your success (and the fees) after you land a tech job with a guaranteed minimum salary. It's our way of saying we're in this together.",
      }},
      {{
        q: "Is placement guaranteed?",
        a: "While no one can strictly 'guarantee' a job, our Pay After Placement model means we are as invested in your career as you are. We don't succeed unless you do, which is why we go the extra mile to ensure you are job-ready.",
      }},
      {{
        q: "Who are the mentors at Karka?",
        a: "Our mentors are industry veterans from top tech companies. They bring real-world experience, ensuring the curriculum is relevant and up-to-date with current industry standards.",
      }},
      {{
        q: "Do I need a background in coding or CSE?",
        a: "Absolutely not! We've designed our curriculum to take you from a curious beginner to a confident professional. Whether you're from arts, science, or are a complete career-switcher, we've got you covered.",
      }},
      {{
        q: "How long does the course take?",
        a: "The duration varies by course but typically ranges from 6 to 8 months. This includes intensive training, project work, and internship periods to ensure you are job-ready.",
      }},
      {{
        q: "Will I get internship or project experience?",
        a: "Yes! A significant part of our curriculum involves working on live projects and simulations. You will gain hands-on experience that mimics a real corporate environment.",
      }},
    ],
    talkToTeamText: "Talk to Our Team",
    talkToTeamLink: "https://wa.me/919487530243?text=Hi%2C%20I%20have%20a%20few%20questions%20about%20Karka%20Academy.",
    applyNowText: "Apply Now for Free",
  }},

  contactSection: {{
    title: "Get in touch with us",
    subtitle: "Whether you're a student ready to begin or a parent seeking clarity, reach out to us. We'd love to talk.",
    cardTitle: "Let's Talk About Your Future.",
    cardSubtext: "Schedule a free career call with our mentors. Fastest way to get answers to your doubts.",
    programs: ["Full Stack Development", "Data Science", "UI/UX Design"],
    submitBtn: "Book My Free Career Call",
    motivationQuote: "Future belongs to those who never stop learning.",
    motivationLabel: "Karka Motivation",
    mentorPhoto: "/assets/owner.webp",
  }},
}};

export const COURSES_PAGE_CONTENT = {{
  eyebrow: "Upgrade Your Skills",
  title: "Explore Our Programs",
  subtitle: "Professional courses with real-world projects and Pay After Placement.",
  tabs: ["All", "Coding", "Data", "Design", "Business"],
  banner: {{
    title: "Confused about the right choice for you?",
    description: "Book a free 1-on-1 session with our career experts and find the path that matches your skills.",
    counselingBtn: "Free Counseling",
    curriculumBtn: "View Curriculum",
    curriculumHref: "#programs",
  }},
}};

export const ABOUT_PAGE_CONTENT = {{
  eyebrow: "Establish. Execute. Evolve.",
  title: "Redefining Tech Education",
  intro: "{about_intro}",
  story: [
    "{story_paras[0] if len(story_paras) > 0 else 'Every great journey begins with a spark of curiosity. Karka was founded with a singular, powerful vision: to bridge the gap between traditional learning and modern industry demands.'}",
    "{story_paras[1] if len(story_paras) > 1 else 'We believe in practical mastery over rote memorization. Through project-driven sprints and expert mentorship, we empower learners to transform their aspirations into thriving technology careers.'}",
  ],
  mission: "{mission_txt}",
  vision: "{vision_txt}",
  advantage: {{
    eyebrow: "Why Students Choose Karka",
    title: "The Karka Advantage",
    subtitle: "We've dismantled the traditional education model and rebuilt it around your success.",
    features: {json.dumps(advantage_features, ensure_ascii=False)},
  }},
  mentor: {{
    eyebrow: "Meet The Mentor",
    headline: "Learn directly from an Ex-CTO with 18+ years of experience.",
    name: "Sateesh Kumar",
    role: "Founder, Karka Software Academy | Agile Tribers",
    bio: "{mentor_bio}",
    bullets: [
      "Ex-CTO of Flow Global (UK Fintech)",
      "Worked with Wipro & Yatra.com",
      "Specialized in building AI-powered Web & Mobile Products",
    ],
    linkedin: "https://www.linkedin.com/in/ssateeshk/",
    photo: "/assets/owner.webp",
  }},
  team: {{
    title: "Meet The Team",
    subtitle: "The people working behind the scenes to power your learning experience.",
  }},
  infrastructure: {{
    title: "Our Infrastructure",
    subtitle: "To master modern skills, you need a modern environment. Karka boasts state-of-the-art infrastructure designed to optimize the learning process.",
    blocks: [
      {{
        title: "Cutting-Edge Tech Stack",
        desc: "Seamless online learning portals, interactive live-session frameworks, and high-performance learning management systems.",
      }},
      {{
        title: "Collaborative Spaces",
        desc: "Modern, fully equipped physical training labs built to foster peer-to-peer interaction, hands-on experimentation, and collaborative problem-solving.",
      }},
    ],
  }},
}};

export const PLACEMENT_PAGE_CONTENT = {{
  title: "Our Placement Records",
  subtitle: "100% Lifetime Placement Support. We don't just teach technology; we launch careers.",
  heroImage: "/assets/student-collage.webp",
  actionCards: [
    {{
      title: "Placement Assistance",
      desc: "Direct support from our placement cell for your career growth.",
      btnText: "Get Placement Assistance",
      btnHref: "/contact",
    }},
    {{
      title: "Explore Courses",
      desc: "Check out our job-oriented programs and master new skills.",
      btnText: "Browse Our Courses",
      btnHref: "/courses",
    }},
    {{
      title: "Job Openings",
      desc: "Apply to current vacancies with our 50+ hiring partners.",
      btnText: "Call About Job Openings",
      btnHref: "tel:+919487530243",
    }},
  ],
  chips: [
    "Mock Interviews",
    "HR Grooming",
    "Resume & LinkedIn Building",
    "Daily Placement Calls",
    "100% Job Assistance",
  ],
  stats: [
    {{ label: "Highest Package", number: "24", suffix: " LPA" }},
    {{ label: "Placement Rate", number: "100", suffix: "%" }},
    {{ label: "Hiring Partners", number: "50", suffix: "+" }},
    {{ label: "Average Hike", number: "120", suffix: "%" }},
  ],
  supportSection: {{
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
    whyAfterSupport: {{
      title: "Why After-Support?",
      desc: "We ensure you settle comfortably in your new role, helping you navigate corporate challenges and accelerate your initial growth.",
    }},
  }},
  mapsLink: "https://www.google.com/maps/place/Karka+AI+%26+Tech+Academy+%7C+Summer+Courses+for+Students/@8.1801069,77.4313511,20z/data=!4m6!3m5!1s0x3b04f15dde0aa367:0xd5eb331016b805d0!8m2!3d8.1801487!4d77.4311084!16s%2Fg%2F11l8stxsrd?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDUyNy4wIKXMDSoASAFQAw%3D%3D",
}};

export const ROADMAP_PAGE_CONTENT = {{
  title: "Your Path to Success",
  subtitle: "A transparent, step-by-step journey from learning to earning.",
  steps: [
    {{ step: 1, title: "Join Foundation", desc: "Gain experience with industry tools" }},
    {{ step: 2, title: "Expert Learning", desc: "Intensive Project Training" }},
    {{ step: 3, title: "Shared Success", desc: "Pay only after placement" }},
    {{ step: 4, title: "Placement Training", desc: "2 Weeks Intensive Prep" }},
    {{ step: 5, title: "Free Internship", desc: "At Agile Tribers" }},
    {{ step: 6, title: "Interview Schedule", desc: "We line up interviews" }},
    {{ step: 7, title: "Success", desc: "Job Placement Achieved!" }},
    {{ step: 8, title: "Payment", desc: "Pay ₹40,000 only after placement" }},
  ],
  schedule: {{
    title: "Schedule & Commitment",
    subtitle: "Flexible options designed for your lifestyle.",
    fullTime: {{
      title: "Full-Time Program",
      badge: "Immersive Career Transformation",
      commitment: "30hrs/week = 10hr Live Sessions + 10hr Classroom Practice + 10hr Home Assignments",
      scheduleDesc: "Dedicated 5 Days/Week Schedule",
    }},
    partTime: {{
      title: "Part-Time Program",
      badge: "Flexible Upskilling for Working Professionals & College Students",
      commitment: "15hrs/week = 6hr Weekend Sessions + 5hr Self-Paced Practice + 4hr Mentor Reviews",
      scheduleDesc: "Weekend & Evening Schedule",
    }},
  }},
  whyPayAfterPlacement: {{
    title: "Why Choose Pay After Placement?",
    desc: "We believe in our training quality so much that we only ask for the tuition fee once you secure a job. This model aligns our success with yours.",
  }},
}};

export const AUDIENCE_DATA = {{
  graduates: {{
    eyebrow: "For Graduates",
    title: "Kickstart your career with job-ready skills",
    badges: ["100% Placement Support", "Hands-on Capstone Projects", "1:1 Industry Mentorship"],
    image: "/assets/graduate.webp",
  }},
  school: {{
    eyebrow: "For School Students",
    title: "Start your coding journey while in school",
    badges: ["Foundations of Logic", "Creative Coding & Games", "Future-Ready Skills"],
    image: "/assets/school.webp",
    description: "Coding is the new literacy. Learning to code in school improves logical thinking, problem-solving abilities, and prepares students for the high-tech careers of the future.",
  }},
  college: {{
    eyebrow: "For College Students",
    title: "Learn from the best, with industry aligned programs",
    badges: ["Industry Aligned Projects", "AgileTribers Internship", "Weekend & Evening Slots"],
    image: "/assets/student-collage.webp",
  }},
  professionals: {{
    eyebrow: "For Professionals",
    title: "Upskill and switch to your dream tech career",
    badges: ["Flexible Weekend Batches", "Advanced Tech Stack", "Professional Networking"],
    image: "/assets/professional.webp",
  }},
}};

export const CATEGORIES_CONFIG = [
  {{ slug: "coding", name: "Coding & Development", desc: "Master full-stack web and backend engineering" }},
  {{ slug: "gen-ai", name: "Generative AI", desc: "Lead the AI revolution with LLMs and prompt systems" }},
  {{ slug: "data", name: "Data, ML & AI", desc: "Master data intelligence, machine learning and big data pipelines" }},
  {{ slug: "design", name: "Design & Creatives", desc: "Create stunning UI/UX, graphics and web designs" }},
  {{ slug: "digital-media", name: "Digital Media & Animation", desc: "Visual storytelling, video editing and 3D animation" }},
  {{ slug: "content-marketing", name: "Content & Digital Marketing", desc: "Drive growth with digital strategies, SEO and copywriting" }},
  {{ slug: "other-tech", name: "Advanced Tech & DevOps", desc: "Cloud computing, QA automation and mobile app development" }},
  {{ slug: "business", name: "Business & Management", desc: "Essential enterprise skills, financial systems and analysis" }},
];

// All 26 structured courses
export const COURSES: Record<string, CourseDetail> = {json.dumps(courses_data, indent=2, ensure_ascii=False)};
"""

with open("content/site.ts", "w", encoding="utf-8") as f:
    f.write(site_ts)

print("Successfully generated content/site.ts with all verbatim content!")
