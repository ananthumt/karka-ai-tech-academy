"use client";

import React, { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EnrollProvider, useEnrollModal } from "@/components/EnrollContext";

import { ChatWidget } from "@/components/ChatWidget";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollToTop } from "@/components/motion/ScrollToTop";
import { StickyMobileCta } from "@/components/StickyMobileCta";

function MainContent({ children }: { children: React.ReactNode }) {
  const { openEnroll } = useEnrollModal();

  useEffect(() => {
    // Only disable the browser's own scroll restoration; the forced
    // scrollTo(0,0) that used to live here fought back-navigation and is
    // already handled inside SmoothScroll for the desktop Lenis path.
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col font-sans text-slate-900 dark:text-slate-100 bg-[#F8FAFC] dark:bg-[#080C17] transition-colors duration-300">
        <Navbar onOpenEnroll={() => openEnroll()} />
        <main id="main-content" className="flex-1 w-full overflow-x-clip">
          {children}
        </main>
        <Footer />

        {/* Floating layer: chat launcher (bottom-right), back-to-top (above it),
            and the mobile-only conversion bar (bottom, offset clear of chat). */}
        <ChatWidget />
        <ScrollToTop />
        <StickyMobileCta />
      </div>
    </SmoothScroll>
  );
}

export const ClientLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <EnrollProvider>
      <MainContent>{children}</MainContent>
    </EnrollProvider>
  );
};
