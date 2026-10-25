import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: "#070B16",
          900: "#0B1120",
          850: "#0E162B",
          800: "#131C35",
          700: "#1A2544",
        },
        navy: {
          50: "#EEF2FC",
          100: "#D9E1F8",
          200: "#B3C4F1",
          700: "#161F45",
          800: "#0F1636",
          900: "#0B1120",
          950: "#060919",
        },
        surface: {
          light: "#F8FAFC",
          card: "#FFFFFF",
          muted: "#F1F5F9",
          dark: "#0B1120",
          "dark-card": "#111A2E",
          "dark-elevated": "#17233D",
        },
        /**
         * NOTE: the `lime` / `electric-lime` / `mint` scales are legacy token
         * names kept for backwards compatibility with existing markup. The
         * brand accent is indigo; `brand` below is the canonical name and
         * should be used for all new work.
         */
        brand: {
          DEFAULT: "#4F46E5",
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          950: "#1E1B4B",
        },
        accent: {
          cyan: "#22D3EE",
          violet: "#8B5CF6",
          rose: "#F43F5E",
          amber: "#F59E0B",
          emerald: "#10B981",
        },
        lime: {
          DEFAULT: "#4F46E5",
          volt: "#22D3EE",
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#4F46E5",
          600: "#4338CA",
          contrast: "#FFFFFF",
        },
        "electric-lime": "#4F46E5",
        ultramarine: {
          DEFAULT: "#3A36F0",
          50: "#F2F1FE",
          100: "#E6E5FD",
          200: "#D0CFFB",
          500: "#3A36F0",
          600: "#2B27D9",
          700: "#211EB8",
        },
        mint: {
          DEFAULT: "#4F46E5",
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          500: "#4F46E5",
          600: "#0891B2",
        },
        canvas: {
          light: "#F8FAFC",
          dark: "#0B1120",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        // `font-mono` is used throughout the UI for stat/eyebrow treatments.
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        // Used widely across the codebase but previously undefined.
        "2xs": "0 1px 1px 0 rgb(15 23 42 / 0.04)",
        xs: "0 1px 2px 0 rgb(15 23 42 / 0.05)",
        glow: "0 0 0 1px rgb(99 102 241 / 0.18), 0 8px 30px -8px rgb(79 70 229 / 0.35)",
        "glow-lg": "0 0 0 1px rgb(99 102 241 / 0.22), 0 20px 60px -12px rgb(79 70 229 / 0.45)",
        lift: "0 18px 42px -12px rgb(30 41 59 / 0.18)",
      },
      borderRadius: {
        xs: "0.25rem",
        "4xl": "2rem",
      },
      backgroundImage: {
        "grid-light":
          "linear-gradient(to right, rgb(148 163 184 / 0.10) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.10) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgb(148 163 184 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.07) 1px, transparent 1px)",
        "brand-gradient": "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #22D3EE 100%)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-slow": "marquee 45s linear infinite",
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 2.5s ease-in-out infinite",
        // New primitives used by the refreshed sections.
        "gradient-pan": "gradientPan 6s ease infinite",
        shimmer: "shimmer 2.2s linear infinite",
        "fade-up": "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fadeIn 0.4s ease-out both",
        "scale-in": "scaleIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-down": "slideDown 0.28s cubic-bezier(0.16, 1, 0.3, 1) both",
        "spin-slow": "spin 14s linear infinite",
        "blob-drift": "blobDrift 18s ease-in-out infinite",
        "border-beam": "borderBeam 4s linear infinite",
        "bounce-subtle": "bounceSubtle 1.6s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        gradientPan: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blobDrift: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(26px, -22px) scale(1.07)" },
          "66%": { transform: "translate(-20px, 18px) scale(0.95)" },
        },
        borderBeam: {
          "0%": { offsetDistance: "0%" },
          "100%": { offsetDistance: "100%" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
