import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  fallback: ["Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["Inter", "system-ui", "-apple-system", "sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  // Required so relative openGraph/twitter image paths resolve to absolute
  // URLs. Without it, Next falls back to http://localhost:3000 at build time
  // and every share card points at localhost.
  metadataBase: new URL("https://www.karka.academy"),
  title: {
    default: "Karka AI & Tech Academy | Coding in Nagercoil",
    template: "%s",
  },
  description:
    "Launch your tech career at Karka Academy, Nagercoil. Learn AI, Data Science & Full Stack with our Pay After Placement program.",
  keywords: [
    "ai",
    "genai",
    "nagercoil",
    "coding",
    "software",
    "courses in nagercoil",
    "best courses in nagercoil",
    "software courses in nagercoil",
    "computer courses in nagercoil",
    "ai courses in nagercoil",
    "genai courses in nagercoil",
    "generative AI course Nagercoil",
    "data science internship Nagercoil",
    "best AI academy Nagercoil",
    "UI UX internship Nagercoil",
    "digital marketing internship Nagercoil",
    "Java full stack course Nagercoil",
    "AI course Nagercoil",
    "Software training institute Nagercoil",
    "MERN stack course Nagercoil",
    "Graphic design course Nagercoil",
    "HR finance course Nagercoil",
    "Business analyst course Nagercoil",
    "computer training institute in nagercoil",
    "it company in nagercoil",
    "it courses in nagercoil",
    "best it institute in nagercoil",
    "software development company in nagercoil",
    "web development company in nagercoil",
    "internship in nagercoil",
    "internship for freshers in nagercoil",
    "best coding courses in nagercoil",
  ],
  authors: [{ name: "Karka AI Academy" }],
  creator: "Karka AI Academy",
  publisher: "Karka AI Academy",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.karka.academy",
  },
  openGraph: {
    title: "Karka AI & Tech Academy | AI, Data Science & Full Stack Training in Nagercoil",
    description:
      "Join Karka AI & Tech Academy's Pay After Placement program for graduates. Learn AI, Data Science, Full Stack Development, and Software Engineering with industry mentorship and placement support.",
    url: "https://www.karka.academy",
    siteName: "Karka AI Academy",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karka AI Academy - Master Full Stack Development",
    description:
      "Join the most comprehensive coding bootcamp with Pay After Placement. Master Full Stack Development.",
    creator: "@karka_academy",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Pinch-zoom must stay available; capping maximumScale at 1 is an a11y
  // failure for low-vision users.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F9FC" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1120" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark')}else{d.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${plusJakarta.variable} ${inter.variable} font-sans antialiased selection:bg-lime/20 selection:text-slate-900 dark:selection:text-white min-h-screen`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
