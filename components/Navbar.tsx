"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sun,
  Moon,
  ArrowRight,
  Sparkles,
  Search,
  ChevronDown,
} from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/content/site";
import { MegaMenu } from "@/components/MegaMenu";
import { SearchOverlay } from "@/components/SearchOverlay";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useScrollPast } from "@/lib/scroll-store";

interface NavbarProps {
  onOpenEnroll?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEnroll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Shared scroll driver. The previous implementation registered its own
  // non-passive, unthrottled scroll listener that called setState on every
  // single scroll event — re-rendering the header (and the mega menu tree)
  // continuously while the user scrolled.
  const isScrolled = useScrollPast(20);

  // Theme toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  // Keyboard shortcut Cmd+K / Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false);
    setIsOpen(false);
  }, [pathname]);

  // Support URL parameters for overlay testing (?overlay=search, ?overlay=megamenu, ?nav=mobile)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        if (params.get("overlay") === "search") {
          setIsSearchOpen(true);
        } else if (params.get("overlay") === "megamenu") {
          setIsMegaMenuOpen(true);
        } else if (params.get("nav") === "mobile") {
          setIsOpen(true);
        }
      }
    } catch {
      // pass
    }
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-white/70 dark:bg-[#0B1120]/80 backdrop-blur-sm border-b border-transparent"
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl relative">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-lime rounded-xl p-1"
          >
            <div className="relative h-10 w-36 sm:h-12 sm:w-44 flex items-center">
              <Image
                src="/assets/logo.webp"
                alt="Karka AI Academy Logo"
                fill
                sizes="160px"
                className="object-contain transition-transform group-hover:scale-[1.02]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* Courses Mega Menu Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 inline-flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-lime focus:outline-none ${
                  isMegaMenuOpen || pathname.startsWith("/courses")
                    ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 ring-1 ring-slate-200/60 dark:ring-white/10"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5"
                }`}
                aria-expanded={isMegaMenuOpen}
              >
                <span>Courses</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-lime focus:outline-none ${
                    isActive
                      ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10 ring-1 ring-slate-200/60 dark:ring-white/10"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search courses"
              className="p-2 sm:px-3 sm:py-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
            >
              <Search className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="hidden lg:inline text-xs font-semibold text-slate-500 dark:text-slate-400">
                Search
              </span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-white/10 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Enroll Now Button (Premium Indigo Accent) */}
            <MagneticButton
              shine
              onClick={onOpenEnroll}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-sm shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition-all cursor-pointer"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </MagneticButton>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu
          isOpen={isMegaMenuOpen}
          onClose={() => setIsMegaMenuOpen(false)}
          onOpenEnroll={onOpenEnroll}
          onOpenSearch={() => {
            setIsMegaMenuOpen(false);
            setIsSearchOpen(true);
          }}
        />

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-white/10 bg-white dark:bg-[#0B1120] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
            {/* Quick Search on Mobile */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-sm border border-slate-200/50 dark:border-white/5"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Search courses &amp; curriculums…</span>
              </span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-white/10 rounded">
                ⌘K
              </kbd>
            </button>

            <div className="flex flex-col space-y-1">
              <Link
                href="/courses"
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between ${
                  pathname === "/courses"
                    ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white ring-1 ring-slate-200/60 dark:ring-white/10"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <span>All Courses</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </Link>

              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between ${
                      isActive
                        ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white ring-1 ring-slate-200/60 dark:ring-white/10"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-60" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenEnroll) onOpenEnroll();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-center shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
              >
                <span>Enroll Now</span>
                <Sparkles className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
